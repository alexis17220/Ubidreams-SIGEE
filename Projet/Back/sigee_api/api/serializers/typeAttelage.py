from rest_framework.serializers import ModelSerializer

from api.models import TypeAttelage


class TypeAttelageGetSerializer(ModelSerializer):
    class Meta:
        model = TypeAttelage
        fields = '__all__'


class TypeAttelageSerializer(ModelSerializer):
    class Meta:
        model = TypeAttelage
        fields = ('nom',)
