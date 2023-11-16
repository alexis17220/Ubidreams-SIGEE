from api.models import AppellationCommerciale
from api.serializers.AppellationCom import AppellationGetSerializer, AppellationSerializer
from api.utils.pagination import PaginationViewSet


class AppellationViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = AppellationCommerciale.objects.all()
    serializer_class = AppellationGetSerializer

    action_serializers = {
        'create': AppellationSerializer,
        'update': AppellationSerializer,
        'partial_update': AppellationSerializer
    }
