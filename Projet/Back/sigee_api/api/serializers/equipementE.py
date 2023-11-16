from rest_framework.serializers import ModelSerializer

from api.models import EnginsEquipements, Engin
from api.serializers import EquipementGetSerializer


class EnginForAffectationGetSerializer(ModelSerializer):
    class Meta:
        model = Engin
        fields = ('immatriculation',)


class EquipementEGetSerializer(ModelSerializer):
    id_engin = EnginForAffectationGetSerializer()
    id_equipement = EquipementGetSerializer()

    class Meta:
        model = EnginsEquipements
        fields = '__all__'


class EquipementESerializer(ModelSerializer):
    class Meta:
        model = EnginsEquipements
        fields = ('id_engin', 'id_equipement', 'action', 'd_limite_utilisation', 'date_montage',
                  'date_verification',)
