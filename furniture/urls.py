from django.urls import path
from . import views
from django.contrib.auth import views as auth_views # Django built-in login/logout views

urlpatterns = [
    path('', views.home, name='home'), # Home page
    path('create/', views.create_furniture, name='create'), # Create Furniture
    path('list/', views.furniture_list, name='list'), # List of furniture
    path('products/', views.product_list, name='products'), # Product page
    path('edit/<int:order_id>/', views.edit_order, name='edit_order'), # Edit an order
    path('delete/<int:order_id>', views.delete_order, name='delete_order'), # Delete an order
    path('products/<int:product_id>/', views.product_detail, name='product_detail'), # List of products
    path('list/<int:order_id>/', views.order_detail, name='order_detail'), # List of orders
    path('order-success/<int:order_id>/', views.order_success, name='order_success'), # Confirmation page after submitting a custom order
    path('track-order/', views.track_order, name='track_order'), # Tracking order page
    path('export-orders-csv/', views.export_orders_csv, name='export_orders_csv'), # Downloads all custom orders as a CSV file
    path('manufacturing/', views.manufacturing_list, name='manufacturing_list'), # Staff manufacturing list for active custom orders
    path('delivery/', views.delivery_planning, name='delivery_planning'), # Delivery page
    path('customer-history/', views.customer_history, name='customer_history'), # Staff page for viewing repeat customer order history
    path('export-order-pdf/<int:order_id>/', views.export_order_pdf, name='export_order_pdf'), # Downloads a PDF summary for one order
    path('profile/', views.profile, name='profile'), # Logged-in user profile page
    path('login/', auth_views.LoginView.as_view(template_name='furniture/login.html'), name='login'), # Customer login page
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'), # Customer logout page
    path('register/', views.register, name='register'), # Customer registration page
]