from django.urls import path, include
from .views import (
    AdminUsersViewSet,
    AdminTariffPlansViewSet,
    AdminSocialNetworksViewSet,
    AdminContactsViewSet,
    AdminReviewViewSet,
    AdminBlockUserGet,
    AdminBlockUserPost,
    AdminUnblockUserPost,
    AdminChangeCustomUser,
    MailingView,
    DepartmentListView,
    ResetDepartmentView,
    AdminGetBlockedUsers,
    AllReferralsView,
    ChangePaymentSettings,
    TicketAdminAPIView,
    MessageAdminAPIView
)
from rest_framework.routers import DefaultRouter


default_router = DefaultRouter()
default_router.register(r'users', AdminUsersViewSet, basename='users')
default_router.register(r'tariff', AdminTariffPlansViewSet, basename='tariff')
default_router.register(r'contacts', AdminContactsViewSet, basename='contacts')
default_router.register(r'social-networks', AdminSocialNetworksViewSet, basename='social-networks')
default_router.register(r'reviews', AdminReviewViewSet, basename='reviews')
default_router.register(r'tickets', TicketAdminAPIView, basename='tickets')
default_router.register(r'messages', MessageAdminAPIView, basename='message')

urlpatterns = [
    path('', include(default_router.urls)),
    path('change-payment-settings/', ChangePaymentSettings.as_view(), name='change-payment-settings'),
    path('block-user/', AdminBlockUserPost.as_view(), name='admin-block-user'),
    path('block-user/<int:id>/', AdminBlockUserGet.as_view(), name='admin-get-block-user'),
    path('get-blocked-users/', AdminGetBlockedUsers.as_view(), name='admin-get-blocked-users'),
    path('unblock-user/', AdminUnblockUserPost.as_view(), name='admin-unblock-user'),
    path('change-custom-user/<int:id>/', AdminChangeCustomUser.as_view(), name='admin-change-custom-user'),
    path('mailing/', MailingView.as_view(), name='admin-mailing'),
    path('department/', DepartmentListView.as_view(), name='admin-department'),
    path('reset-department/', ResetDepartmentView.as_view(), name='admin-reset-department'),
    path('all-referrals/', AllReferralsView.as_view(), name='all-referrals')
]