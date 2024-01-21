from django.urls import path
from .views import YookassaPaymentView, YookassaWebhookView, PaymentSettings


urlpatterns = [
    path('yookassa/payment/', YookassaPaymentView.as_view(), name='yookassa-payment'),
    path('yookassa/webhook/', YookassaWebhookView.as_view(), name='yookassa-webhook'),
    path('payment-settings/', PaymentSettings.as_view(), name='payment-settings'),
]