from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class Ticket(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    subject = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)
    is_closed = models.BooleanField(default=False)
    unread_messages_count = models.IntegerField(default=0)

    def __str__(self):
        return f'Ticket: {self.subject} | {self.created_at}'

class Message(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField(null=True, blank=True)
    files = models.ManyToManyField('File', blank=True)

    def clean(self):
        if not self.text and not self.files.exists():
            raise ValidationError('Either text or files must be provided.')

    def __str__(self):
        return f'{self.ticket.subject} | {self.user.first_name} {self.user.last_name}'

class File(models.Model):
    file = models.FileField()