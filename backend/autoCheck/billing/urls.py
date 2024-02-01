from django.urls import path
from .views import (
    YookassaPaymentView, 
    YookassaWebhookView, 
    PaymentSettings,
    BalanceHistoryView,
    CreatePurchaseView
)


urlpatterns = [
    path('yookassa/payment/', YookassaPaymentView.as_view(), name='yookassa-payment'),
    path('yookassa/webhook/', YookassaWebhookView.as_view(), name='yookassa-webhook'),
    path('balance-history/', BalanceHistoryView.as_view(), name='balance-history'),
    path('create-purchase/', CreatePurchaseView.as_view(), name='create-purchase'),
    path('payment-settings/', PaymentSettings.as_view(), name='payment-settings'),
]