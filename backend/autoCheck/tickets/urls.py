from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TicketAPIView, MessageAPIView, ResetTicketUnreadMessages


default_router = DefaultRouter()
default_router.register(r'tickets', TicketAPIView, basename='ticket')
default_router.register(r'message', MessageAPIView, basename='message')


urlpatterns = [
    path('', include(default_router.urls)),
    path('reset-ticket/<int:id>/', ResetTicketUnreadMessages.as_view()),
]