from rest_framework import serializers

from api.models import Reparation, Intervention, Commande
from api.serializers import EnginForReparationGetSerializer
from api.serializers.Intervenant import IntervenantForInterventionEGetSerializer
from api.serializers.commande import CommandeForRequeteGasSerializer


class RequeteGasGetSerializer(serializers.ModelSerializer):
    id_engin = EnginForReparationGetSerializer()
    id_intervenant = serializers.SerializerMethodField()
    id_commande = serializers.SerializerMethodField()

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

    def get_id_commande(self, obj):
        interventions = Intervention.objects.filter(id_reparation=obj.id_reparation).all()
        if interventions.count() == 0:
            return None
        intervention = interventions.first()
        if not intervention.id_intervention:
            return None
        id_intervention = intervention.id_intervention
        commandes = Commande.objects.filter(id_intervention=id_intervention).all()

        if commandes.count() == 0:
            return None
        commande = commandes.first()
        commande_serialized = CommandeForRequeteGasSerializer(commande)
        return commande_serialized.data
