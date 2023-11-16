from api.models import Commande
from api.serializers.commande import CommandeGetSerializer, CommandeSerializer
from api.utils.pagination import PaginationViewSet


class CommandeViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Commande.objects.all()
    serializer_class = CommandeGetSerializer

    action_serializers = {
        'create': CommandeSerializer,
        'update': CommandeSerializer,
        'partial_update': CommandeSerializer
    }
