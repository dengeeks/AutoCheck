from django.contrib import admin
from .models import Transaction, PaymentSettings

admin.site.register(Transaction)
admin.site.register(PaymentSettings)