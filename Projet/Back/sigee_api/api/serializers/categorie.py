from rest_framework.serializers import ModelSerializer

from api.models import FamilleEngin


class CategorieGETSerializer(ModelSerializer):
    class Meta:
        model = FamilleEngin
        fields = '__all__'


class CategorieSerializer(ModelSerializer):
    class Meta:
        model = FamilleEngin
        fields = ('code_famille', 'libelle_famille')
