from django.db.models.signals import post_migrate, pre_save
from django.dispatch import receiver
from .models import PaymentSettings
from django.core.exceptions import ValidationError
from .apps import BillingConfig


@receiver(post_migrate)
def create_payment_settings(sender, **kwargs):
    ''' After migrations, create a commission setting object if it doesn't exist. '''
    if sender.name == BillingConfig.name:
        PaymentSettings.objects.get_or_create() 

@receiver(pre_save, sender=PaymentSettings)
def limit_to_one_instance(sender, instance, **kwargs):
    if PaymentSettings.objects.exists() and not instance.pk:
        raise ValidationError("Может быть только один объект PaymentSettings.")
