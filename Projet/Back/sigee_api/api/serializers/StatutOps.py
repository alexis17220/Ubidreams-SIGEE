from rest_framework.serializers import ModelSerializer

from api.models import Statut


class StatutOpsGetSerializer(ModelSerializer):
    class Meta:
        model = Statut
        fields = '__all__'


