from rest_framework.serializers import ModelSerializer

from api.models import EtatEngin


class EtatEnginGetSerializer(ModelSerializer):
    class Meta:
        model = EtatEngin
        fields = '__all__'

