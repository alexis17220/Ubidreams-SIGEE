from api.models import TypeTech
from api.serializers.typetech import TypeTechGetSerializer, TypeTechSerializer
from api.utils.pagination import PaginationViewSet


# Views TypeOps
class TypeTechViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeTech.objects.all()
    serializer_class = TypeTechGetSerializer

    action_serializers = {
        'create': TypeTechSerializer,
        'update': TypeTechSerializer,
        'partial_update': TypeTechSerializer
    }

