from rest_framework.serializers import ModelSerializer

from api.models import TypeServ


class TypeServitudeGetSerializer(ModelSerializer):
    class Meta:
        model = TypeServ
        fields = '__all__'


class TypeServitudeSerializer(ModelSerializer):
    class Meta:
        model = TypeServ
        fields = ('nom',)
