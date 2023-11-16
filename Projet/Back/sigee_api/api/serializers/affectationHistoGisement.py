from rest_framework.serializers import ModelSerializer

from api.models import HistoGisement
from api.serializers import AffectationHistoSerializer, EnginForAffectationGetSerializer


class AffectationHistoGisementGETSerializer(ModelSerializer):
    id_affec = AffectationHistoSerializer()
    id_engin = EnginForAffectationGetSerializer()

    class Meta:
        model = HistoGisement
        fields = '__all__'


class AffectationHistoGisementSerializer(ModelSerializer):
    class Meta:
        model = HistoGisement
        fields = ('id_affec', 'd_affec', 'id_engin',)
