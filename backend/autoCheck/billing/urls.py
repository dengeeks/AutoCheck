from django.urls import path
from .views import YookassaPaymentView, YookassaWebhookView, CommissionSettings

urlpatterns = [
    path('yookassa/payment/', YookassaPaymentView.as_view(), name='yookassa_payment'),
    path('yookassa/webhook/', YookassaWebhookView.as_view(), name='yookassa_webhook'),
    path('commission-settings/', CommissionSettings.as_view(), name='commission_settings'),
]