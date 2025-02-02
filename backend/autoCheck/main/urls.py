from django.urls import path, include
from .views import (
    ReviewAPIViewset,
    SendFeedbackEmailView,
    MyTokenObtainPairView,
    TariffPlanList,
    SocialNetworkListView,
    ReferralsGetView,
    CustomUserUpdateView,
    GetUserInfoView,
    WebsiteLogoAPIView,
    ContactListView
)
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

reviews_router = DefaultRouter()
reviews_router.register(r'reviews', ReviewAPIViewset, basename='review')

tickets_router = DefaultRouter()

urlpatterns = [
    path('', include(reviews_router.urls)),
    path('tariff-plans/', TariffPlanList.as_view()),
    path('contacts/', ContactListView.as_view()),
    path('get-logo/', WebsiteLogoAPIView.as_view()),
    path('referrals/', ReferralsGetView.as_view()),
    path('social-networks/', SocialNetworkListView.as_view()),
    path('get-user-info/', GetUserInfoView.as_view()),
    path('send-feedback-email/', SendFeedbackEmailView.as_view()),
    path('update-user/', CustomUserUpdateView.as_view()),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair_view'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]