from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager
import uuid


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(default="users/avatar/default-avatar.png", upload_to="users/avatar/")
    balance = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    current_tariff = models.ForeignKey('TariffPlan', on_delete=models.SET_NULL, null=True, blank=True)
    request_quantity = models.PositiveIntegerField(default=0)
    referral_code = models.UUIDField(default=uuid.uuid4, unique=True)
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='referrals')
    created_at = models.DateTimeField(auto_now_add=True)

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

    def __str__(self):
        return f'User ID: {self.user.id}, Blocked until {self.blocked_until}'

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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
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

class Contact(models.Model):
    name = models.CharField(max_length=100)
    info = models.CharField(max_length=100) 

    def __str__(self):
        return 'Контакты'

class Department(models.Model):
    DEPARTMENT_CHOICE = [
        ("users", "Users"),
        ("reviews", "Reviews"),
        ("referral", "Referral"),
        ("violators", "Violators"),
        ("ticket", "Ticket"),
        ("history", "History"),
    ]
    name = models.CharField(max_length=9, choices=DEPARTMENT_CHOICE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.name} {self.quantity}'

class WebsiteLogo(models.Model):
    logo = models.ImageField(default="website/logo.png", upload_to="website/")