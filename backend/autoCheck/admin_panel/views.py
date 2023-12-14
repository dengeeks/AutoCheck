from rest_framework import viewsets, generics
from main.models import CustomUser, TariffPlan, Contact
from main.serializers import ContactSerializer
from .serializers import AdminUserSerializer, AdminTariffPlansSerializer
from rest_framework.permissions import IsAdminUser


class AdminUsersViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]

class AdminTariffPlansViewSet(viewsets.ModelViewSet):
    queryset = TariffPlan.objects.all()
    serializer_class = AdminTariffPlansSerializer
    permission_classes = [IsAdminUser]

class AdminContactsViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAdminUser]