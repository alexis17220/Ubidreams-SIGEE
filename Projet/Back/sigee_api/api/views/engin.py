from api.serializers import EnginGetSerializer, EnginSerializer
from api.models import Engin
from api.utils.pagination import PaginationViewSet
from rest_framework import filters


class EnginViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Engin.objects.all()
    serializer_class = EnginGetSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['immatriculation']
    action_serializers = {
        'create': EnginSerializer,
        'update': EnginSerializer,
        'partial_update': EnginSerializer
    }
