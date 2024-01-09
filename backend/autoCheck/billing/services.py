from django.conf import settings
from main.models import CustomUser
from decimal import Decimal
from django.shortcuts import get_object_or_404
import logging
import yookassa


logger = logging.getLogger(__name__)

def create_yookassa_payment(transaction_id, user_id, commission_amount, initial_amount, description, return_url):
    yookassa.secret_key = settings.YOOKASSA_SECRET_KEY

    # Create payment object
    payment = yookassa.Payment.create({
        "amount": {
            "value": str(commission_amount),
            "currency": "RUB",
        },
        "confirmation": {
            "type": "redirect",
            "return_url": return_url,
        },
        "capture": True,
        "test": True,
        'metadata': {
            'user_id': user_id,
            'transaction_id': transaction_id,
            'initial_amount': str(initial_amount),
        },
        "description": description,
    })

    return payment.confirmation.confirmation_url

def update_user_balance(user_id, amount):
    logger.debug(f'Update User Balance: {amount}')
    user = get_object_or_404(CustomUser, id=user_id)
    user.balance += Decimal(amount)
    user.save()


def payment_commission(amount, commission):
    logger.debug(f'Amount: {amount}, Commission: {commission}')
    if commission == 'user_side':
        commission_amount = Decimal(amount) + (Decimal(amount) * Decimal(4 / 100))
    elif commission == 'site_side':
        commission_amount = Decimal(amount)
    elif commission == 'equal':
        commission_amount = Decimal(amount) + (Decimal(amount) * Decimal(2 / 100))
    else:
        logger.debug('comission not defined')
        commission_amount = Decimal(0)
    
    return commission_amount, Decimal(amount)