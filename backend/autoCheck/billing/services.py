from django.conf import settings
from main.models import CustomUser
from decimal import Decimal
from django.shortcuts import get_object_or_404
from .models import Transaction
from main.models import SocialNetwork
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.core.mail import send_mail
from django.template.loader import render_to_string
import logging
import yookassa


logger = logging.getLogger(__name__)

def configure_yookassa():
    yookassa.secret_key = settings.YOOKASSA_SECRET_KEY

class CreatePayment:
    @staticmethod
    def create_payment_object(domain_url, transaction_id, user_id, commission_amount, initial_amount, description):
        ''' Create and return object for creating a payment '''

        amount = {
            "value": str(commission_amount),
            "currency": "RUB",
        }
        confirmation = {
            "type": "redirect",
            "return_url": domain_url,
        }
        metadata = {
            'user_id': user_id,
            'transaction_id': transaction_id,
            'initial_amount': str(initial_amount),
        }
        payment_object = {
            "amount": amount,
            "confirmation": confirmation,
            "capture": True,
            "test": True,
            'metadata': metadata,
            "description": description,
        }

        return payment_object

    @staticmethod
    def create_yookassa_payment(request, transaction_id, user_id, commission_amount, initial_amount, description):
        configure_yookassa()

        domain_url = request.build_absolute_uri('/')
        payment_object = CreatePayment.create_payment_object(domain_url, transaction_id, user_id, commission_amount, initial_amount, description)

        payment = yookassa.Payment.create(payment_object)

        return payment.confirmation.confirmation_url
    
    @staticmethod
    def payment_commission(payment_amount, commission_type):
        commission_rates = {
            'user_side': Decimal(4 / 100),
            'site_side': Decimal(0),
            'equal': Decimal(2 / 100),
        }

        commission_rate = commission_rates.get(commission_type, Decimal(0))
        commission_amount = Decimal(payment_amount) + (Decimal(payment_amount) * commission_rate)

        return commission_amount, Decimal(payment_amount)

class PaymentProcessing:
    @staticmethod
    def handle_payment_succeeded(payload):
        # Extract data
        transaction_data = payload.get('object', {})
        status = transaction_data.get('status')
        user_id = transaction_data.get('metadata', {}).get('user_id')
        income_amount = payload.get('object', {}).get('amount', {}).get('value')
        initial_amount = transaction_data.get('metadata', {}).get('initial_amount')
        user_transaction_id = transaction_data.get('metadata', {}).get('transaction_id')

        # Check that the transaction is unique to avoid repeated charges
        if Transaction.objects.filter(transaction_id=user_transaction_id, is_accepted=True).exists():
            return None  # Returning None, as it's not necessary to send a response

        if user_transaction_id is not None and status == 'succeeded' and user_id is not None:
            user_transaction = PaymentProcessing.create_user_transaction(
                user_transaction_id, user_id, initial_amount, income_amount
            )
            logger.info(f'Webhook INITIAL: {initial_amount}')
            logger.info(f'Webhook INCOME: {income_amount}')

            PaymentProcessing.process_user_transaction(user_transaction)
            PaymentProcessing.notify_user(user_id, initial_amount)

    @staticmethod
    def create_user_transaction(transaction_id, user_id, initial_amount, commission_amount):
        existing_transaction = Transaction.objects.filter(transaction_id=transaction_id).first()

        if existing_transaction:
            existing_transaction.is_accepted = True
            existing_transaction.save()
            return existing_transaction
        else:
            return Transaction.objects.create(
                transaction_id=transaction_id,
                user_id=user_id,
                initial_amount=initial_amount,
                operation_type='payment',
                commission_amount=commission_amount,
                is_accepted=True,
                description=f"Income for user {user_id}"
            )
    @staticmethod
    def process_user_transaction(user_transaction):
        increase_balance(user_transaction.user_id, user_transaction.initial_amount)

    @staticmethod
    def notify_user(user_id, amount):
        send_websocket_notification(user_id, amount)
        send_email_notification(user_id, amount)


def send_websocket_notification(user_id, amount):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{user_id}",
        {
            'type': 'send.message',
            'message': f'+{amount}'
        }
    )

def send_email_notification(user_id, amount):
    user = get_object_or_404(CustomUser, id=user_id)
    social_networks = SocialNetwork.objects.all()
    template_name = 'email/EmailSuccessPayment.html'

    context = {
        'user': user,
        'amount': amount,
        'social_networks': social_networks,
    }

    subject = 'Успешное пополнение баланса'
    message = render_to_string(template_name, context)
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list, html_message=message)


def increase_balance(user_id, amount):
    user = get_object_or_404(CustomUser, id=user_id)
    user.balance += Decimal(amount)
    user.save()