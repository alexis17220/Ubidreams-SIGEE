from rest_framework import serializers

from api.models import TypeEngin, TypeGenre
from api.serializers import ClassificationSerializer, EnginForReparationGetSerializer


class ClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeGenre
        fields = ('nom',)


class TypeEnginForEnginGetSerializer(serializers.ModelSerializer):
    id_engin = EnginForReparationGetSerializer()
    id_type_genre = ClassificationSerializer()

    class Meta:
        model = TypeEngin
        fields = ('id_type_genre',)
