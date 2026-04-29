from django.shortcuts import render, redirect, get_object_or_404
from .forms import CustomOrderCreateForm, CustomOrderUpdateForm
from .models import CustomOrder, Furniture
from django.contrib.auth.decorators import login_required # Used to stop non-logged in users from accessing staff pages
from django.db import models
import csv # Used to create downloadable CSV files
from django.http import HttpResponse # Used to return a file response to the browser

def home(request):
    # Counts all custom orders in the database
    total_orders = CustomOrder.objects.count()

    # Counts important order statuses for dashboard cards
    pending_orders = CustomOrder.objects.filter(status='Pending').count()
    completed_orders = CustomOrder.objects.filter(status='Completed').count()

    # Counts all furniture products in the catalogue
    total_products = Furniture.objects.count()

    # Creates data for the order status chart
    status_labels = []
    status_counts = []

    for status_value, status_label in CustomOrder.STATUS_CHOICES:
        # Count how many orders have each status
        count = CustomOrder.objects.filter(status=status_value).count()

        # Add status name and count to chart lists
        status_labels.append(status_label)
        status_counts.append(count)
        
        # Groups orders by the date they were created
        orders_by_day = (
            CustomOrder.objects
            .extra(select={'day': "date(created_at)"})
            .values('day')
            .annotate(count=models.Count('id'))
            .order_by('day')
        )

        # Stores chart labels and values
        daily_order_labels = []
        daily_order_counts = []

        # Loops through each grouped day and adds it to the chart data
        for item in orders_by_day:
            daily_order_labels.append(str(item['day']))
            daily_order_counts.append(item['count'])

    context = {
        'total_orders': total_orders,
        'pending_orders': pending_orders,
        'completed_orders': completed_orders,
        'total_products': total_products,
        'status_labels': status_labels,
        'status_counts': status_counts,
        'daily_order_labels': daily_order_labels,
        'daily_order_counts': daily_order_counts,
    }

    return render(request, 'furniture/home.html', context)

def create_furniture(request):
    if request.method == 'POST':
        # Create form using user-submitted data
        form = CustomOrderCreateForm(request.POST)

        # Check if form data is valid
        if form.is_valid():
            order = form.save() # Save the order and store it in a variable
            return redirect('order_success', order_id=order.id) # Redirect to success page and pass order ID in the url
    
    else:
        # Create an empty form when page first loads
        form = CustomOrderCreateForm()

    return render(request, 'furniture/create.html', {'form': form})

