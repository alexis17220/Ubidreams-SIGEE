from api.models import AffecHistoPhy
from api.serializers.affectationHistoPhy import AffectationHistoPhyGETSerializer, AffectationHistoPhySerializer
from api.utils.pagination import PaginationViewSet


class AffectationHistoPhyViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = AffecHistoPhy.objects.all()
    serializer_class = AffectationHistoPhyGETSerializer

    action_serializers = {
        'create': AffectationHistoPhySerializer,
        'update': AffectationHistoPhySerializer,
        'partial_update': AffectationHistoPhySerializer
    }
