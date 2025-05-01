from django.contrib import admin
from .models import Destination
# Register your models here.

admin.site.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'display_order']
    ordering = ['display_order']