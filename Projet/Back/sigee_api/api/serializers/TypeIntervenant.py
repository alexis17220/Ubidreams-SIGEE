from rest_framework.serializers import ModelSerializer

from api.models import TypeIntervenant


class TypeIntervenantGetSerializer(ModelSerializer):
    class Meta:
        model = TypeIntervenant
        fields = '__all__'


class TypeIntervenantSerializer(ModelSerializer):
    class Meta:
        model = TypeIntervenant
        fields = ('categorie',)


class TypeIntervenantForIntervenantSerializer(ModelSerializer):
    class Meta:
        model = TypeIntervenant
        fields = ('categorie',)
