from rest_framework.serializers import ModelSerializer

from api.models import Utilisateur


class UsersSerializer(ModelSerializer):

    class Meta:
        model = Utilisateur
        fields = '__all__'
