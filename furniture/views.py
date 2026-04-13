from django.shortcuts import render

def home(request):
    return render(request, 'furniture/home.html')

def create_furniture(request):
    return render(request, 'furniture/create.html')

def furniture_list(request):
    return render(request, 'furniture/list.html')