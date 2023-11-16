from rest_framework.serializers import ModelSerializer

from api.models import AffecHistoPhy, Engin
from api.serializers import AffectationHistoSerializer


class EnginForAffectationHistoPhyGETSerializer(ModelSerializer):
    class Meta:
        model = Engin
        fields = ('immatriculation',)


class AffectationHistoPhyGETSerializer(ModelSerializer):
    id_affec_phy = AffectationHistoSerializer()
    id_engin = EnginForAffectationHistoPhyGETSerializer()

    class Meta:
        model = AffecHistoPhy
        fields = '__all__'


class AffectationHistoPhySerializer(ModelSerializer):
    class Meta:
        model = AffecHistoPhy
        fields = ('id_affec_phy', 'd_affec', 'id_engin',)


class AffectationHistophyEnginSerializer(ModelSerializer):
    class Meta:
        model = AffecHistoPhy
        fields = ('id_affec_phy', 'id_engin',)
