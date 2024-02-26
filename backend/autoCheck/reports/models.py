from django.db import models
from django.conf import settings
from datetime import timedelta
from django.utils import timezone


class UserReport(models.Model):
    uuid = models.UUIDField(unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    model = models.CharField(max_length=100, null=True, blank=True)
    body = models.CharField(max_length=50, null=True, blank=True)
    body_type = models.CharField(max_length=20, null=True, blank=True)
    report_uuid = models.CharField(max_length=36, unique=True)
    is_upgraded = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(null=True, blank=True)
    is_favorite = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = timezone.now()
        if not self.expiry_date:
            self.expiry_date = self.created_at + timedelta(days=30)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'ID: {self.pk} | Is upgraded: {self.is_upgraded} | UserID: {self.user.id}'