from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Documents
from api.serializers import EnginGetSerializer


class DocumentsGetSerializer(ModelSerializer):
    id_engin = EnginGetSerializer()

    class Meta:
        model = Documents
        fields = '__all__'


class DocumentsSerializer(ModelSerializer):
    class Meta:
        model = Documents
        fields = ('titre', 'lien', 'id_engin', 'date_fv',)
