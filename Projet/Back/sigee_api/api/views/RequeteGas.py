from django.db.models import Q, F, Count
from django.db.models.functions import Substr

from api.models import Reparation
from api.serializers.RequeteGas import RequeteGasGetSerializer
from api.utils.pagination import PaginationViewSet
from datetime import datetime

sql_date = datetime.now().strftime('%Y')


class RequeteGasViewSet(PaginationViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Reparation.objects.annotate(
        reparation_id=F('id_reparation'),
        engin_id=F('id_engin'),
        genre=F('id_engin__id_type_ops__id_type_genre'),
        type_deplacement=F('id_engin__type_deplacement'),
        carrosserie=F('id_engin__carrosserie'),
        immatriculation=F('id_engin__immatriculation'),
        id_adm=F('id_engin__radio__id_adm'),
        libelle_adm=F('id_engin__radio__id_adm__libelle'),
        id_phy=F('id_engin__radio__id_phy'),
        libelle_phy=F('id_engin__radio__id_phy__libelle'),
        date_sortie=F('d_sortie'),
        statut_ops=F('id_engin__id_statut_ops'),
        statut_tech=F('id_engin__id_statut_tech'),
        nom_marque=F('id_engin__id_marque__nom'),
        nom_equipeur=F('id_engin__id_equipeur__nom'),
        km=F('id_engin__compteur1'),
        intervenant=Substr('intervention__id_intervenant__nom', 1),
        nature_travaux=Substr('intervention__nature_travaux', 1),
        id_inter=Substr('intervention__id_intervention', 1),
        commentaire=Substr('intervention__commentaire', 1),
        d_fin_prev=F('intervention__d_fin_prev'),
        raison_entree=F('desc_raison_entree'),
        observation_chef_clot=F('observation_chef_cloture'),
        datesortie=F('d_sortie'),
        temoin_auteur=F('temoinauteur'),
        temoin_date=F('temoindate'),
        km_receptionner=F('km_reception'),
        hdm_moteur_receptionner=F('hdm_moteur_reception'),
        inter_non_clos=Count('intervention__id_intervention', filter=Q(intervention__d_clos=None)),
        inter_clos=Count('intervention__id_intervention', filter=Q(intervention__d_clos__isnull=False)),

    ).filter(
        Q(desc_raison_entree__isnull=True) | Q(desc_raison_entree__icontains='DECLASSEMENT'),
        Q(intervention__nature_travaux__icontains='ATTENTE DECLASSEMENT'),
        ~Q(statut_ops='0'),
        statut_tech='110',
        id_engin__carrosserie__isnull=False,
        intervention__d_clos__isnull=True,
        d_sortie__isnull=True,
    ).order_by('-d_sortie')
    serializer_class = RequeteGasGetSerializer
