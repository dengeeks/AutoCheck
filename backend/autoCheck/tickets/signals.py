from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Message, Ticket

@receiver(post_save, sender=Message)
def unread_messages(sender, created, instance, **kwargs):
    if created:
        ticket = instance.ticket
        ticket.unread_messages_count += 1
        ticket.save()