from django import forms
from .models import CustomOrder

# Form used by customers (no status field)
class CustomOrderCreateForm(forms.ModelForm):
    class Meta:
        model = CustomOrder
        fields = [
            'customer_name',
            'email',
            'furniture_type',
            'dimensions',
            'material',
            'requirements',
        ]

# Form used by staff (includes status)
class CustomOrderUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomOrder
        fields = '__all__'