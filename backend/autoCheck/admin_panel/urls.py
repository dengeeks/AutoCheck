from django.urls import path, include
from .views import AdminUsersViewSet, AdminTariffPlansViewSet
from rest_framework.routers import DefaultRouter


users_router = DefaultRouter()
users_router.register(r'users', AdminUsersViewSet, basename='users')

tariff_router = DefaultRouter()
tariff_router.register(r'tariff', AdminTariffPlansViewSet, basename='tariff')

contacts_router = DefaultRouter()
contacts_router.register(r'contacts', AdminTariffPlansViewSet, basename='contacts')

urlpatterns = [
    path('', include(users_router.urls)),
    path('', include(tariff_router.urls)),
    path('', include(contacts_router.urls))
]