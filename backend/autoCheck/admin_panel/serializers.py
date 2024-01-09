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

class CustomBlockedUserSerializer(serializers.ModelSerializer):
    is_blocked = serializers.SerializerMethodField()
    blocked_until = serializers.SerializerMethodField()
    block_reason = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'is_blocked', 'last_name', 'request_quantity', 'email', 'blocked_until', 'block_reason']

    def get_is_blocked(self, obj):
        return obj.is_blocked

    def get_blocked_until(self, obj):
        if obj.is_blocked:
            blocked_until = obj.userblock.blocked_until if obj.userblock else None
            if blocked_until:
                return blocked_until.strftime('%Y-%m-%d %H:%M')
        return None

    def get_block_reason(self, obj):
        if obj.is_blocked:
            return obj.userblock.block_reason if obj.userblock else None
        return None

class AdminCustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class MailingSerializer(serializers.Serializer):
    subject = serializers.CharField()
    message = serializers.CharField()

class ReferralUserSerializer(serializers.ModelSerializer):
    referred_count = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'referred_count']

    def get_referred_count(self, obj):
        return obj.referrals.count()