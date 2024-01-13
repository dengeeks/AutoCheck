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
from .models import Transaction, PaymentSettings
from .serializers import PaymentSettingsSerializer
from .permissions import IsAdminOrReadOnly
from main.models import CustomUser
from .services import create_yookassa_payment, update_user_balance, payment_commission
from django.conf import settings
from yookassa import Configuration
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import logging


Configuration.secret_key = settings.YOOKASSA_SECRET_KEY
Configuration.account_id = settings.YOOKASSA_SHOP_ID

logger = logging.getLogger(__name__)

yookassa_secret_key = settings.YOOKASSA_SECRET_KEY
yookassa_shop_id = settings.YOOKASSA_SHOP_ID

class YookassaPaymentView(APIView):    
    ''' View for payment using yookassa '''
    permission_classes = [permissions.IsAuthenticated]
    @transaction.atomic
    def post(self, request):
        try:
            user = CustomUser.objects.get(id=request.user.id)
        except:
            return Response({'error': 'Не удалось получить пользователя'}, status=HTTP_404_NOT_FOUND)
        
        amount = request.data.get('amount')
        payment_settings = PaymentSettings.objects.first()

        # Check that amount exists
        if amount is None:
            return Response({"error": f"[amount]: required"}, status=HTTP_400_BAD_REQUEST)
        else:
            commission_amount, initial_amount = payment_commission(amount=amount, commission=payment_settings.commission)
        
        return_url = request.data.get('return_url')
        # Check that we have url for redirect user after payment
        if return_url is None:
            return Response({"error": f"[return_url]: required"}, status=HTTP_400_BAD_REQUEST)

        description = f"Пополнение счета пользователя {user.first_name} {user.last_name}"

        transaction_id = str(uuid.uuid4())
        transaction = Transaction.objects.create( 
            transaction_id=transaction_id,
            user=user, 
            commission_amount=commission_amount, 
            initial_amount=initial_amount,
            is_accepted=False,
            description=description,
        )
        payment_url = create_yookassa_payment(
            transaction_id=transaction_id,
            user_id=user.id,
            commission_amount=commission_amount,
            initial_amount=initial_amount,
            description=description, 
            return_url=return_url
        )
        return Response({"payment_url": payment_url}, status=HTTP_201_CREATED)

class YookassaWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        logger.debug(f'Webhook was called, {request}')
        payload = request.data
        event_type = payload.get('event')
        transaction_id = payload.get('object', {}).get('id')
        payment_settings = PaymentSettings.objects.first()

        logger.debug(f'payment settings {payment_settings}')

        # Check transaction event status
        if event_type == 'payment.succeeded':
            transaction_data = payload.get('object', {})
            status = transaction_data.get('status')                
            user_id = transaction_data.get('metadata', {}).get('user_id')
            income_amount = payload.get('object', {}).get('amount', {}).get('value')
            initial_amount = transaction_data.get('metadata', {}).get('initial_amount')
            user_transaction_id = transaction_data.get('metadata', {}).get('transaction_id')

            logger.debug(f'Amount: {income_amount} {initial_amount}')

            # Check that the transaction is unique to avoid repeated charges
            if Transaction.objects.filter(transaction_id=user_transaction_id, is_accepted=True).exists():
                logger.debug(f'Transaction with ID {user_transaction_id} already exists. Skipping processing.')
                return Response(status=HTTP_204_NO_CONTENT)

            if transaction_id is not None and status == 'succeeded' and user_id is not None:
                if user_transaction_id is not None:
                    user_transaction = Transaction.objects.create(
                        transaction_id=user_transaction_id,
                        user_id=user_id,
                        initial_amount=initial_amount,
                        commission_amount=income_amount,
                        is_accepted=True,  # Помечаем транзакцию как успешно завершенную
                        description=f"Income for user {user_id}"
                    )

                    update_user_balance(user_id=user_id, amount=initial_amount)
                    logger.debug(f'{user_id}, asjdfla;skdj;flasdj')
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        f"user_{user_id}",
                        {
                            'type': 'send.message',
                            'message': f'+{initial_amount}'
                        }
                    )

        elif event_type == 'payment.canceled':
            try:
                user_transaction_id = payload.get('object', {}).get('metadata', {}).get('transaction_id')
                user_transaction = Transaction.objects.get(transaction_id=user_transaction_id)
                user_transaction.delete()
            except:
                return Response({"error": "transaction does not exists"}, status=HTTP_404_NOT_FOUND)

        # Отправка подтверждения
        return Response(status=HTTP_204_NO_CONTENT)


class CommissionSettings(APIView):
    permission_classes = [IsAdminOrReadOnly]
    def get(self, request):
        try:
            instance = PaymentSettings.objects.get()
            serializer = PaymentSettingsSerializer(instance)
            return Response(serializer.data, status=HTTP_200_OK)
        except PaymentSettings.DoesNotExist:
            try:
                payment_settings = PaymentSettings.objects.create()
                serializer = PaymentSettingsSerializer(payment_settings)                
                return Response(serializer.data, status=HTTP_201_CREATED)
            except:
                return Response({'error': 'Не известная ошибка'}, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            instance = PaymentSettings.objects.get()
            serializer = PaymentSettingsSerializer(instance, data=request.data)
        except PaymentSettings.DoesNotExist:
            serializer = PaymentSettingsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)