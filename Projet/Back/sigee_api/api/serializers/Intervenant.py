from rest_framework.serializers import ModelSerializer

from api.models import Intervenant
from api.serializers.TypeIntervenant import TypeIntervenantForIntervenantSerializer


class IntervenantGetSerializer(ModelSerializer):
    id_type_intervenant = TypeIntervenantForIntervenantSerializer()

    class Meta:
        model = Intervenant
        fields = '__all__'


class IntervenantSerializer(ModelSerializer):
    class Meta:
        model = Intervenant
        fields = ('id_type_intervenant', 'nom')


class IntervenantForInterventionEGetSerializer(ModelSerializer):
    class Meta:
        model = Intervenant
        fields = ('nom',)
