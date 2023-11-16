from rest_framework.serializers import ModelSerializer

from api.models import Equipeur


class EquipeurGetSerializer(ModelSerializer):
    class Meta:
        model = Equipeur
        fields = '__all__'


class EquipeurSerializer(ModelSerializer):
    class Meta:
        model = Equipeur
        fields = ('nom',)
