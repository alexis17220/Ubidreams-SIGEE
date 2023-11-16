from django.db.models import F

from api.models import Statut
from api.serializers import StatutOpsGetSerializer
from api.utils.pagination import PaginationViewSet


# Views statut Tech
class StatutOpsViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Statut.objects.all()
    serializer_class = StatutOpsGetSerializer
