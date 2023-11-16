from api.models import Reparation, Radio
from api.serializers import RadioAffectationGetSerializer
from api.utils.pagination import PaginationViewSet


# Views ReparationEngin
class RadioViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Radio.objects.all()
    serializer_class = RadioAffectationGetSerializer



