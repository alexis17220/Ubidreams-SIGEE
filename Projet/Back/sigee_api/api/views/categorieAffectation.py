from api.models import CategorieAffectation
from api.serializers import CategorieAffectationGetSerializer
from api.utils.pagination import PaginationViewSet


class CategorieAffectationViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = CategorieAffectation.objects.all()
    serializer_class = CategorieAffectationGetSerializer

