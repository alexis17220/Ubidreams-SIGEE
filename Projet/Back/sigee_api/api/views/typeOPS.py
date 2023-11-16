from api.models import TypeOps
from api.serializers.TypeOPS import TypeOPSGetSerializer, TypeOPSSerializer
from api.utils.pagination import PaginationViewSet


# Views TypeOps
class TypeOPSViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeOps.objects.all()
    serializer_class = TypeOPSGetSerializer

    action_serializers = {
        'create': TypeOPSSerializer,
        'update': TypeOPSSerializer,
        'partial_update': TypeOPSSerializer
    }

