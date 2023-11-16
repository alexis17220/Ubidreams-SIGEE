from api.models import Reparation
from api.serializers.reparation import ReparationGetSerializer
from api.utils.pagination import PaginationViewSet


class ReparationViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Reparation.objects.all()
    serializer_class = ReparationGetSerializer

