from api.models import TypeAttelage
from api.serializers.typeAttelage import TypeAttelageGetSerializer, TypeAttelageSerializer
from api.utils.pagination import PaginationViewSet


# Views TypeAttelage
class TypeAttelageViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeAttelage.objects.all()
    serializer_class = TypeAttelageGetSerializer

    action_serializers = {
        'create': TypeAttelageSerializer,
        'update': TypeAttelageSerializer,
        'partial_update': TypeAttelageSerializer
    }

