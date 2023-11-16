from api.models import TypeIntervenant
from api.serializers.TypeIntervenant import TypeIntervenantGetSerializer, TypeIntervenantSerializer
from api.utils.pagination import PaginationViewSet


class TypeIntervenantViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeIntervenant.objects.all()
    serializer_class = TypeIntervenantGetSerializer

    action_serializers = {
        'create': TypeIntervenantSerializer,
        'update': TypeIntervenantSerializer,
        'partial_update': TypeIntervenantSerializer
    }
