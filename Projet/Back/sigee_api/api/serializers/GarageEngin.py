from rest_framework.serializers import ModelSerializer

from api.models import HistoCompteur
from api.serializers import EnginForAffectationGetSerializer


class GarageEnginGetSerializer(ModelSerializer):
    id_engin = EnginForAffectationGetSerializer()

    class Meta:
        model = HistoCompteur
        fields = '__all__'


class GarageEnginSerializer(ModelSerializer):
    class Meta:
        model = HistoCompteur
        fields = ('id_engin', 'compteur1', 'compteur2', 'd_compteur',)
