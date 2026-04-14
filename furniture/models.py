from django.db import models

# Create your models here.
class Furniture(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    material = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class CustomOrder(models.Model):
    customer_name = models.CharField(max_length=100)
    email = models.EmailField()
    furniture_type = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100)
    material = models.CharField(max_length=50)
    requirements = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.furniture_type}"