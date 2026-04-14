from django import forms
from .models import CustomOrder

class CustomOrderForm(forms.ModelForm):
    class Meta:
        model = CustomOrder
        fields = [
            'customer_name',
            'email',
            'furniture_type',
            'dimensions',
            'material',
            'requirements'
        ]