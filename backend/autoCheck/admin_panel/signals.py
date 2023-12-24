from django.db.models.signals import post_save
from django.dispatch import receiver
from main.models import Review, Department, CustomUser


@receiver(post_save, sender=CustomUser)
def update_department_counter(sender, instance, **kwargs):
    department_name = 'users'
    department, created = Department.objects.get_or_create(name=department_name)
    
    if created:
        department.quantity = 1
    else:
        department.quantity += 1
    department.save()

@receiver(post_save, sender=Review)
def update_department_counter(sender, instance, **kwargs):
    department_name = 'reviews'
    department, created = Department.objects.get_or_create(name=department_name)
    
    if created:
        department.quantity = 1
    else:
        department.quantity += 1
    department.save()
