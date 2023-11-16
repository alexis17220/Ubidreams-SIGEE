from api.serializers.affectation import AffectationSerializer, AffectationGetSerializer
from api.models import Affectation
from api.utils.pagination import PaginationViewSet


class AffectationViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Affectation.objects.filter(id_pere_adm__pk=0)
    serializer_class = AffectationGetSerializer
    action_serializers = {
        'create': AffectationSerializer,
        'update': AffectationSerializer,
        'partial_update': AffectationSerializer
    }
