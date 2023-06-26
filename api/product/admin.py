from django.contrib import admin

# Register your models here.
from . import models

class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "selected"
    ]

admin.site.register(models.Product, ProductAdmin)
