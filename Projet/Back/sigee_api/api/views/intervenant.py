from api.models import Intervenant
from api.serializers.Intervenant import IntervenantGetSerializer, IntervenantSerializer
from api.utils.pagination import PaginationViewSet


class IntervenantViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Intervenant.objects.all()
    serializer_class = IntervenantGetSerializer

    action_serializers = {
        'create': IntervenantSerializer,
        'update': IntervenantSerializer,
        'partial_update': IntervenantSerializer
    }
