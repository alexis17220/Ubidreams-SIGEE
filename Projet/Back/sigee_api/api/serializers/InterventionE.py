from rest_framework.serializers import ModelSerializer

from api.models import Intervention
from api.serializers.Intervenant import IntervenantForInterventionEGetSerializer
from api.serializers.reparationEngin import ReparationEnginForInterventionEGetSerializer


class InterventionEGetSerializer(ModelSerializer):
    id_reparation = ReparationEnginForInterventionEGetSerializer()
    id_intervenant = IntervenantForInterventionEGetSerializer()

    class Meta:
        model = Intervention
        fields = '__all__'


class InterventionForCommandeGetSerializer(ModelSerializer):
    class Meta:
        model = Intervention
        fields = '__all__'


class InterventionEForCommandeSerializer(ModelSerializer):
    id_intervenant = IntervenantForInterventionEGetSerializer()

    class Meta:
        model = Intervention
        fields = ('id_intervenant',)
