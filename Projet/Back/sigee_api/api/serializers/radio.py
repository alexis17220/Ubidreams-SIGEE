from rest_framework.serializers import ModelSerializer

from api.models import Radio
from api.serializers import AffectationHistoSerializer


class RadioAffectationGetSerializer(ModelSerializer):
    id_adm = AffectationHistoSerializer()
    id_phy = AffectationHistoSerializer()

    class Meta:
        model = Radio
        fields = ('id_adm', 'id_phy')


class RadioGetSerializer(ModelSerializer):
    class Meta:
        model = Radio
        fields = '__all__'
