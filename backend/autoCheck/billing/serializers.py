from rest_framework import serializers
from .models import Transaction, PaymentSetting


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'initial_amount', 'commission_amount', 'timestamp']

class PaymentSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentSetting
        fields = '__all__'