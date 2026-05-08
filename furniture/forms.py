from django import forms
from .models import CustomOrder
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

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
            'design_file', # Lets customers upload a sketch/design file
        ]

class CustomerRegisterForm(UserCreationForm):
    # Additional email field for customer accounts
    email = forms.EmailField(required=True)

    class Meta:
        model = User

        # Fields displayed on the registration form
        fields = [
            'username',
            'email',
            'password1',
            'password2'
        ]

# Form used by staff (includes status)
class CustomOrderUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomOrder
        fields = '__all__'