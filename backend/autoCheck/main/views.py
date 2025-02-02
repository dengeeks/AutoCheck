from rest_framework import generics, viewsets
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import EmailMessage
from rest_framework.response import Response
from django.db.models import Sum
from .serializers import (
    EmailSerializer,
    MyTokenObtainPairSerializer,
    TariffPlanSerializer,
    SocialNetworkSerializer,
    ReviewSerializer,
    ReferralSerializer,
    CustomUserUpdateSerializer,
    GetUserInfoSerializer,
    ContactSerializer,
    WebsiteLogoSerializer
)
from .models import (
    Review, 
    TariffPlan, 
    SocialNetwork, 
    CustomUser, 
    Contact,
    WebsiteLogo
)
from billing.models import Transaction
import logging


logger = logging.getLogger(__name__)
class SendFeedbackEmailView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def post(self, request, *args, **kwargs):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.validated_data['subject']
            message = serializer.validated_data['message']
            email_from = serializer.validated_data['email_from']
            feedback_files = serializer.validated_data.get('files', [])

            # Create an EmailMessage instance
            email_message = EmailMessage(
                subject=subject,
                body=message,
                from_email=email_from,
                to=['sudosurebootapt@gmail.com',],
            )

            # Attach files to the email message
            for feedback_file in feedback_files:
                email_message.attach(feedback_file.name, feedback_file.read(), feedback_file.content_type)

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
        earnings = Transaction.objects.filter(user=user, operation_type='Bonus')
        total_earnings = earnings.aggregate(total_amount=Sum('initial_amount'))['total_amount']

        invited_transactions = Transaction.objects.filter(user__in=invited_referrals, operation_type='Withdraw')
        logger.info(f'{total_earnings} Total earning')
        serializer = ReferralSerializer({
            'referral_code': referral_code, 
            'invited_referrals': invited_referrals, 
            'all_invited': all_invited,
            'earning': total_earnings,
            'transactions': invited_transactions
        })
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

class CustomUserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserUpdateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self):
        return self.request.user
    
class GetUserInfoView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetUserInfoSerializer

    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(id=user.id)

class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class WebsiteLogoAPIView(generics.RetrieveAPIView):
    serializer_class = WebsiteLogoSerializer

    def get_object(self):
        queryset = WebsiteLogo.objects.all()
        obj = queryset.first()
        return obj