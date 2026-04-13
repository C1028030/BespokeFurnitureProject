from django.db import models

class Furniture(models.Model):
    name = models.CharField(max_length=200)
    wood_type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    dimensions = models.CharField(max_length=100)
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return self.name