from django.urls import path
from .views import ReviewListCreateView, SendEmailView, MyTokenObtainPairView, TariffPlanListView, ContactListView
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('reviews/', ReviewListCreateView.as_view()),
    path('tariff-plans', TariffPlanListView.as_view()),
    path('contacts/', ContactListView.as_view()),
    path('send-email/', SendEmailView.as_view()),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair_view'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]