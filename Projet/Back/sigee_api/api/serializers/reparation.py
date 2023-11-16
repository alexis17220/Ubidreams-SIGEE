from rest_framework import serializers

from api.models import Reparation, Intervention
from api.serializers import EnginForReparationGetSerializer
from api.serializers.Intervenant import IntervenantForInterventionEGetSerializer


class ReparationGetSerializer(serializers.ModelSerializer):
    id_engin = EnginForReparationGetSerializer()
    id_intervenant = serializers.SerializerMethodField()

    class Meta:
        model = Reparation
        fields = '__all__'

    def get_id_intervenant(self, obj):
        interventions = Intervention.objects.filter(id_reparation=obj.id_reparation).all()
        if interventions.count() == 0:
            return None
        intervention = interventions.first()
        if not intervention.id_intervenant:
            return None
        id_intervenant = intervention.id_intervenant
        intervenant_serialized = IntervenantForInterventionEGetSerializer(id_intervenant)
        return intervenant_serialized.data

