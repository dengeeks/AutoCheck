from django.db import models
from django.conf import settings
from .managers import PaymentSettingsManager


class Transaction(models.Model):
    OPERATION_TYPE = {
        ('Withdraw', 'withdraw'),
        ('Payment', 'payment'),
        ('Bonus', 'bonus'),
    }
    transaction_id = models.UUIDField(unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    operation_type = models.CharField(max_length=8, choices=OPERATION_TYPE, blank=False)    
    initial_amount = models.DecimalField(default=0, max_digits=10, decimal_places=2) 
    commission_amount = models.DecimalField(default=0, max_digits=10, decimal_places=2) # price after commission calculation
    is_accepted = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.user.first_name}: {self.initial_amount} {self.timestamp}'

class PaymentSetting(models.Model):
    COMMISSION_STATUS = {
        ('user_side', 'user_side'),
        ('site_side', 'site_side'),
        ('equal', 'equal'),
    }
    commission  = models.CharField(max_length=9, choices=COMMISSION_STATUS, default='site_side')

    objects = PaymentSettingsManager()

    def __str__(self):
        return f'Commission: {self.commission}'