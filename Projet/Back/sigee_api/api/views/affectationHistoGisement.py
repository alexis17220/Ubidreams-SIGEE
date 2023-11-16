from api.models import HistoGisement
from api.serializers.affectationHistoGisement import AffectationHistoGisementGETSerializer, \
    AffectationHistoGisementSerializer
from api.utils.pagination import PaginationViewSet


class AffectationHistoGisementViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = HistoGisement.objects.all()
    serializer_class = AffectationHistoGisementGETSerializer

    action_serializers = {
        'create': AffectationHistoGisementSerializer,
        'update': AffectationHistoGisementSerializer,
        'partial_update': AffectationHistoGisementSerializer
    }
