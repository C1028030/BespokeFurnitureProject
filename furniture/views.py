from django.shortcuts import render, redirect
from .forms import CustomOrderForm
from .models import CustomOrder, Furniture

def home(request):
    return render(request, 'furniture/home.html')

def create_furniture(request):
    if request.method == 'POST':
        form = CustomOrderForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('list')
        else:
            print(form.errors)
    else:
        form = CustomOrderForm()

    return render(request, 'furniture/create.html', {'form': form})

def furniture_list(request):
    orders = CustomOrder.objects.all().order_by('-created_at')
    return render(request, 'furniture/list.html', {'orders': orders})

def product_list(request):
    products = Furniture.objects.all()
    return render(request, 'furniture/products.html', {'products': products})