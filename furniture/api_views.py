# API views return JSON data for the React frontend

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Furniture, CustomOrder
from .serializers import FurnitureSerializer, CustomOrderSerializer
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate


@api_view(['GET'])
def product_list_api(request):
    # Gets all furniture products from the database
    products = Furniture.objects.all()

    # Converts product objects into JSON
    serializer = FurnitureSerializer(products, many=True)

    # Sends JSON response to React
    return Response(serializer.data)


@api_view(['GET'])
def product_detail_api(request, product_id):
    # Gets one furniture product by ID
    product = Furniture.objects.get(id=product_id)

    # Converts single product into JSON
    serializer = FurnitureSerializer(product)

    return Response(serializer.data)


@api_view(['GET', 'POST'])
def order_list_create_api(request):
    # GET = return all orders
    if request.method == 'GET':
        orders = CustomOrder.objects.all().order_by('-created_at')
        serializer = CustomOrderSerializer(orders, many=True)
        return Response(serializer.data)

    # POST = create a new order
    if request.method == 'POST':
        serializer = CustomOrderSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

@api_view(['POST'])
def register_api(request):
    # Gets submitted data from React
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Prevent duplicate usernames
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Creates new user account
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        'message': 'User registered successfully'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_api(request):
    # Gets submitted login data
    username = request.data.get('username')
    password = request.data.get('password')

    # Checks username/password against Django users
    user = authenticate(username=username, password=password)

    # If login is successful
    if user is not None:
        return Response({
            'message': 'Login successful',
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
        })

    # Invalid credentials
    return Response(
        {'error': 'Invalid username or password'},
        status=status.HTTP_400_BAD_REQUEST
    )