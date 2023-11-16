from api.serializers import EquipementESerializer, EquipementEGetSerializer
from api.models import EnginsEquipements
from api.utils.pagination import PaginationViewSet


class EquipementEViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = EnginsEquipements.objects.all()
    serializer_class = EquipementEGetSerializer

    action_serializers = {
        'create': EquipementESerializer,
        'update': EquipementESerializer,
        'partial_update': EquipementESerializer
    }
