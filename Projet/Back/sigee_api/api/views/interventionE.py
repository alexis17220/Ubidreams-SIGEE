from api.models import Intervention
from api.serializers.InterventionE import InterventionEGetSerializer
from api.utils.pagination import PaginationViewSet


# Views Intervention
class InterventionEViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Intervention.objects.all()
    serializer_class = InterventionEGetSerializer



