from rest_framework import generics, viewsets
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import EmailMessage
from rest_framework.response import Response
from billing.permissions import IsAdminOrReadOnly
from .serializers import (
    EmailSerializer,
    MyTokenObtainPairSerializer,
    ContactSerializer,
    TariffPlanSerializer,
    SocialNetworkSerializer,
    ReviewSerializer,
    ReferralSerializer,
    CustomUserUpdateSerializer,
    TicketSerializer,
    TicketAnswerSerializer,
    GetUserInfoSerializer
)
from .models import (
    Review, 
    TariffPlan, 
    Contact, 
    SocialNetwork, 
    CustomUser, 
    Ticket,
    TicketAnswer
)
from django.core.exceptions import ValidationError
import logging


logger = logging.getLogger(__name__)

class SendEmailView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def post(self, request, *args, **kwargs):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.validated_data['subject']
            message = serializer.validated_data['message']
            email_from = serializer.validated_data['email_from']
            files = serializer.validated_data.get('files', [])

            # Create an EmailMessage instance
            email_message = EmailMessage(
                subject=subject,
                body=message,
                from_email=email_from,
                to=['sudosurebootapt@gmail.com', ],
            )

            # Attach files to the email message
            for file in files:
                email_message.attach(file.name, file.read(), file.content_type)

            # Send the email
            email_message.send(fail_silently=False)

            return Response({'success': True}, status=status.HTTP_200_OK)
        else:
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ReviewAPIViewset(viewsets.ModelViewSet):
    queryset = Review.objects.filter(is_allowed=True)
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Получение следующего и предыдущего объекта
        next_review = self.get_next_object(instance)
        prev_review = self.get_previous_object(instance)

        # Получение идентификаторов следующего и предыдущего объекта
        next_review_id = next_review.id if next_review else None
        prev_review_id = prev_review.id if prev_review else None

        # Добавление информации о следующем и предыдущем объекте (идентификаторы) к ответу
        serializer_data = serializer.data
        serializer_data['next_review'] = next_review_id
        serializer_data['prev_review'] = prev_review_id

        return Response(serializer_data)

    def get_next_object(self, instance):
        return self.queryset.filter(id__gt=instance.id).order_by('id').first()

    def get_previous_object(self, instance):
        return self.queryset.filter(id__lt=instance.id).order_by('-id').first()

    def perform_create(self, serializer):
        # Associate the authenticated user with the review
        serializer.save(user=self.request.user)
    

class TariffPlanList(generics.ListAPIView):
    queryset = TariffPlan.objects.all().order_by('price')
    serializer_class = TariffPlanSerializer


class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class SocialNetworkListView(generics.ListAPIView):
    queryset = SocialNetwork.objects.all()
    serializer_class = SocialNetworkSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ReferralsGetView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request):
        try:
            user = request.user
            referral_code = user.referral_code
        except:
            return Response({'error': 'Пользователь не найден'}, status=status.HTTP_400_BAD_REQUEST)
        invited_referrals = CustomUser.objects.filter(referred_by=user)
        all_invited = invited_referrals.count()
        serializer = ReferralSerializer({'referral_code': referral_code, 'invited_referrals': invited_referrals, 'all_invited': all_invited})
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class CustomUserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserUpdateSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_object(self):
        return self.request.user

class UserTickets(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = Ticket.objects.filter(user=user)
        return queryset
    
class TicketAnswerView(viewsets.ModelViewSet):
    queryset = TicketAnswer.objects.all()
    serializer_class = TicketAnswerSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        ticket_answer = serializer.save()
        # Установите статус is_answered в True для связанного объекта Ticket
        ticket_answer.ticket.is_answered = True
        ticket_answer.ticket.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TicketAndAnswerView(APIView):
    def get(self, request, id):
        try:
            ticket = Ticket.objects.get(id=id)
        except Ticket.DoesNotExist:
            return Response({"error": "Ticket not found"}, status=status.HTTP_404_NOT_FOUND)

        ticket_serializer = TicketSerializer(ticket)
        ticket_answer_serializer = TicketAnswerSerializer(ticket.answers.all(), many=True)

        data = {
            "ticket": ticket_serializer.data,
            "answers": ticket_answer_serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)
    
class GetAllTickets(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class GetUserInfoView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetUserInfoSerializer

    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(id=user.id)
