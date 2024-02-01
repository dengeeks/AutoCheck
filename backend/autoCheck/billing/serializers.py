from rest_framework import serializers
from .models import Transaction, PaymentSetting, Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'initial_amount', 'operation_type', 'description', 'commission_amount', 'timestamp']

class PaymentSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentSetting
        fields = '__all__'

class BalanceHistorySerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False)
    class Meta:
        model = Transaction
        fields = ['user', 'initial_amount', 'description', 'operation_type', 'timestamp']