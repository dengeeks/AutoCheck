from rest_framework import serializers
from .models import UserReport


class ReportCreateSerializer(serializers.Serializer):
    code_type = serializers.CharField()
    query = serializers.CharField()
    
    def validate(self, data):
        user = self.context['request'].user
        request_quantity = user.request_quantity

        if request_quantity < 1:
            raise serializers.ValidationError("Не достаточно запросов")

        # Валидация query по VIN, GRZ, BODY
        return data

class UserReportSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d.%m.%Yг - %H:%M")
    expiry_date = serializers.DateTimeField(format="%d.%m.%Yг - %H:%M")

    class Meta:
        model = UserReport
        fields = '__all__'