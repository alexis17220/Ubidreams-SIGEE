from api.serializers.equipeur import EquipeurSerializer, EquipeurGetSerializer
from api.models import Equipeur
from api.utils.pagination import PaginationViewSet


class EquipeurViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Equipeur.objects.all()
    serializer_class = EquipeurGetSerializer
    action_serializers = {
        'create': EquipeurSerializer,
        'update': EquipeurSerializer,
        'partial_update': EquipeurSerializer
    }
