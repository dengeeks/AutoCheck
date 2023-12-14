from main.models import CustomUser, TariffPlan
from rest_framework import serializers


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'avatar', 'first_name', 'last_name', 'current_tariff', 'request_quantity', 'is_active', 'is_staff']

class AdminTariffPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = TariffPlan
        fields = '__all__'