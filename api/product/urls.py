from django.urls import path
from .views import ProductAPIView, FilterProductsApi

urlpatterns = [
    path('products', FilterProductsApi.as_view(), name='products'),
    path('products/<int:id>', ProductAPIView.as_view(), name='product'),
]
