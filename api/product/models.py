from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    stock = models.CharField(max_length=255)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} {self.description} - {self.stock} ({self.price})"
