from api.models import AffecHistoAdm
from api.serializers.affectationHistoADM import AffectationHistoAdmGETSerializer, AffectationHistoAdmSerializer
from api.utils.pagination import PaginationViewSet


class AffectationHistoAdmViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = AffecHistoAdm.objects.all()
    serializer_class = AffectationHistoAdmGETSerializer

    action_serializers = {
        'create': AffectationHistoAdmSerializer,
        'update': AffectationHistoAdmSerializer,
        'partial_update': AffectationHistoAdmSerializer
    }


