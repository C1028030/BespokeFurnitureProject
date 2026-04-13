from django.views.generic import ListView
from FurnitureApp.data.models.furniture import Furniture

class FurnitureListView(ListView):
    model = Furniture
    template_name = "furniture/list.html"
    context_object_name = "items"