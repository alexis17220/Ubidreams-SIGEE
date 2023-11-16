from api.models import HistoCompteur
from api.serializers.GarageEngin import GarageEnginGetSerializer, GarageEnginSerializer
from api.utils.pagination import PaginationViewSet


class GarageEnginViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = HistoCompteur.objects.all()
    serializer_class = GarageEnginGetSerializer

    action_serializers = {
        'create': GarageEnginSerializer,
        'update': GarageEnginSerializer,
        'partial_update': GarageEnginSerializer
    }
