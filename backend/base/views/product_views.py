from django.shortcuts import render
from base.models import Product 
#from base.products import Product  # values get from api
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from base.serializer import ProductSerializer

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer_class = ProductSerializer(products, many=True)
    return Response(serializer_class.data)

@api_view(['GET'])
def getProduct(request,pk):

    product = Product.objects.get(_id = pk)
    serializer_class = ProductSerializer(product, many=False)
    # product=None
    # for i in products:
    #     if(i['_id'] == pk):
    #         product = i
    #         break


    return Response(serializer_class.data)


