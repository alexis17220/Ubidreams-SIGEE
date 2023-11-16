from api.serializers.gamme import GammeSerializer, GammeGetSerializer
from api.models import TypeGamme
from api.utils.pagination import PaginationViewSet


class GammeViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeGamme.objects.all()
    serializer_class = GammeGetSerializer

    action_serializers = {
        'create': GammeSerializer,
        'update': GammeSerializer,
        'partial_update': GammeSerializer
    }
