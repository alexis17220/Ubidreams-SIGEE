from rest_framework.serializers import ModelSerializer

from api.models import AffecHistoAdm, Engin
from api.serializers import AffectationHistoSerializer


class EnginForAffectationHistoAdmGETSerializer(ModelSerializer):
    class Meta:
        model = Engin
        fields = ('immatriculation',)


class AffectationHistoAdmGETSerializer(ModelSerializer):
    id_affec_adm = AffectationHistoSerializer()
    id_engin = EnginForAffectationHistoAdmGETSerializer()

    class Meta:
        model = AffecHistoAdm
        fields = '__all__'


class AffectationHistoAdmSerializer(ModelSerializer):
    class Meta:
        model = AffecHistoAdm
        fields = ('id_affec_adm', 'd_affec', 'id_engin',)


class AffectationHistoAdmEnginSerializer(ModelSerializer):

    class Meta:
        model = AffecHistoAdm
        fields = ('id_affec_adm', 'id_engin')
