from api.serializers import ClassificationGetSerializer, ClassificationSerializer
from api.models import TypeGenre
from api.utils.pagination import PaginationViewSet


class ClassificationViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = TypeGenre.objects.all()
    serializer_class = ClassificationGetSerializer

    action_serializers = {
        'create': ClassificationSerializer,
        'update': ClassificationSerializer,
        'partial_update': ClassificationSerializer
    }
