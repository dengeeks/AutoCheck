from .models import Review, Ticket
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    CustomUser,
    TariffPlan,
    Contact,
    SocialNetwork,
    Department,
    TicketAnswer
)
import uuid
import logging


logger = logging.getLogger(__name__)

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='name')
    user_avatar = serializers.ReadOnlyField(source='avatar.url')

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user']

class CustomUserCreateSerializer(UserCreateSerializer):
    created_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False)

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'avatar', 'email', 'balance', 'first_name', 'last_name', 'password', 'current_tariff', 'request_quantity', 'is_active', 'is_staff', 'created_at')

    def create(self, validated_data):
        referral_code = self.initial_data.get('referral_code')
        referred_by = None

        if referral_code:
            try:
                referred_by = CustomUser.objects.get(referral_code=referral_code)
            except CustomUser.DoesNotExist:
                pass

        validated_data['referral_code'] = str(uuid.uuid4())

        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            avatar=validated_data.get('avatar', 'users/avatar/default-avatar.png'),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            current_tariff=validated_data.get('current_tariff', None),
            request_quantity=validated_data.get('request_quantity', 0),
            is_active=validated_data.get('is_active', False),
            is_staff=validated_data.get('is_staff', False),
            referred_by=referred_by,
        )

        return user

class EmailSerializer(serializers.Serializer):
    email_from = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()
    files = serializers.ListField(child=serializers.FileField(), max_length=10, required=False)


class TariffPlanSerializer(serializers.ModelSerializer):
    profit_percentage = serializers.SerializerMethodField()

    class Meta:
        model = TariffPlan
        fields = ('id', 'name', 'price', 'color', 'request_quantity', 'profit_percentage')

    def get_profit_percentage(self, obj):
        # Get the most expensive rate
        cheapest_tariff = TariffPlan.objects.order_by('price', 'request_quantity').first()

        # Calculate interest benefits at the current tariff
        if cheapest_tariff:
            original_price = cheapest_tariff.price / cheapest_tariff.request_quantity
            discounted_price = obj.price / obj.request_quantity
            profit_percentage = ((original_price - discounted_price) / original_price) * 100
            return round(profit_percentage)
        else:
            return 0
    

class ContactSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Contact
        fields = '__all__'

class SocialNetworkSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = SocialNetwork
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['avatar'] = user.avatar.url
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['request_quantity'] = user.request_quantity
        token['is_staff'] = user.is_staff
        token['is_blocked'] = user.is_blocked
        return token

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name', 'quantity')

class ReferralSerializer(serializers.Serializer):
    referral_code = serializers.CharField()
    invited_referrals = CustomUserCreateSerializer(many=True)
    all_invited = serializers.IntegerField()

class CustomUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password', 'avatar']

    def update(self, instance, validated_data):
        # Make sure the user has updated their account
        if self.context['request'].user != instance:
            raise serializers.ValidationError("Вы можете обновлять только свой аккаунт")

        # Update user info
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.avatar = validated_data.get('avatar', instance.avatar)

        # Update password
        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance

class TicketSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    class Meta:
        model = Ticket
        fields = ['id', 'user', 'subject', 'user_first_name', 'user_last_name', 'text', 'is_answered']
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        return Ticket.objects.create(user=user, **validated_data)
    
class TicketAnswerSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = TicketAnswer
        fields = ('id', 'ticket', 'user', 'text', 'user_first_name', 'user_last_name', 'created_at')
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        return TicketAnswer.objects.create(user=user, **validated_data)

class TicketWithAnswersSerializer(serializers.ModelSerializer):
    answers = TicketAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'user', 'subject', 'text', 'is_answered', 'answers')

class GetUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'first_name', 'last_name', 'avatar', 'email', 'balance')