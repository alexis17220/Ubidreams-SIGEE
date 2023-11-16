from api.models import Marque
from api.serializers.marque import MarqueGetSerializer, MarqueSerializer
from api.utils.pagination import PaginationViewSet


class MarqueViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Marque.objects.all()
    serializer_class = MarqueGetSerializer

    action_serializers = {
        'create': MarqueSerializer,
        'update': MarqueSerializer,
        'partial_update': MarqueSerializer
    }
