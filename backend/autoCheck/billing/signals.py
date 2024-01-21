from django.db.models.signals import pre_save, post_migrate
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .apps import BillingConfig
from .models import PaymentSetting


@receiver(post_migrate)
def create_payment_settings(sender, **kwargs):
    ''' After migrations, create PaymentSettings object if it doesn't exist '''
    if sender.name == BillingConfig.name:
        if not PaymentSetting.objects.exists():
            PaymentSetting.objects.create()

@receiver(pre_save, sender=PaymentSetting)
def limit_to_one_instance(sender, instance, **kwargs):
    ''' Before creating the object, check that it will be a single PaymentSettings object '''
    if PaymentSetting.objects.exists() and not instance.pk:
        raise ValidationError("Может быть только один объект PaymentSettings.")