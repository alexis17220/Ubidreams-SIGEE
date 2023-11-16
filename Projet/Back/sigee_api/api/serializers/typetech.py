from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import TypeTech
from .gamme import GammeGetSerializer


class TypeTechGetSerializer(serializers.ModelSerializer):
    id_type_gamme = GammeGetSerializer()

    class Meta:
        model = TypeTech
        fields = '__all__'


class TypeTechSerializer(ModelSerializer):
    class Meta:
        model = TypeTech
        fields = ('nom', 'libelle', 'id_type_gamme',)
