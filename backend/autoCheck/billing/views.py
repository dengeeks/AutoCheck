import uuid
from django.db import transaction
from rest_framework import views, generics, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.status import (
        HTTP_204_NO_CONTENT,
        HTTP_200_OK,
        HTTP_400_BAD_REQUEST, 
        HTTP_201_CREATED,
        HTTP_404_NOT_FOUND,
    )
from .models import Transaction, PaymentSetting
from .serializers import PaymentSettingSerializer, BalanceHistorySerializer
from main.models import CustomUser, TariffPlan
from .services import CreatePayment, PaymentProcessing, refill_inviter_balance
from django.conf import settings
from yookassa import Configuration
from django.shortcuts import get_object_or_404

import logging


Configuration.secret_key = settings.YOOKASSA_SECRET_KEY
Configuration.account_id = settings.YOOKASSA_SHOP_ID

logger = logging.getLogger(__name__)

class YookassaPaymentView(views.APIView):    
    ''' 
    API view to create a transaction object and generate a payment link using Yookassa.
    Requires authentication.
    '''
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        # Retrieve the authenticated user
        user = get_object_or_404(CustomUser, id=request.user.id)
        
        # Extract amount from request data
        amount = request.data.get('amount')
        payment_settings = PaymentSetting.objects.first()

        if amount is None:
            return Response({"error": f"[amount]: required"}, status=HTTP_400_BAD_REQUEST)
        
        # Calculate commission and initial amount based on the provided amount and payment settings
        commission_amount, initial_amount = CreatePayment.payment_commission(payment_amount=amount, commission_type=payment_settings.commission)

        description = f"Пополнение баланса"
        transaction_id = str(uuid.uuid4())

        # Create a Transaction object in the database
        Transaction.objects.create( 
            transaction_id=transaction_id,
            user=user,
            operation_type='Payment',
            commission_amount=commission_amount, 
            initial_amount=initial_amount,
            is_accepted=False,
            description=description,
        )

        # Generate a Yookassa payment URL
        payment_url = CreatePayment.create_yookassa_payment(
            request=request,
            transaction_id=transaction_id,
            user_id=user.id,
            commission_amount=commission_amount,
            initial_amount=initial_amount,
            description=description,
        )
        return Response({"payment_url": payment_url}, status=HTTP_201_CREATED)

class YookassaWebhookView(views.APIView):
    ''' Yookassa Webhook View for handling payment events '''
    def post(self, request, *args, **kwargs):
        event_type = request.data.get('event')

        if event_type == 'payment.succeeded':
            payload = request.data
            PaymentProcessing.handle_payment_succeeded(payload)

            return Response(status=HTTP_204_NO_CONTENT)
        else:
            transaction_data = request.data.get('object', {})
            user_transaction_id = transaction_data.get('metadata', {}).get('transaction_id')

            failed_transaction = get_object_or_404(Transaction, transaction_id=user_transaction_id)
            failed_transaction.delete()
            return Response({"error": 'Payment failed'}, status=HTTP_400_BAD_REQUEST)


class PaymentSettings(views.APIView):
    ''' Get PaymentSeting object or create '''
    def get(self, request):
        instance, created = PaymentSetting.objects.get_or_create()

        serializer = PaymentSettingSerializer(instance)
        status_code = HTTP_200_OK if not created else HTTP_201_CREATED
        return Response(serializer.data, status=status_code)


class BalanceHistoryView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BalanceHistorySerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user, is_accepted=True)
    
class CreatePurchaseView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        user = self.request.user
        tariff_id = request.data.get('tariff')
        tariff = get_object_or_404(TariffPlan, pk=tariff_id)

        if user.balance >= tariff.price:
            transaction_id = uuid.uuid4()
            Transaction.objects.create(
                transaction_id=transaction_id,
                user=user,
                operation_type='Withdraw',
                initial_amount=tariff.price,
                commission_amount=tariff.price,
                is_accepted=True,
                description=f'Покупка тарифa {tariff.name}',
            )
            user.balance -= tariff.price
            user.request_quantity += tariff.request_quantity
            user.save()
            if user.referred_by:
                settings = PaymentSetting.objects.all().first()
                refill_inviter_balance(user=user, price=str(tariff.price), procent=str(settings.bonus_procent))

            return Response({'data': 'Покупка прошла успешно'}, status=status.HTTP_200_OK)
        return Response({'error': 'Недостаточно средств на балансе'}, status=status.HTTP_400_BAD_REQUEST)