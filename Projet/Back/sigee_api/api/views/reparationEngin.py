from api.models import Reparation
from api.serializers.reparationEngin import ReparationEnginGetSerializer
from api.utils.pagination import PaginationViewSet


# Views ReparationEngin
class ReparationEnginViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Reparation.objects.all()
    serializer_class = ReparationEnginGetSerializer



