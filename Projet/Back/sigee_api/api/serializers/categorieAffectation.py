from rest_framework.serializers import ModelSerializer

from api.models import CategorieAffectation


class CategorieAffectationGetSerializer(ModelSerializer):
    class Meta:
        model = CategorieAffectation
        fields = '__all__'
