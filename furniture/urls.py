from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create/', views.create_furniture, name='create'),
    path('list/', views.furniture_list, name='list'),
    path('products/', views.product_list, name='products'),
]