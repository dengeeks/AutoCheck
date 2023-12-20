from rest_framework import viewsets, views
from main.models import CustomUser, TariffPlan, Contact, SocialNetwork, Review, UserBlock
from main.serializers import ContactSerializer, SocialNetworkSerializer, ReviewSerializer
from .serializers import AdminUserSerializer, AdminTariffPlansSerializer, UserBlockSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import datetime, timezone, timedelta
from django.http import Http404


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
            try:
                user_block = UserBlock.objects.get(user=id)
                user_block.delete()
            except:
                return Response({"error": "Указаный вами пользователь не заблокирован"}, status=status.HTTP_404_NOT_FOUND)
            
            user = get_object_or_404(CustomUser, id=id)
            user.is_blocked = False
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response({"error": "Пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)