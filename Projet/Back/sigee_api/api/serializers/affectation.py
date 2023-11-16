from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Affectation


class EnfantAffectationSerializer(ModelSerializer):
    class Meta:
        model = Affectation
        fields = ('id_affectation',
                  'libelle', 'libelle_long', 'temoinauteur', 'temoindate', 'libelle_sigale', 'alerte_ctx',
                  'code_centre', 'activation', 'enfants')


class AffectationSerializer(ModelSerializer):
    enfants = EnfantAffectationSerializer(many=True)

    class Meta:
        model = Affectation
        fields = ('id_affectation',
                  'libelle', 'libelle_long', 'temoinauteur', 'temoindate', 'libelle_sigale', 'alerte_ctx',
                  'code_centre', 'activation', 'enfants')


def get_childrens(affectation):
    output_list = []
    for enfant in affectation.enfants.all():
        if enfant.enfants.all().count() == 0:
            output_list.append(AffectationSerializer(enfant).data)
        else:
            out = get_childrens(enfant)
            output_list.append(out)

    return output_list


class AffectationGetSerializer(serializers.ModelSerializer):
    enfants = serializers.SerializerMethodField()

    class Meta:
        model = Affectation
        fields = ('id_affectation', 'libelle', 'libelle_long', 'temoinauteur', 'temoindate',
                  'libelle_sigale', 'alerte_ctx', 'code_centre', 'activation', 'enfants')

    def get_enfants(self, affectation):
        output_list = get_childrens(affectation)
        return output_list


class AffectationHistoSerializer(ModelSerializer):

    class Meta:
        model = Affectation
        fields = ('id_affectation', 'libelle', 'libelle_long', 'code_centre',)

