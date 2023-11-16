from api.serializers import UsersSerializer
from api.models import Utilisateur
from api.utils.pagination import PaginationViewSet


# View utilisateur
class UsersViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Utilisateur.objects.all()
    serializer_class = UsersSerializer
