from django.urls import path, include
from .views import AdminUsersViewSet, AdminTariffPlansViewSet, AdminSocialNetworksViewSet, AdminContactsViewSet, AdminReviewViewSet, AdminBlockUserGet, AdminBlockUserPost, AdminUnblockUserPost
from rest_framework.routers import DefaultRouter


users_router = DefaultRouter()
users_router.register(r'users', AdminUsersViewSet, basename='users')

tariff_router = DefaultRouter()
tariff_router.register(r'tariff', AdminTariffPlansViewSet, basename='tariff')

contacts_router = DefaultRouter()
contacts_router.register(r'contacts', AdminContactsViewSet, basename='contacts')

social_networks_router = DefaultRouter()
social_networks_router.register(r'social-networks', AdminSocialNetworksViewSet, basename='social-networks')

review_router = DefaultRouter()
review_router.register(r'reviews', AdminReviewViewSet, basename='reviews')

urlpatterns = [
    path('', include(users_router.urls)),
    path('', include(tariff_router.urls)),
    path('', include(contacts_router.urls)),
    path('', include(social_networks_router.urls)),
    path('', include(review_router.urls)),
    path('block-user/', AdminBlockUserPost.as_view(), name='admin_block_user_post'),
    path('block-user/<int:id>/', AdminBlockUserGet.as_view(), name='admin_block_user_get'),
    path('unblock-user/', AdminUnblockUserPost.as_view(), name='admin_unblock_user_post'),
]