from rest_framework import viewsets, views, generics
from main.models import CustomUser, TariffPlan, Contact, SocialNetwork, Review, UserBlock, Department
from main.serializers import ContactSerializer, SocialNetworkSerializer, ReviewSerializer, DepartmentSerializer
from .serializers import AdminUserSerializer, AdminTariffPlansSerializer, UserBlockSerializer, AdminCustomUserSerializer, MailingSerializer, CustomBlockedUserSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import datetime, timezone, timedelta
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.http import Http404
from django.conf import settings
from django.db.models import Q


class AdminUsersViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]

class AdminTariffPlansViewSet(viewsets.ModelViewSet):
    queryset = TariffPlan.objects.all().order_by('price')
    serializer_class = AdminTariffPlansSerializer
    permission_classes = [IsAdminUser]

class AdminContactsViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAdminUser]

class AdminSocialNetworksViewSet(viewsets.ModelViewSet):
    queryset = SocialNetwork.objects.all()
    serializer_class = SocialNetworkSerializer
    permission_classes = [IsAdminUser]

class AdminReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAdminUser]

class AdminBlockUserGet(views.APIView):
    def get(self, request, id):
        try:
            # Get object by blocked user id
            block = UserBlock.objects.get(user=id)

            # Check that blocking period has not expired
            if block.blocked_until <= datetime.now(timezone.utc):
                return Response({'detail': 'Истек срок блокировки'}, status=status.HTTP_410_GONE) # Blocking period has ended
            
            serializer = UserBlockSerializer(block)
            serialized_data = serializer.data

            return Response({'detail': serialized_data}, status=status.HTTP_200_OK) # User remains blocked
        except UserBlock.DoesNotExist:
            try:
                # If the lock is not found, get user by id
                user = CustomUser.objects.get(id=id)
                user.is_blocked = False # Remove status that user is blocked
                user.save()

                return Response({'detail': 'Пользователь больше не заблокирован'}, status=status.HTTP_404_NOT_FOUND)
            except CustomUser.DoesNotExist:
                return Response({'detail': 'Пользователь не найден'}, status=status.HTTP_400_BAD_REQUEST)

    
class AdminGetBlockedUsers(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_blocked=True)
    serializer_class = CustomBlockedUserSerializer
    permission_classes = [IsAdminUser]

class AdminBlockUserPost(views.APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        # Get user by id
        id = request.data.get('user')
        try:
            user = CustomUser.objects.get(id=id)
            user.is_blocked = True # Set status that user is blocked
            user.save()
        except:
            return Response({"error": f"Пользователь {id} не найден"}, status=status.HTTP_404_NOT_FOUND)

        block_duration_hours = request.data.get('block_duration_hours', 0)
        block_duration_days = request.data.get('block_duration_days', 0)

        if block_duration_hours is None or block_duration_days is None:
            return Response({'detail': 'Пожалуйста, укажите продолжительность блокировки в часах и днях.'}, status=status.HTTP_400_BAD_REQUEST)

        blocked_until = datetime.now(timezone.utc) + timedelta(hours=int(block_duration_hours), days=int(block_duration_days))
        # Create user blocking object
        serializer = UserBlockSerializer(data={'user': user.id, 'blocked_until': blocked_until, 'block_reason': request.data.get('block_reason')})
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminUnblockUserPost(views.APIView):  
    permission_classes = [IsAdminUser]
    def post(self, request):
        try:
            # Get user by id
            id = request.data.get('user')

            user = get_object_or_404(CustomUser, id=id)
            user.is_blocked = False
            user.save()

            try:
                user_block = UserBlock.objects.get(user=id)
                user_block.delete()
            except:
                return Response({"error": "Указаный вами пользователь не заблокирован"}, status=status.HTTP_404_NOT_FOUND)
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response({"error": "Пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)
        

class AdminChangeCustomUser(views.APIView):
    permission_classes = [IsAdminUser]
    def patch(self, request, id):
        try:
            user = CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return Response({"error": "Пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminCustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            new_password = serializer.validated_data.get('password')
            if new_password:
                serializer.validated_data['password'] = make_password(new_password)
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class MailingView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MailingSerializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.validated_data['subject']
            message = serializer.validated_data['message']

            # Отправка письма всем пользователям
            if request.data.get('send_to') == 'all':
                users = CustomUser.objects.all()
            # Отправка письма только активным пользователям
            elif request.data.get('send_to') == 'active':
                users = CustomUser.objects.filter(Q(request_quantity__gt=0))
            # Отправка письма только неактивным пользователям
            elif request.data.get('send_to') == 'inactive':
                users = CustomUser.objects.filter(request_quantity=0)
            # Отправка письма конкретному пользователю
            elif request.data.get('user_id'):
                users = CustomUser.objects.filter(id=request.data['user_id'])
            else:
                return Response({'error': 'Invalid send_to parameter'}, status=status.HTTP_400_BAD_REQUEST)

            for user in users:
                send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])

            return Response({'success': 'Email sent successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminUser]

class ResetDepartmentView(views.APIView):
    def post(self, request):
        department_name = request.data.get('department')
        
        if not department_name:
            return Response({'error': 'Отсутствует поле department'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            department = Department.objects.get(name=department_name)
            department.quantity = 0
            department.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Department.DoesNotExist:
            return Response({'error': f'Отдел с именем {department_name} не найден'}, status=status.HTTP_404_NOT_FOUND)