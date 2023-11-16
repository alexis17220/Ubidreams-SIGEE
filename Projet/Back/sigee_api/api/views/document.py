from api.models import Documents
from api.serializers.document import DocumentsGetSerializer, DocumentsSerializer
from api.utils.pagination import PaginationViewSet


class DocumentsViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Documents.objects.all()
    serializer_class = DocumentsGetSerializer

    action_serializers = {
        'create': DocumentsSerializer,
        'update': DocumentsSerializer,
        'partial_update': DocumentsSerializer
    }
