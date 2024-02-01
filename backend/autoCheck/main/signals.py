from django.db.models.signals import pre_save, post_migrate
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .models import WebsiteLogo
from .apps import MainConfig


@receiver(post_migrate)
def create_website_logo(sender, **kwargs):
    ''' After migrations, create WebsiteLogo object if it doesn't exist '''
    if sender.name == MainConfig.name:
        if not WebsiteLogo.objects.exists():
            WebsiteLogo.objects.create()

@receiver(pre_save, sender=WebsiteLogo)
def limit_to_one_instance(sender, instance, **kwargs):
    ''' Before creating the object, check that it will be a single WebsiteLogo object '''
    if WebsiteLogo.objects.exists() and not instance.pk:
        raise ValidationError("Может быть только один объект WebsiteLogo.")