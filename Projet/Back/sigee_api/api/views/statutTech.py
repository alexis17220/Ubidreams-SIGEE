from api.models import Statut
from api.serializers import StatutTechGetSerializer
from api.utils.pagination import PaginationViewSet


# Views statut Tech
class StatutTechViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Statut.objects.all()
    serializer_class = StatutTechGetSerializer
