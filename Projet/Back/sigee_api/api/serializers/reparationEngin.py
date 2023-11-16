from rest_framework.serializers import ModelSerializer

from api.models import Reparation
from api.serializers import EnginReparationEnginForInterventionEGetSerializer


class ReparationEnginGetSerializer(ModelSerializer):
    id_engin = EnginReparationEnginForInterventionEGetSerializer()

    class Meta:
        model = Reparation
        fields = 'id_engin', 'd_entree', 'd_sortie', 'km_reception', 'hdm_moteur_reception', 'desc_raison_entree', 'temoinauteur', 'temoindate',


class ReparationEnginForInterventionEGetSerializer(ModelSerializer):
    id_engin = EnginReparationEnginForInterventionEGetSerializer()

    class Meta:
        model = Reparation
        fields = ('id_engin',)
