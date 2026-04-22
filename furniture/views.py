from django.shortcuts import render, redirect, get_object_or_404
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

    search_query = request.GET.get('search', '')
    furniture_type = request.GET.get('furniture_type', '')
    material = request.GET.get('material', '')

    if search_query:
        orders = orders.filter(customer_name__icontains=search_query)

    if furniture_type:
        orders = orders.filter(furniture_type__iexact=furniture_type)

    if material:
        orders = orders.filter(material__iexact=material)

    furniture_types = CustomOrder.objects.values_list('furniture_type', flat=True).distinct()
    materials = CustomOrder.objects.values_list('material', flat=True).distinct()

    context = {
        'orders': orders,
        'search_query': search_query,
        'selected_furniture_type': furniture_type,
        'selected_material': material,
        'furniture_types': furniture_types,
        'materials': materials,
    }

    return render(request, 'furniture/list.html', context)

def product_list(request):
    products = Furniture.objects.all()

    search_query = request.GET.get('search', '')
    category = request.GET.get('category', '')
    material = request.GET.get('material', '')

    if search_query:
        products = products.filter(name__icontains=search_query)

    if category:
        products = products.filter(category__iexact=category)

    if material:
        products = products.filter(material__iexact=material)

    categories = Furniture.objects.values_list('category', flat=True).distinct()
    materials = Furniture.objects.values_list('material', flat=True).distinct()

    context = {
        'products': products,
        'search_query': search_query,
        'selected_category': category,
        'selected_material': material,
        'categories': categories,
        'materials': materials,
    }

    return render(request, 'furniture/products.html', context)

def edit_order(request, order_id):
    order = get_object_or_404(CustomOrder, id=order_id)

    if request.method == 'POST':
        form = CustomOrderForm(request.POST, instance=order)
        if form.is_valid():
            form.save()
            return redirect('list')
    else:
        form = CustomOrderForm(instance=order)

    return render(request, 'furniture/edit_order.html', {'form': form, 'order': order})


def delete_order(request, order_id):
    order = get_object_or_404(CustomOrder, id=order_id)

    if request.method == 'POST':
        order.delete()
        return redirect('list')

    return render(request, 'furniture/delete_order.html', {'order': order})

