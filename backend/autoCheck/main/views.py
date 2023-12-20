from rest_framework import generics
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import EmailMessage
from rest_framework.response import Response
from .serializers import EmailSerializer, MyTokenObtainPairSerializer, ContactSerializer, TariffPlanSerializer, SocialNetworkSerializer, ReviewSerializer
from .models import Review, TariffPlan, Contact, SocialNetwork

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

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.filter(is_allowed=True)
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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