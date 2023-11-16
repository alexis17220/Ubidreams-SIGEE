from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import Engin, Radio
from .proprietaire import ProprietaireGetSerializer
from .categorie import CategorieGETSerializer
from .AppellationCom import AppellationGetSerializer
from .StatutTech import StatutTechGetSerializer
from .categorieAffectation import CategorieAffectationGetSerializer
from .equipeur import EquipeurSerializer, EquipeurGetSerializer
from .StatutOps import StatutOpsGetSerializer
from .TypeOPS import TypeOPSGetSerializer, TypeOPSSerializer, TypeOPSForEnginSerializer
from .etatEngin import EtatEnginGetSerializer
from .marque import MarqueSerializer, MarqueGetSerializer
from .radio import RadioAffectationGetSerializer, RadioGetSerializer
from .typeAttelage import TypeAttelageGetSerializer
from .typetech import TypeTechGetSerializer


class EnginGetSerializer(ModelSerializer):
    id_type_tech = TypeTechGetSerializer()
    id_appellation = AppellationGetSerializer()
    id_categorie = CategorieAffectationGetSerializer()
    id_type_ops = TypeOPSGetSerializer()
    id_marque = MarqueGetSerializer()
    id_radio = RadioGetSerializer()
    id_statut_ops = StatutOpsGetSerializer()
    id_statut_tech = StatutTechGetSerializer()
    id_equipeur = EquipeurGetSerializer()
    id_type_attelage = TypeAttelageGetSerializer()
    idfamille = CategorieGETSerializer()
    idproprietaire = ProprietaireGetSerializer()
    idetat_engin = EtatEnginGetSerializer()

    class Meta:
        model = Engin
        fields = '__all__'


class EnginSerializer(ModelSerializer):
    class Meta:
        model = Engin
        fields = '__all__'


class EnginReparationEnginForInterventionEGetSerializer(ModelSerializer):
    class Meta:
        model = Engin
        fields = ('immatriculation',)


class EnginForCommandeGetSerializer(ModelSerializer):
    id_type_ops = TypeOPSForEnginSerializer()

    class Meta:
        model = Engin
        fields = ('immatriculation', 'carrosserie', 'id_type_ops')


class EnginForReparationGetSerializer(ModelSerializer):
    id_statut_ops = StatutOpsGetSerializer()
    fix_id_radio = serializers.SerializerMethodField()
    id_type_ops = TypeOPSSerializer()
    id_marque = MarqueSerializer()
    id_equipeur = EquipeurSerializer()
    id_statut_tech = StatutTechGetSerializer()

    class Meta:
        model = Engin
        fields = (
            'immatriculation', 'carrosserie', 'id_statut_ops', 'fix_id_radio', 'id_type_ops', 'id_marque',
            'id_equipeur',
            'id_statut_tech',)

    def get_fix_id_radio(self, obj):
        if obj.id_radio is not None:
            return obj.id_radio
        id_radio = Radio.objects.filter(id_engin=obj.id_engin).all()
        if id_radio.count() == 0:
            return None
        radio_serialized = RadioAffectationGetSerializer(id_radio.first())
        return radio_serialized.data
