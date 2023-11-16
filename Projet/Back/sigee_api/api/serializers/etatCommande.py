from rest_framework.serializers import ModelSerializer

from api.models import CommandeEtat


class CommandeEtatGetSerializer(ModelSerializer):
    class Meta:
        model = CommandeEtat
        fields = '__all__'


class CommandeEtatSerializer(ModelSerializer):
    class Meta:
        model = CommandeEtat
        fields = ('nom', 'couleur2',)
