from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(default="users/avatar/default-avatar.png", upload_to="users/avatar/", blank=True, null=True) 
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    current_tariff = models.ForeignKey('TariffPlan', on_delete=models.SET_NULL, null=True, blank=True)
    request_quantity = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'avatar']

    def __str__(self):
        return f'{self.first_name} | {self.email}'


class UserBlock(models.Model):
    user = models.OneToOneField(to=CustomUser, on_delete=models.CASCADE)
    blocked_until = models.DateTimeField()
    block_reason = models.TextField()


class TariffPlan(models.Model):
    TARIFF_COLORS_CHOICE = [
        ("red", "Red"),
        ("orange", "Orange"),
        ("yellow", "Yellow"),
        ("blue", "Blue"),
        ("green", "Green"),
    ]
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    request_quantity = models.PositiveIntegerField()
    color = models.CharField(max_length=20, choices=TARIFF_COLORS_CHOICE)

    def __str__(self):
        return f'{self.name} | {self.request_quantity} | {self.price}₽'

class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    text = models.TextField()
    convenience_rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], verbose_name='Удобство рейтинг')
    informativeness_rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], verbose_name='Информативность рейтинг')
    quality_rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], verbose_name='Качество рейтинг')
    is_allowed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user} | {self.convenience_rating}, {self.informativeness_rating}, {self.quality_rating}'
    
    @property
    def name(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @property
    def avatar(self):
        return self.user.avatar
    

class Contact(models.Model):
    name = models.CharField(max_length=100)
    info = models.CharField(max_length=100) 

    def __str__(self):
        return 'Контакты'

class SocialNetwork(models.Model):
    SOCIAL_NETWORKS_CHOICE = [
        ("instagram", "Instagram"),
        ("youtube", "Youtube"),
        ("telegram", "Telegram"),
        ("facebook", "Facebook"),
        ("whatsapp", "WhatsApp"),
        ("vk", "VK"),
        ("viber", "Viber"),
    ]
    social_network = models.CharField(max_length=30, choices=SOCIAL_NETWORKS_CHOICE)
    link = models.URLField(null=True, blank=True)
    qr_code = models.ImageField()

    def __str__(self):
        return self.social_network