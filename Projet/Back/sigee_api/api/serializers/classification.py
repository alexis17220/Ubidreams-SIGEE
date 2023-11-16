from rest_framework.serializers import ModelSerializer

from api.models import TypeGenre


class ClassificationGetSerializer(ModelSerializer):
    class Meta:
        model = TypeGenre
        fields = '__all__'


class ClassificationSerializer(ModelSerializer):
    class Meta:
        model = TypeGenre
        fields = ('nom',)
