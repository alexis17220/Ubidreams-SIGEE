from rest_framework.serializers import ModelSerializer

from api.models import Marque


class MarqueGetSerializer(ModelSerializer):
    class Meta:
        model = Marque
        fields = '__all__'


class MarqueSerializer(ModelSerializer):
    class Meta:
        model = Marque
        fields = ('nom',)
