from django.urls import path
from . import api_views

urlpatterns = [
    # Product API routes
    path('products/', api_views.product_list_api, name='api_products'),
    path('products/<int:product_id>/', api_views.product_detail_api, name='api_product_detail'),

    # Order API routes
    path('orders/', api_views.order_list_create_api, name='api_orders'),

    # User registration API route
    path('register/', api_views.register_api, name='api_register'),

    # Login page
    path('login/', api_views.login_api, name='api_login'),
]