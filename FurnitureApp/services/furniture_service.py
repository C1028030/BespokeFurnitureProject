from FurnitureApp.data.repositories.furniture_repository import FurnitureRepository

class FurnitureService:
    def __init__(self):
        self.repository = FurnitureRepository()

    def list(self):
        return self.repository.all()
    
    def create(self, name, wood_type, price, dimensions, in_stock):
        return self.repository.create(
            name=name,
            wood_type=wood_type,
            price=price,
            dimensions=dimensions,
            in_stock=in_stock
        )