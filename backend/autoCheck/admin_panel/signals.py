from django.db.models.signals import post_save
from django.dispatch import receiver
from main.models import Review, Department, CustomUser
from tickets.models import Ticket
import logging


logger = logging.getLogger(__name__)

@receiver(post_save, sender=CustomUser)
def update_department_counter(sender, created, instance, **kwargs):    
    if not instance.is_blocked:
        department_name = 'users'
        department, _ = Department.objects.get_or_create(name=department_name)
    
        if created:
            department.quantity += 1
        department.save()

        if instance.referred_by:
            referral_department_name = 'referral'
            referral_department, _ = Department.objects.get_or_create(name=referral_department_name)
            referral_department.quantity += 1
            referral_department.save()

@receiver(post_save, sender=Review)
def update_department_counter(sender, created, instance, **kwargs):
    if created:
        department_name = 'reviews'
        department, created = Department.objects.get_or_create(name=department_name)
        department.quantity += 1
        department.save()

@receiver(post_save, sender=Ticket)
def update_department_counter(sender, created, instance, **kwargs):
    if created:
        department_name = 'ticket'
        department, created = Department.objects.get_or_create(name=department_name)
        department.quantity += 1
        department.save()