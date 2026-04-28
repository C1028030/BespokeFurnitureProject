from django.contrib import admin
from .models import Furniture, CustomOrder

@admin.register(CustomOrder)
class CustomOrderAdmin(admin.ModelAdmin):
    # Columns shown in the admin order list
    list_display = ('id', 'customer_name', 'email', 'furniture_type', 'status', 'created_at')
    # Filters shown on the right side
    list_filter = ('status', 'material')
    # Search box fields
    search_fields = ('customer_name', 'furniture_type')

admin.site.register(Furniture)

# Register your models here.
