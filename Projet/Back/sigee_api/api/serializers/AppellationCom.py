from rest_framework.serializers import ModelSerializer

from api.models import AppellationCommerciale


class AppellationGetSerializer(ModelSerializer):
    class Meta:
        model = AppellationCommerciale
        fields = '__all__'


class AppellationSerializer(ModelSerializer):
    class Meta:
        model = AppellationCommerciale
        fields = ('nom',)
