from django.contrib import admin
from .models import Furniture, CustomOrder

@admin.register(CustomOrder)
class CustomOrderAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'furniture_type', 'status', 'created_at')
    list_filter = ('status', 'material')
    search_fields = ('customer_name', 'furniture_type')

admin.site.register(Furniture)

# Register your models here.
