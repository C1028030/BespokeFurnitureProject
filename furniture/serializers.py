from rest_framework import serializers
from .models import Furniture, CustomOrder


class FurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furniture

        # Fields sent to the React frontend
        fields = '__all__'


class CustomOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomOrder

        # Fields sent to the React frontend
        fields = '__all__'