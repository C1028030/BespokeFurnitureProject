from django.views.generic import CreateView
from django.urls import reverse_lazy
from FurnitureApp.data.models.furniture import Furniture
from FurnitureApp.presentation.forms.furniture_form import Furnitureform

class FurnitureCreateView(CreateView):
    model = Furniture
    form_class = Furnitureform
    template_name = "furniture/create.html"
    success_url = reverse_lazy("furniture_list")