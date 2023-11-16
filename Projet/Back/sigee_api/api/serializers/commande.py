from rest_framework.serializers import ModelSerializer

from api.models import Commande
from api.serializers import EnginForCommandeGetSerializer
from api.serializers.InterventionE import InterventionEForCommandeSerializer
from api.serializers.etatCommande import CommandeEtatGetSerializer, CommandeEtatSerializer


class CommandeGetSerializer(ModelSerializer):
    id_engin = EnginForCommandeGetSerializer()
    id_intervention = InterventionEForCommandeSerializer()
    id_etat = CommandeEtatGetSerializer()

    class Meta:
        model = Commande
        fields = '__all__'


class CommandeSerializer(ModelSerializer):
    class Meta:
        model = Commande
        fields = ('id_engin', 'id_intervention', 'no_bon_cmd', 'demande', 'id_etat',)


class CommandeForReparationSerializer(ModelSerializer):
    class Meta:
        model = Commande
        fields = ('id_engin', 'id_intervention', 'no_bon_cmd', 'demande', 'id_etat',)


class CommandeForRequeteGasSerializer(ModelSerializer):
    id_etat = CommandeEtatSerializer()

    class Meta:
        model = Commande
        fields = ('no_bon_cmd', 'demande', 'id_etat')
