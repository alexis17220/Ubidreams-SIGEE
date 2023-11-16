from rest_framework.serializers import ModelSerializer

from api.models import TypeGamme


class GammeGetSerializer(ModelSerializer):
    class Meta:
        model = TypeGamme
        fields = '__all__'


class GammeSerializer(ModelSerializer):
    class Meta:
        model = TypeGamme
        fields = ('nom',)
