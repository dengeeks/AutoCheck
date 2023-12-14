from django.contrib import admin
from .models import TariffPlan, Review, Contact, SocialNetwork, CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'current_tariff', 'request_quantity')


admin.site.register(TariffPlan)
admin.site.register(Review)
admin.site.register(Contact)
admin.site.register(SocialNetwork)
admin.site.register(CustomUser, CustomUserAdmin)
