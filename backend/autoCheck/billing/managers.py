from django.db import models


class PaymentSettingsManager(models.Manager):
    def get_or_create_settings(self, **kwargs):
        instance, created = self.get_or_create(**kwargs)
        if not created:
            raise Exception("Настройки платежа могут иметь только один объект")
        return instance