from main.models import CustomUser, TariffPlan, UserBlock
from rest_framework import serializers


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'avatar', 'first_name', 'last_name', 'current_tariff', 'request_quantity', 'is_active', 'is_staff', 'is_blocked']

class AdminTariffPlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = TariffPlan
        fields = '__all__'

class UserBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBlock
        fields = '__all__'

class AdminCustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class MailingSerializer(serializers.Serializer):
    subject = serializers.CharField()
    message = serializers.CharField()
