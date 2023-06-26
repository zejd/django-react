from django.shortcuts import render
from rest_framework import views, status, response, exceptions, permissions, filters, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django.db.models import Q

from . import models
from . import serializer as product_serializer


class ProductAPIView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        products = models.Product.objects.all()
        serializer = product_serializer.ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = product_serializer.ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return response.Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        product_obj = models.Product.objects.get(id=product_id)
        if not product_obj:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = product_serializer.ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data
        product_obj.selected = product['selected']
        print(product['selected'])
        product_obj.save()
        return Response(serializer.data)


class FilterProductsApi(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = product_serializer.ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)

    def get_queryset(self):
        queryset = models.Product.objects.all()
        search_params = self.request.query_params.get('search')

        if search_params:
            queryset = queryset.filter(
                Q(name__icontains=search_params) |
                Q(description__icontains=search_params)
            )

        return queryset
