from rest_framework.serializers import ModelSerializer

from api.models import ProprietaireEngin


class ProprietaireGetSerializer(ModelSerializer):
    class Meta:
        model = ProprietaireEngin
        fields = '__all__'


class ProprietaireSerializer(ModelSerializer):
    class Meta:
        model = ProprietaireEngin
        fields = ('code_proprietaire', 'libelle')
