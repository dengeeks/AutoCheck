from rest_framework import serializers
from .models import Transaction, PaymentSettings


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'initial_amount', 'commission_amount', 'timestamp']

class PaymentSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentSettings
        fields = '__all__'