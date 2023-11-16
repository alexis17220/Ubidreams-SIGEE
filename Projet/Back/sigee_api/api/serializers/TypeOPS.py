from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import TypeOps
from api.serializers import ClassificationGetSerializer


class TypeOPSGetSerializer(serializers.ModelSerializer):
    id_type_genre = ClassificationGetSerializer()

    class Meta:
        model = TypeOps
        fields = '__all__'


class TypeOPSSerializer(ModelSerializer):
    class Meta:
        model = TypeOps
        fields = ('nom', 'id_type_genre',)


class TypeOPSForEnginSerializer(ModelSerializer):
    class Meta:
        model = TypeOps
        fields = ('nom',)
