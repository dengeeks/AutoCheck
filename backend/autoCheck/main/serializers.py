from .models import Review
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, TariffPlan, Contact


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


class TariffPlanSerializer(serializers.Serializer):
    profit_percentage = serializers.ReadOnlyField()

    class Meta: 
        model = TariffPlan
        fields = '__all__'


class ContactSerializer(serializers.Serializer):
    class Meta: 
        model = Contact
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['is_staff'] = user.is_staff

        return token