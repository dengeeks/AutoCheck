from rest_framework import serializers
from .models import Ticket, Message, File


class TicketSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['user']

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'file')

class MessageSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    files = FileSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'text', 'user', 'files', 'user_first_name', 'user_last_name')
        read_only_fields = ['user']