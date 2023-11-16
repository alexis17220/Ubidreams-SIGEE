from api.models import TypeServ
from api.serializers.typeserv import TypeServitudeGetSerializer, TypeServitudeSerializer
from api.utils.pagination import PaginationViewSet


# Views TypeOps
class TypeServitudeViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeServ.objects.all()
    serializer_class = TypeServitudeGetSerializer

    action_serializers = {
        'create': TypeServitudeSerializer,
        'update': TypeServitudeSerializer,
        'partial_update': TypeServitudeSerializer
    }

