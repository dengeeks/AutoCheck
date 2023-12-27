from .models import Review
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, TariffPlan, Contact, SocialNetwork, Department


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='name')
    user_avatar = serializers.ReadOnlyField(source='avatar.url')

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user']

    
class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'current_tariff', 'request_quantity', 'is_active', 'is_staff')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            avatar = validated_data.get('avatar', 'users/avatar/default-avatar.png'),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            current_tariff=validated_data.get('current_tariff', None),
            request_quantity=validated_data.get('request_quantity', 0),
            is_active=validated_data.get('is_active', False),
            is_staff=validated_data.get('is_staff', False),
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
        # Получите самый дешевый тариф
        cheapest_tariff = TariffPlan.objects.order_by('price', 'request_quantity').first()

        # Вычислите процент выгоды для текущего тарифа
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