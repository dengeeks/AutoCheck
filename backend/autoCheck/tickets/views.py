from rest_framework import viewsets, permissions, parsers, views
from rest_framework.response import Response
from .models import Ticket, Message
from .serializers import TicketSerializer, MessageSerializer
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from .models import File


class TicketAPIView(viewsets.ModelViewSet):
    '''
    API endpoint for managing support tickets.
    Users can only view and manage their own tickets.
    '''
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = TicketSerializer

    def get_queryset(self):
        return Ticket.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        '''
        Retrieve details of a specific ticket along with associated messages.
        '''
        instance = self.get_object()
        messages = Message.objects.filter(ticket=instance)
        ticket_serializer = self.get_serializer(instance)
        messages_serializer = MessageSerializer(messages, many=True)
        response_data = {
            'ticket': ticket_serializer.data,
            'messages': messages_serializer.data
        }
        return Response(response_data)

class MessageAPIView(viewsets.ModelViewSet):
    '''
    Messages associated with the authenticated user.
    Users can create messages related to own tickets.
    '''
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = MessageSerializer

    def get_queryset(self):
        return Message.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        '''
        Verify that specified ticket exists and is associated with the request.user.
        Create file objects and attach to message.
        '''
        ticket_id = self.request.data.get('ticket', None)

        try:
            ticket = Ticket.objects.get(id=ticket_id, user=self.request.user, is_closed=False)
        except:
            raise ValidationError('Ticket not found')
        
        text = self.request.data.get('text')
        files_data = self.request.FILES.getlist('files')

        if not text and not files_data:
            raise ValidationError('At least one file should be provided.')
        
        instance = serializer.save(ticket=ticket, user=self.request.user)

        for file_data in files_data:
            file_object = File.objects.create(file=file_data)
            instance.files.add(file_object)

class ResetTicketUnreadMessages(views.APIView):
    permission_classes = [permissions.IsAuthenticated,]
    def post(self, request, id):
        ticket = get_object_or_404(Ticket, id=id, user=request.user)
        ticket.unread_messages_count = 0
        ticket.save()
        return Response({})