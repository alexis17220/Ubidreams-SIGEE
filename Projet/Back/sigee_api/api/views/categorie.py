from api.serializers.categorie import CategorieSerializer, CategorieGETSerializer
from api.models import FamilleEngin
from api.utils.pagination import PaginationViewSet


class CategorieViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = FamilleEngin.objects.all()
    serializer_class = CategorieGETSerializer

    action_serializers = {
        'create': CategorieSerializer,
        'update': CategorieSerializer,
        'partial_update': CategorieSerializer
    }

