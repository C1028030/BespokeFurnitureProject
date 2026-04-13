from FurnitureApp.data.models.furniture import Furniture

class FurnitureRepository:
    def all(self):
        return Furniture.objects.all()
    
    def create(self, **kwargs):
        return Furniture.objects.create(**kwargs)
    
    def get_by_id(self, furniture_id):
        return Furniture.objects.get(id=furniture_id)