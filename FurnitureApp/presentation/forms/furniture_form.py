from django import forms
from FurnitureApp.data.models.furniture import Furniture

class Furnitureform(forms.ModelForm):
    class Meta:
        model = Furniture
        fields = ["name", "wood_type", "price", "dimensions", "in_stock"]