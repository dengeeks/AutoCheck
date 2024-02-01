from django.contrib import admin
from .models import (
    TariffPlan, 
    Review, 
    SocialNetwork, 
    CustomUser, 
    UserBlock,
    Department,
    Contact
)

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'current_tariff', 'request_quantity')

admin.site.register(TariffPlan)
admin.site.register(Review)
admin.site.register(SocialNetwork)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserBlock)
admin.site.register(Department)
admin.site.register(Contact)