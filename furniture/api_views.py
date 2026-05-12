# API views return JSON data for the React frontend

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Furniture, CustomOrder
from .serializers import FurnitureSerializer, CustomOrderSerializer
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate
from django.db.models import Count


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

@api_view(['GET', 'PUT', 'DELETE'])
def order_detail_api(request, order_id):
    # Gets the selected order
    try:
        order = CustomOrder.objects.get(id=order_id)
    except CustomOrder.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

    # GET returns one order
    if request.method == 'GET':
        serializer = CustomOrderSerializer(order)
        return Response(serializer.data)

    # PUT updates the order
    if request.method == 'PUT':
        serializer = CustomOrderSerializer(order, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
    
    # DELETE removes the selected order
    if request.method == 'DELETE':
        order.delete()
        return Response({'message': 'Order deleted successfully'})
    
@api_view(['GET'])
def analytics_api(request):
    # Basic dashboard totals
    total_orders = CustomOrder.objects.count()
    pending_orders = CustomOrder.objects.filter(status='Pending').count()
    completed_orders = CustomOrder.objects.filter(status='Completed').count()
    total_products = Furniture.objects.count()

    # Orders grouped by status
    status_data = (
        CustomOrder.objects
        .values('status')
        .annotate(count=Count('id'))
        .order_by('status')
    )

    # Orders grouped by date
    orders_by_day = (
        CustomOrder.objects
        .extra(select={'day': "date(created_at)"})
        .values('day')
        .annotate(count=Count('id'))
        .order_by('day')
    )

    return Response({
        'total_orders': total_orders,
        'pending_orders': pending_orders,
        'completed_orders': completed_orders,
        'total_products': total_products,

        'status_labels': [item['status'] for item in status_data],
        'status_counts': [item['count'] for item in status_data],

        'daily_order_labels': [str(item['day']) for item in orders_by_day],
        'daily_order_counts': [item['count'] for item in orders_by_day],
    })