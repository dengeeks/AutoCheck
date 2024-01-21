import uuid
from django.db import transaction
from rest_framework.views import APIView
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
from .serializers import PaymentSettingSerializer
from main.models import CustomUser
from .services import CreatePayment, PaymentProcessing
from django.conf import settings
from yookassa import Configuration
from django.shortcuts import get_object_or_404

import logging


Configuration.secret_key = settings.YOOKASSA_SECRET_KEY
Configuration.account_id = settings.YOOKASSA_SHOP_ID

logger = logging.getLogger(__name__)

yookassa_secret_key = settings.YOOKASSA_SECRET_KEY
yookassa_shop_id = settings.YOOKASSA_SHOP_ID

class YookassaPaymentView(APIView):    
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

        description = f"Пополнение счета пользователя {user.first_name} {user.last_name}"
        transaction_id = str(uuid.uuid4())

        # Create a Transaction object in the database
        Transaction.objects.create( 
            transaction_id=transaction_id,
            user=user,
            operation_type='payment',
            commission_amount=commission_amount, 
            initial_amount=initial_amount,
            is_accepted=False,
            description=description,
        )
        logger.info(f'Create INITIAL: {initial_amount}')
        logger.info(f'Create COMMISSION: {commission_amount}')

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

class YookassaWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        event_type = request.data.get('event')

        if event_type == 'payment.succeeded':
            payload = request.data  # Assuming you are using DRF and payload comes in request.data
            PaymentProcessing.handle_payment_succeeded(payload)

            return Response(status=HTTP_204_NO_CONTENT)
        else:
            transaction_data = request.data.get('object', {})
            user_transaction_id = transaction_data.get('metadata', {}).get('transaction_id')

            failed_transaction = get_object_or_404(Transaction, transaction_id=user_transaction_id)
            logger.info(f'FAILED TRANSACTION {failed_transaction}')
            failed_transaction.delete()
            return Response({"error": 'Payment failed'}, status=HTTP_400_BAD_REQUEST)


class PaymentSettings(APIView):
    ''' Get PaymentSeting object or create '''
    def get(self, request):
        instance, created = PaymentSetting.objects.get_or_create()

        serializer = PaymentSettingSerializer(instance)
        status_code = HTTP_200_OK if not created else HTTP_201_CREATED
        return Response(serializer.data, status=status_code)