from rest_framework import generics
from rest_framework import permissions, status
from .serializers import ReviewSerializer, TariffPlanSerializer
from .models import Review, TariffPlan, Contact
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EmailSerializer, MyTokenObtainPairSerializer, ContactSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import EmailMessage
from rest_framework.response import Response


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
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Associate the authenticated user with the review
        serializer.save(user=self.request.user)

class TariffPlanListView(generics.ListAPIView):
    queryset = TariffPlan.objects.all()
    serializer_class = TariffPlanSerializer

class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer