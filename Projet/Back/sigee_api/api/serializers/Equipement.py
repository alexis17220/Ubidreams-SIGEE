from rest_framework.serializers import ModelSerializer

from api.models import Equipements


class EquipementGetSerializer(ModelSerializer):

    class Meta:
        model = Equipements
        fields = '__all__'


class EquipementSerializer(ModelSerializer):
    class Meta:
        model = Equipements
        fields = ('libelle', 'periode_revision')
