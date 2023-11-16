from api.serializers.Equipement import EquipementSerializer, EquipementGetSerializer
from api.models import Equipements
from api.utils.pagination import PaginationViewSet


class EquipementViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Equipements.objects.all()
    serializer_class = EquipementGetSerializer

    action_serializers = {
        'create': EquipementSerializer,
        'update': EquipementSerializer,
        'partial_update': EquipementSerializer
    }
