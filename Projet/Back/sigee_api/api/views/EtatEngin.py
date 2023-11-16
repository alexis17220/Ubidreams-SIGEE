from api.models import EtatEngin
from api.serializers.etatEngin import EtatEnginGetSerializer
from api.utils.pagination import PaginationViewSet


class EtatEnginViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = EtatEngin.objects.all()
    serializer_class = EtatEnginGetSerializer