@login_required
def furniture_list(request):
    # Gets all orders, newest first
    orders = CustomOrder.objects.all().order_by('-created_at')

    # Get filter values from URL
    search_query = request.GET.get('search', '')
    furniture_type = request.GET.get('furniture_type', '')
    material = request.GET.get('material', '')
    status = request.GET.get('status', '')
    priority = request.GET.get('priority', '')

    # Apply filters
    # Search by customer name
    if search_query:
        orders = orders.filter(customer_name__icontains=search_query)

    # Filter by furniture type
    if furniture_type:
        orders = orders.filter(furniture_type__iexact=furniture_type)

    # Filter by material
    if material:
        orders = orders.filter(material__iexact=material)

    # Filter by status
    if status:
        orders = orders.filter(status__iexact=status)

    # Filter by priority
    if priority:
        orders = orders.filter(priority__iexact=priority)

    # Dropdown values (for filters)

    furniture_types = CustomOrder.objects.values_list('furniture_type', flat=True).distinct()
    materials = CustomOrder.objects.values_list('material', flat=True).distinct()
    statuses = CustomOrder.objects.values_list('status', flat=True).distinct()
    priorities = CustomOrder.objects.values_list('priority', flat=True).distinct()

    # Send everything to template
    context = {
        'orders': orders,

        # Current filter values (keeps selections in UI)
        'search_query': search_query,
        'selected_furniture_type': furniture_type,
        'selected_material': material,
        'selected_status': status,
        'selected_priority': priority,

        # Dropdown options
        'furniture_types': furniture_types,
        'materials': materials,
        'statuses': statuses,
        'priorities': priorities,
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

@login_required
def edit_order(request, order_id):
    order = get_object_or_404(CustomOrder, id=order_id)

    if request.method == 'POST':
        form = CustomOrderUpdateForm(request.POST, instance=order)
        if form.is_valid():
            form.save()
            return redirect('list')
    else:
        form = CustomOrderUpdateForm(instance=order)

    return render(request, 'furniture/edit_order.html', {'form': form, 'order': order})

@login_required
def delete_order(request, order_id):
    order = get_object_or_404(CustomOrder, id=order_id)

    if request.method == 'POST':
        order.delete()
        return redirect('list')

    return render(request, 'furniture/delete_order.html', {'order': order})

def product_detail(request, product_id):
    # Finds one furniture product by its ID.
    # If the product doesn't exist, Django will show a 404 error page
    product = get_object_or_404(Furniture, id=product_id)

    # Sends the selected product to the product_detail.html template.
    return render(request, 'furniture/product_detail.html', {'product': product})

@login_required
def order_detail(request, order_id):
    # Finds the selected order
    # If it doesn't exist, Django shows a 404 page
    order = get_object_or_404(CustomOrder, id=order_id)

    # Ordered list of statuses used in the progress timeline
    status_steps = [
        'Pending',
        'In Review',
        'Approved',
        'In Production',
        'Ready for Delivery',
        'Completed',
    ]

    # Finds the current order status position in the timeline
    current_index = status_steps.index(order.status)

    # Builds a timeline list that tells the template which steps arecompleted/current/upcoming.
    timeline_steps = []
    for index, step in enumerate(status_steps):
        if index < current_index:
            state = 'completed'
        elif index == current_index:
            state = 'active'
        else:
            state = 'upcoming'
        
        timeline_steps.append({
            'name': step,
            'state': state,
        })
    
    # Sends the order and timeline data to the template
    return render(request, 'furniture/order_detail.html', {
        'order': order,
        'timeline_steps': timeline_steps,
    })

def order_success(request, order_id):
    # Gets the specific order using its ID
    order = get_object_or_404(CustomOrder, id=order_id)

    # Sends order to template so we can display ID and details
    return render(request, 'furniture/order_success.html', {'order': order})

def track_order(request):
    order = None
    error = None

    if request.method == 'POST':
        order_id = request.POST.get('order_id')
        email = request.POST.get('email')

        try:
            # Try to find matching order
            order = CustomOrder.objects.get(id=order_id, email=email)
        except CustomOrder.DoesNotExist:
            # Show error if not found
            error = "no order found with those details"
    
    return render(request, 'furniture/track_order.html',{
        'order': order,
        'error': error
    })

@login_required
def export_orders_csv(request):
    # Start with all orders, newest first
    orders = CustomOrder.objects.all().order_by('-created_at')

    # Read filter values from URL query string
    search_query = request.GET.get('search', '')
    furniture_type = request.GET.get('furniture_type', '')
    material = request.GET.get('material', '')
    status = request.GET.get('status', '')

    # Apply same filters used on list page
    if search_query:
        orders = orders.filter(customer_name__icontains=search_query)

    if furniture_type:
        orders = orders.filter(furniture_type__iexact=furniture_type)

    if material:
        orders = orders.filter(material__iexact=material)

    if status:
        orders = orders.filter(status__iexact=status)

    # Create CSV response
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="filtered_custom_orders.csv"'

    writer = csv.writer(response)

    # Header row
    writer.writerow([
        'Order ID',
        'Customer Name',
        'Email',
        'Furniture Type',
        'Dimensions',
        'Material',
        'Requirements',
        'Status',
        'Created At'
    ])

    # Data rows
    for order in orders:
        writer.writerow([
            order.id,
            order.customer_name,
            order.email,
            order.furniture_type,
            order.dimensions,
            order.material,
            order.requirements,
            order.status,
            order.created_at
        ])

    return response

@login_required
def manufacturing_list(request):
    # Gets all orders that are not completed yet
    orders = CustomOrder.objects.exclude(status='Completed').order_by('status', '-created_at')

    # Sends active orders to the manufacturing template
    return render(request, 'furniture/manufacturing_list.html', {'orders': orders})

@login_required
def delivery_planning(request):
    # Only include orders that are ready or in production
    orders = CustomOrder.objects.filter(
        status__in=['In Production', 'Ready for Delivery']
    )

    # Groups orders by material (simple batching logic)
    grouped_orders = {}

    for order in orders:
        material = order.material

        # If material group doesn't exist yet, create it
        if material not in grouped_orders:
            grouped_orders[material] = []

        # Add order to that material group
        grouped_orders[material].append(order)

    # Send grouped data to template
    return render(request, 'furniture/delivery_planning.html', {
        'grouped_orders': grouped_orders
    })

@login_required
def customer_history(request):
    # Starts with no results until staff searches
    orders = None
    email = request.GET.get('email', '')

    # If an email is searched, find all matching orders
    if email:
        orders = CustomOrder.objects.filter(email__iexact=email).order_by('-created_at')

    # Sends search value and matching orders to template
    return render(request, 'furniture/customer_history.html', {
        'orders': orders,
        'email': email
    })