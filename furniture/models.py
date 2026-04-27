from django.db import models

# Create your models here.
class Furniture(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    material = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    # Stores uploaded product images inside media/products/
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name
    
class CustomOrder(models.Model):

    # Status choices shwon as dropdown options
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Review', 'In Review'),
        ('Approved', 'Approved'),
        ('In Production', 'In Production'),
        ('Ready', 'Ready for Delivery'),
        ('Completed', 'Completed'),
    ]

    customer_name = models.CharField(max_length=100)
    email = models.EmailField()
    furniture_type = models.CharField(max_length=100)
    dimensions = models.CharField(max_length=100)
    material = models.CharField(max_length=50)
    requirements = models.TextField()

    # Default status when a new order is created
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.furniture_type}"