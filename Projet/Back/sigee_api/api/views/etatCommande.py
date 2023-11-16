from api.models import CommandeEtat
from api.serializers.etatCommande import CommandeEtatGetSerializer, CommandeEtatSerializer
from api.utils.pagination import PaginationViewSet


class CommandeEtatViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = CommandeEtat.objects.all()
    serializer_class = CommandeEtatGetSerializer

    action_serializers = {
        'create': CommandeEtatSerializer,
        'update': CommandeEtatSerializer,
        'partial_update': CommandeEtatSerializer
    }
