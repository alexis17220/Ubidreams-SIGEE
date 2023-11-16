from api.serializers.proprietaire import ProprietaireSerializer, ProprietaireGetSerializer
from api.models import ProprietaireEngin
from api.utils.pagination import PaginationViewSet


# Views proprietaire
class ProprietaireViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = ProprietaireEngin.objects.all()
    serializer_class = ProprietaireGetSerializer

    action_serializers = {
        'create': ProprietaireSerializer,
        'update': ProprietaireSerializer,
        'partial_update': ProprietaireSerializer
    }

