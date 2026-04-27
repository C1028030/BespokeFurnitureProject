from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create/', views.create_furniture, name='create'),
    path('list/', views.furniture_list, name='list'),
    path('products/', views.product_list, name='products'),
    path('edit/<int:order_id>/', views.edit_order, name='edit_order'),
    path('delete/<int:order_id>', views.delete_order, name='delete_order'),
    path('products/<int:product_id>/', views.product_detail, name='product_detail'),
    path('list/<int:order_id>/', views.order_detail, name='order_detail'),
]