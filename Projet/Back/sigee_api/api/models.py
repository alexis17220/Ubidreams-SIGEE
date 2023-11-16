# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
import datetime

from django.db import models


class Administration(models.Model):
    nom = models.CharField(max_length=50, blank=True, null=True)
    valeur = models.CharField(max_length=256, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'administration'


class AffecHistoAdm(models.Model):
    # id_histo_adm = models.IntegerField(blank=True, null=True)
    id_histo_adm = models.IntegerField(primary_key=True)
    d_affec = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    id_affec_adm = models.ForeignKey('Affectation', models.DO_NOTHING, db_column='id_affec_adm', blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin', blank=True, null=True)
    reference = models.CharField(max_length=50, blank=True, null=True)
    masquer_alerte = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'affec_histo_adm'


class AffecHistoPhy(models.Model):
    # id_histo_phy = models.IntegerField(blank=True, null=True)
    id_histo_phy = models.IntegerField(primary_key=True)
    d_affec = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    id_affec_phy = models.ForeignKey('Affectation', models.DO_NOTHING, db_column='id_affec_phy', blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'affec_histo_phy'


class Affectation(models.Model):
    id_affectation = models.IntegerField(primary_key=True)
    libelle = models.CharField(unique=True, max_length=20, blank=True, null=True)
    libelle_long = models.CharField(max_length=100, blank=True, null=True)
    id_pere_adm = models.ForeignKey('self', models.DO_NOTHING, db_column='id_pere_adm', blank=True, null=True,
                                    related_name='enfants')
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    libelle_sigale = models.CharField(max_length=20, blank=True, null=True)
    alerte_ctx = models.IntegerField(blank=True, null=True)
    code_centre = models.CharField(max_length=10, blank=True, null=True)
    activation = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'affectation'


class AlerteCtx(models.Model):
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin')
    id_histo_adm = models.IntegerField(blank=True, null=True)
    nom = models.CharField(max_length=200, blank=True, null=True)
    d_alerte = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'alerte_ctx'


class Alertes(models.Model):
    id_alerte = models.BigIntegerField(primary_key=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin', blank=True, null=True)
    compteur1 = models.IntegerField(blank=True, null=True)
    compteur2 = models.IntegerField(blank=True, null=True)
    d_alerte = models.DateField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    raison = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'alertes'


class AppellationCommerciale(models.Model):
    id_appellation = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'appellation_commerciale'


class Autolog(models.Model):
    id = models.IntegerField(primary_key=True)
    ip_addr = models.CharField(unique=True, max_length=15, blank=True, null=True)
    login = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'autolog'


class CategorieAffectation(models.Model):
    # id_categorie = models.IntegerField(blank=True, null=True)
    id_categorie = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categorie_affectation'


class CategorieIntervention(models.Model):
    id_categorie = models.IntegerField(primary_key=True)
    libelle = models.CharField(max_length=50, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categorie_intervention'


class Commande(models.Model):
    id_commande = models.IntegerField(primary_key=True)
    no_bon_cmd = models.IntegerField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    id_intervention = models.ForeignKey('Intervention', models.DO_NOTHING, db_column='id_intervention')
    demande = models.CharField(max_length=1000, blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin')
    # id_etat = models.FloatField(blank=True, null=True)
    id_etat = models.ForeignKey('CommandeEtat', models.DO_NOTHING, db_column='id_etat')

    class Meta:
        managed = False
        db_table = 'commande'


class CommandeEtat(models.Model):
    id = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=20, blank=True, null=True)
    couleur = models.FloatField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    libelle = models.CharField(max_length=50, blank=True, null=True)
    couleur2 = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'commande_etat'


class Contentieux(models.Model):
    id_contentieux = models.IntegerField(primary_key=True)
    no_dossier = models.CharField(max_length=10, blank=True, null=True)
    d_contentieux = models.DateField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin')
    id_reparation = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'contentieux'


class DmrsAdditionalCtObjects(models.Model):
    type_ovid = models.CharField(max_length=36)
    object_ovid = models.CharField(max_length=36)
    object_id = models.CharField(max_length=70)
    object_type = models.CharField(max_length=10, blank=True, null=True)
    model_ovid = models.CharField(max_length=36)
    design_ovid = models.CharField(max_length=36)

    class Meta:
        managed = False
        db_table = 'dmrs_additional_ct_objects'


class DmrsViewOrderGroupby(models.Model):
    view_ovid = models.CharField(max_length=36)
    view_id = models.CharField(max_length=70)
    view_name = models.CharField(max_length=256)
    container_id = models.CharField(max_length=70)
    container_ovid = models.CharField(max_length=36)
    container_name = models.CharField(max_length=256)
    container_alias = models.CharField(max_length=256, blank=True, null=True)
    is_expression = models.CharField(max_length=1, blank=True, null=True)
    usage = models.CharField(max_length=1, blank=True, null=True)
    sequence = models.IntegerField()
    column_id = models.CharField(max_length=70, blank=True, null=True)
    column_ovid = models.CharField(max_length=36, blank=True, null=True)
    column_name = models.CharField(max_length=256, blank=True, null=True)
    column_alias = models.CharField(max_length=256, blank=True, null=True)
    sort_order = models.CharField(max_length=4, blank=True, null=True)
    expression = models.CharField(max_length=2000, blank=True, null=True)
    design_ovid = models.CharField(max_length=36)

    class Meta:
        managed = False
        db_table = 'dmrs_view_order_groupby'


class Documents(models.Model):
    id_type_tech = models.ForeignKey('TypeTech', models.DO_NOTHING, db_column='id_type_tech', blank=True, null=True)
    lien = models.FileField(blank=True, null=True, upload_to='engins/documents')
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    # id_document = models.IntegerField(blank=True, null=True)
    id_document = models.IntegerField(primary_key=True)
    titre = models.CharField(max_length=50, blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin', blank=True, null=True)
    date_fv = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'documents'


class DocumentsIntervention(models.Model):
    id_documentinter = models.IntegerField(primary_key=True)
    id_intervention = models.ForeignKey('Intervention', models.DO_NOTHING, db_column='id_intervention', blank=True,
                                        null=True)
    titre = models.CharField(max_length=50, blank=True, null=True)
    lien = models.CharField(max_length=1000, blank=True, null=True)
    date_document = models.DateField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'documents_intervention'


class Effectif(models.Model):
    ideffectif = models.IntegerField(primary_key=True)
    contrat_ops = models.IntegerField(blank=True, null=True)
    observations = models.CharField(max_length=250, blank=True, null=True)
    temoinauteur = models.CharField(max_length=20, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    libelle = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'effectif'


class EffectifTypeEngin(models.Model):
    id_effectif_type = models.IntegerField(primary_key=True)
    id_effectif = models.ForeignKey(Effectif, models.DO_NOTHING, db_column='id_effectif')
    id_type_engin = models.ForeignKey('TypeOps', models.DO_NOTHING, db_column='id_type_engin')

    class Meta:
        managed = False
        db_table = 'effectif_type_engin'


class Engin(models.Model):
    id_engin = models.BigIntegerField(primary_key=True)
    type_deplacement = models.BigIntegerField(blank=True, null=True)
    immatriculation = models.CharField(unique=True, max_length=10, blank=True, null=True)
    code_tag = models.IntegerField()
    code_vehicule = models.IntegerField(blank=True, null=True)
    d_entree_service = models.DateField()
    d_sortie_service = models.DateField(blank=True, null=True)
    # id_appellation = models.IntegerField(blank=True, null=True)
    id_appellation = models.ForeignKey('AppellationCommerciale', models.DO_NOTHING, db_column='id_appellation',
                                       blank=True, null=True)

    id_categorie = models.ForeignKey(CategorieAffectation, models.DO_NOTHING, db_column='id_categorie', blank=True,
                                     null=True)
    id_type_ops = models.ForeignKey('TypeOps', models.DO_NOTHING, db_column='id_type_ops', blank=True, null=True)
    id_marque = models.ForeignKey('Marque', models.DO_NOTHING, db_column='id_marque', blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    limite_navigation_etat_mer = models.BigIntegerField(blank=True, null=True)
    certif_immat = models.BinaryField(blank=True, null=True)
    no_mine = models.CharField(max_length=20, blank=True, null=True)
    type_mine = models.CharField(max_length=20, blank=True, null=True)
    no_dossier = models.CharField(max_length=10, blank=True, null=True)
    no_folio = models.CharField(max_length=20, blank=True, null=True)
    no_inventaire_ville = models.CharField(max_length=10, blank=True, null=True)
    d_sortie_inventaire_ville = models.DateField(blank=True, null=True)
    duree_vie_theorique = models.BigIntegerField(blank=True, null=True)
    p_achat_chassis = models.FloatField(blank=True, null=True)
    p_achat_equipement = models.FloatField(blank=True, null=True)
    carrosserie = models.CharField(max_length=15, blank=True, null=True)
    p_fiscale = models.IntegerField(blank=True, null=True)
    nb_places_assurance = models.BigIntegerField(blank=True, null=True)
    compteur1 = models.BigIntegerField(blank=True, null=True)
    no_ordre_type = models.BigIntegerField(blank=True, null=True)
    observation_radio = models.CharField(max_length=100, blank=True, null=True)
    deplacement = models.FloatField(blank=True, null=True)
    vitesse_max = models.IntegerField(blank=True, null=True)
    id_radio = models.ForeignKey('Radio', models.DO_NOTHING, db_column='id_radio', blank=True, null=True)
    armement_pompier = models.BigIntegerField(blank=True, null=True)
    armement_flotte = models.BigIntegerField(blank=True, null=True)
    limite_navigation_dist = models.FloatField(blank=True, null=True)
    id_statut_ops = models.ForeignKey('Statut', models.DO_NOTHING, db_column='id_statut_ops',
                                      related_name='engins_statut_ops')
    no_depart = models.CharField(max_length=3, blank=True, null=True)
    # id_statut_tech = models.IntegerField()
    id_statut_tech = models.ForeignKey('Statut', models.DO_NOTHING, db_column='id_statut_tech',
                                       related_name='engins_statut_tech')
    id_equipeur = models.ForeignKey('Equipeur', models.DO_NOTHING, db_column='id_equipeur', blank=True, null=True)
    compteur2 = models.BigIntegerField(blank=True, null=True)
    no_bcm = models.CharField(max_length=50, blank=True, null=True)
    id_type_tech = models.ForeignKey('TypeTech', models.DO_NOTHING, db_column='id_type_tech', blank=True, null=True)
    d_fvassurance = models.DateField(blank=True, null=True)
    d_fvadministrative = models.DateField(blank=True, null=True)
    observations = models.CharField(max_length=1000, blank=True, null=True)
    tracteur = models.BooleanField()
    id_type_attelage = models.ForeignKey('TypeAttelage', models.DO_NOTHING, db_column='id_type_attelage', blank=True,
                                         null=True)
    longueur = models.IntegerField(blank=True, null=True)
    largeur = models.IntegerField(blank=True, null=True)
    hauteur = models.IntegerField(blank=True, null=True)
    ptac = models.BigIntegerField(blank=True, null=True)
    double_clef = models.BooleanField(blank=True, null=True)
    # idfamille = models.FloatField(blank=True, null=True)
    idfamille = models.ForeignKey('FamilleEngin', models.DO_NOTHING, db_column='idfamille', blank=True,
                                  null=True)
    # idproprietaire = models.FloatField(blank=True, null=True)
    idproprietaire = models.ForeignKey('ProprietaireEngin', models.DO_NOTHING, db_column='idproprietaire', blank=True,
                                       null=True)
    no_inventaire_ville2 = models.CharField(max_length=50, blank=True, null=True)
    # idetat_engin = models.FloatField(blank=True, null=True)
    idetat_engin = models.ForeignKey('EtatEngin', models.DO_NOTHING, db_column='idetat_engin', blank=True,
                                     null=True)
    d_mise_circulation = models.DateField(blank=True, null=True)
    no_serie = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'engin'


class EnginsEquipements(models.Model):
    #   idengins_equipements = models.FloatField()
    idengins_equipements = models.FloatField(primary_key=True)
    # id_engin = models.FloatField(blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin', blank=True, null=True)

    # id_equipement = models.FloatField(blank=True, null=True)
    id_equipement = models.ForeignKey('Equipements', models.DO_NOTHING, db_column='id_equipement', blank=True,
                                      null=True)

    temoindate = models.DateField(blank=True, null=True)
    action = models.CharField(max_length=255, blank=True, null=True)
    temoinauteur = models.CharField(max_length=255, blank=True, null=True)
    d_limite_utilisation = models.DateField(blank=True, null=True)
    date_montage = models.DateField(blank=True, null=True)
    date_verification = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'engins_equipements'


class Equipements(models.Model):
    # idequipements = models.FloatField(blank=True, null=True)
    idequipements = models.FloatField(primary_key=True)
    libelle = models.CharField(max_length=255, blank=True, null=True)
    periode_revision = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'equipements'


class Equipeur(models.Model):
    id_equipeur = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'equipeur'

    def __str__(self):
        return self.nom


class EtatEngin(models.Model):
    idetat_engin = models.FloatField(primary_key=True)
    libelle = models.CharField(max_length=20, blank=True, null=True)
    code_etat = models.CharField(max_length=5, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'etat_engin'


class FamilleEngin(models.Model):
    # idfamille = models.FloatField(primary_key=True)
    idfamille = models.IntegerField(primary_key=True)
    code_famille = models.CharField(max_length=5, blank=True, null=True)
    libelle_famille = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'famille_engin'


class Garantie(models.Model):
    id_garantie = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=100, blank=True, null=True)
    d_echeance = models.DateField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'garantie'


class GuepardImport(models.Model):
    equip_id = models.BigIntegerField(primary_key=True)
    modele = models.CharField(max_length=20, blank=True, null=True)
    no_serie = models.CharField(max_length=20, blank=True, null=True)
    rfgi = models.CharField(max_length=12, blank=True, null=True)
    date_prog = models.DateField(blank=True, null=True)
    adm = models.CharField(max_length=20, blank=True, null=True)
    immatriculation = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'guepard_import'


class HistoCompteur(models.Model):
    id_histocompteur = models.IntegerField(primary_key=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin')
    d_compteur = models.DateField(blank=True, null=True)
    compteur1 = models.IntegerField(blank=True, null=True)
    compteur2 = models.IntegerField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    moteur = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'histo_compteur'


class HistoGisement(models.Model):
    id_histo_gisement = models.IntegerField(primary_key=True)
    d_affec = models.DateField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    # id_affec = models.IntegerField(blank=True, null=True)
    id_affec = models.ForeignKey('Affectation', models.DO_NOTHING, db_column='id_affec', blank=True, null=True)
    # id_engin = models.IntegerField(blank=True, null=True)
    id_engin = models.ForeignKey('Engin', models.DO_NOTHING, db_column='id_engin', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'histo_gisement'


class HistoImmat(models.Model):
    id_histo_immat = models.FloatField(primary_key=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin')
    immat = models.CharField(max_length=10, blank=True, null=True)
    d_histo_immat = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'histo_immat'


class Images(models.Model):
    id = models.IntegerField(primary_key=True)
    image = models.TextField(blank=True, null=True)  # This field type is a guess.
    blob_image = models.BinaryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'images'


class Intervenant(models.Model):
    id_intervenant = models.IntegerField(primary_key=True)
    nom = models.CharField(unique=True, max_length=20, blank=True, null=True)
    particularite = models.CharField(max_length=100, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())
    id_categorie = models.ForeignKey(CategorieIntervention, models.DO_NOTHING, db_column='id_categorie', blank=True,
                                     null=True)
    id_type_intervenant = models.ForeignKey('TypeIntervenant', models.DO_NOTHING, db_column='id_type_intervenant')

    class Meta:
        managed = False
        db_table = 'intervenant'


class Intervention(models.Model):
    id_intervention = models.FloatField(primary_key=True)
    id_reparation = models.ForeignKey('Reparation', models.DO_NOTHING, db_column='id_reparation')
    d_attribution_travaux = models.DateField(blank=True, null=True)
    nb_heure_atelier = models.FloatField(blank=True, null=True)
    hno = models.CharField(max_length=1, blank=True, null=True)
    montant_facture = models.FloatField(blank=True, null=True)
    observation_chef = models.CharField(max_length=2000, blank=True, null=True)
    nature_travaux = models.CharField(max_length=2000, blank=True, null=True)
    d_clos = models.DateField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_intervenant = models.ForeignKey(Intervenant, models.DO_NOTHING, db_column='id_intervenant')
    id_categorie = models.ForeignKey(CategorieIntervention, models.DO_NOTHING, db_column='id_categorie', blank=True,
                                     null=True)
    d_fin_prev = models.DateField(blank=True, null=True)
    commentaire = models.CharField(max_length=2000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'intervention'


class Logs(models.Model):
    dateheure = models.DateField()
    utilisateur = models.CharField(max_length=50, blank=True, null=True)
    action = models.CharField(max_length=255, blank=True, null=True)
    idlogs = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'logs'


class Marque(models.Model):
    id_marque = models.IntegerField(primary_key=True)
    nom = models.CharField(unique=True, max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'marque'


class Mat2K(models.Model):
    id_mat2k = models.IntegerField(primary_key=True)
    id_engin = models.IntegerField(blank=True, null=True)
    designation = models.CharField(max_length=50, blank=True, null=True)
    nno = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mat2k'


class MaterielHs(models.Model):
    idmateriel_hs = models.IntegerField(primary_key=True)
    idmateriel = models.ForeignKey('Materiels', models.DO_NOTHING, db_column='idmateriel', blank=True, null=True)
    idengin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='idengin', blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'materiel_hs'


class Materiels(models.Model):
    idmateriel = models.IntegerField(primary_key=True)
    idtype_ops = models.ForeignKey('TypeOps', models.DO_NOTHING, db_column='idtype_ops', blank=True, null=True)
    designation = models.CharField(max_length=50, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'materiels'


class MistralEngins(models.Model):
    no_ordre = models.IntegerField(primary_key=True)
    etat = models.CharField(max_length=1)
    date_export = models.DateField()
    import_field = models.CharField(db_column='import', max_length=1, blank=True,
                                    null=True)  # Field renamed because it was a Python reserved word.
    date_import = models.DateField(blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin')
    type_operationnel = models.CharField(max_length=10)
    fonction_secondaire = models.CharField(max_length=10, blank=True, null=True)
    code_centre = models.CharField(max_length=10)
    date_affectation = models.DateField()
    remorque = models.BigIntegerField(blank=True, null=True)
    peut_tracter = models.BigIntegerField(blank=True, null=True)
    type_attelage = models.BigIntegerField(blank=True, null=True)
    num_carrosserie = models.CharField(max_length=15, blank=True, null=True)
    cg_immat = models.CharField(max_length=10, blank=True, null=True)
    cg_date_acqui = models.DateField(blank=True, null=True)
    cg_date_service = models.DateField(blank=True, null=True)
    cg_modele = models.CharField(max_length=30, blank=True, null=True)
    cg_equipeur = models.CharField(max_length=30, blank=True, null=True)
    cg_constructeur = models.CharField(max_length=30, blank=True, null=True)
    hauteur = models.BigIntegerField(blank=True, null=True)
    largeur = models.BigIntegerField(blank=True, null=True)
    poids = models.BigIntegerField(blank=True, null=True)
    longueur = models.BigIntegerField(blank=True, null=True)
    vitesse = models.BigIntegerField(blank=True, null=True)
    code_tag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mistral_engins'


class MistralMaterielIndispo(models.Model):
    no_ordre = models.IntegerField(primary_key=True)
    etat = models.CharField(max_length=1)
    date_export = models.DateField()
    import_field = models.CharField(db_column='import', max_length=1, blank=True,
                                    null=True)  # Field renamed because it was a Python reserved word.
    date_import = models.DateField(blank=True, null=True)
    no_immobilisation = models.ForeignKey(Engin, models.DO_NOTHING, db_column='no_immobilisation')
    code_centre = models.CharField(max_length=10)
    indisponibilite = models.BigIntegerField()
    indispo_dh_deb = models.DateField(blank=True, null=True)
    indispo_dh_fin = models.DateField(blank=True, null=True)
    indispo_commentaire = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mistral_materiel_indispo'


class MistralRadiosFixes(models.Model):
    no_ordre = models.BigIntegerField(primary_key=True)
    date_export = models.DateField(blank=True, null=True)
    import_field = models.CharField(db_column='import', max_length=1, blank=True,
                                    null=True)  # Field renamed because it was a Python reserved word.
    date_import = models.DateField(blank=True, null=True)
    no_immo_materiel = models.BigIntegerField(blank=True, null=True)
    rfgi = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mistral_radios_fixes'


class OperationPeriodique(models.Model):
    id_operation = models.IntegerField(primary_key=True)
    d_prevue = models.DateField()
    echeance_numerique = models.BigIntegerField(blank=True, null=True)
    d_realisee = models.DateField(blank=True, null=True)
    kilometrage_reel = models.BigIntegerField(blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin', blank=True, null=True)
    id_type = models.ForeignKey('TypeOperationPerio', models.DO_NOTHING, db_column='id_type')
    id_reparation = models.IntegerField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'operation_periodique'


class OramanPlanTable(models.Model):
    statement_id = models.CharField(max_length=30, blank=True, null=True)
    plan_id = models.FloatField(blank=True, null=True)
    timestamp = models.DateField(blank=True, null=True)
    remarks = models.CharField(max_length=4000, blank=True, null=True)
    operation = models.CharField(max_length=30, blank=True, null=True)
    options = models.CharField(max_length=255, blank=True, null=True)
    object_node = models.CharField(max_length=128, blank=True, null=True)
    object_owner = models.CharField(max_length=30, blank=True, null=True)
    object_name = models.CharField(max_length=30, blank=True, null=True)
    object_alias = models.CharField(max_length=65, blank=True, null=True)
    object_instance = models.BigIntegerField(blank=True, null=True)
    object_type = models.CharField(max_length=30, blank=True, null=True)
    optimizer = models.CharField(max_length=255, blank=True, null=True)
    search_columns = models.FloatField(blank=True, null=True)
    parent_id = models.BigIntegerField(blank=True, null=True)
    depth = models.BigIntegerField(blank=True, null=True)
    position = models.BigIntegerField(blank=True, null=True)
    cost = models.BigIntegerField(blank=True, null=True)
    cardinality = models.BigIntegerField(blank=True, null=True)
    bytes = models.BigIntegerField(blank=True, null=True)
    other_tag = models.CharField(max_length=255, blank=True, null=True)
    partition_start = models.CharField(max_length=255, blank=True, null=True)
    partition_stop = models.CharField(max_length=255, blank=True, null=True)
    partition_id = models.BigIntegerField(blank=True, null=True)
    other = models.TextField(blank=True, null=True)  # This field type is a guess.
    distribution = models.CharField(max_length=30, blank=True, null=True)
    cpu_cost = models.BigIntegerField(blank=True, null=True)
    io_cost = models.BigIntegerField(blank=True, null=True)
    temp_space = models.BigIntegerField(blank=True, null=True)
    access_predicates = models.CharField(max_length=4000, blank=True, null=True)
    filter_predicates = models.CharField(max_length=4000, blank=True, null=True)
    projection = models.CharField(max_length=4000, blank=True, null=True)
    time = models.BigIntegerField(blank=True, null=True)
    qblock_name = models.CharField(max_length=30, blank=True, null=True)
    other_xml = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oraman_plan_table'


class Organe(models.Model):
    id_organe = models.IntegerField(primary_key=True)
    id_type_organe = models.ForeignKey('TypeOrgane', models.DO_NOTHING, db_column='id_type_organe')
    id_marque = models.ForeignKey(Marque, models.DO_NOTHING, db_column='id_marque', blank=True, null=True)
    identifiant = models.CharField(max_length=100)
    dispo_tech = models.CharField(max_length=1, blank=True, null=True)
    commentaire = models.CharField(max_length=100, blank=True, null=True)
    compteur = models.IntegerField(blank=True, null=True)
    temoin_auteur = models.CharField(max_length=50, blank=True, null=True)
    temoin_date = models.DateField(blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'organe'


class PlanArmement(models.Model):
    idplanarmement = models.IntegerField(primary_key=True)
    nbnormal = models.BigIntegerField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    idtypeengin = models.ForeignKey('TypeOps', models.DO_NOTHING, db_column='idtypeengin')
    idtypeaffectation = models.ForeignKey(Affectation, models.DO_NOTHING, db_column='idtypeaffectation')
    nbprevision = models.IntegerField(blank=True, null=True)
    commentaire = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'plan_armement'


class PlanEquipement(models.Model):
    id_plan_equip = models.IntegerField(primary_key=True)
    nb_normal = models.BigIntegerField(blank=True, null=True)
    nb_mini = models.BigIntegerField(blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin')
    id_type_materiel = models.ForeignKey('TypeMateriel', models.DO_NOTHING, db_column='id_type_materiel')

    class Meta:
        managed = False
        db_table = 'plan_equipement'
        unique_together = (('id_plan_equip', 'id_engin', 'id_type_materiel'),)


class PositionTechnique(models.Model):
    id_position = models.IntegerField(primary_key=True)
    position_technique = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'position_technique'


class ProprietaireEngin(models.Model):
    #  idproprietaire = models.FloatField(blank=True, null=True)
    idproprietaire = models.FloatField(primary_key=True)
    code_proprietaire = models.CharField(max_length=5, blank=True, null=True)
    libelle = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'proprietaire_engin'


class Radio(models.Model):
    id_radio = models.IntegerField(primary_key=True)
    id_typeradio = models.ForeignKey('Typeradio', models.DO_NOTHING, db_column='id_typeradio', blank=True, null=True)
    rfgi = models.CharField(max_length=12, blank=True, null=True)
    date_maintenance = models.DateField(blank=True, null=True)
    observations = models.CharField(max_length=100, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_adm = models.ForeignKey(Affectation, models.DO_NOTHING, db_column='id_adm', blank=True, null=True,
                               related_name='adm_radios')
    id_phy = models.ForeignKey(Affectation, models.DO_NOTHING, db_column='id_phy', blank=True, null=True,
                               related_name='phy_radios')
    serialnum = models.CharField(max_length=20, blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin')
    id_magali = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'radio'


class Reparation(models.Model):
    id_reparation = models.IntegerField(primary_key=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin')
    d_entree = models.DateField(blank=True, null=True)
    km_reception = models.BigIntegerField(blank=True, null=True)
    hdm_moteur_reception = models.BigIntegerField(blank=True, null=True)
    desc_raison_entree = models.CharField(max_length=2000, blank=True, null=True)
    cause_presume_indispo = models.CharField(max_length=100, blank=True, null=True)
    cr_bilan = models.CharField(max_length=500, blank=True, null=True)
    contact = models.CharField(max_length=100, blank=True, null=True)
    d_sortie = models.DateField(blank=True, null=True)
    observation_chef_cloture = models.CharField(max_length=254, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_statut = models.ForeignKey('Statut', models.DO_NOTHING, db_column='id_statut', blank=True, null=True)
    nom_receptionniste = models.CharField(max_length=100, blank=True, null=True)
    cloture_technique = models.CharField(max_length=1, blank=True, null=True)
    cloture_logisitique = models.CharField(max_length=1, blank=True, null=True)
    no_ordre_intervention = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reparation'


class ReparationModele(models.Model):
    id_modele = models.IntegerField(primary_key=True)
    titre = models.CharField(unique=True, max_length=50, blank=True, null=True)
    raison = models.CharField(max_length=255, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reparation_modele'


class ReparationModeleInt(models.Model):
    id_modele = models.ForeignKey(ReparationModele, models.DO_NOTHING, db_column='id_modele')
    id_intervenant = models.ForeignKey(Intervenant, models.DO_NOTHING, db_column='id_intervenant', blank=True,
                                       null=True)
    raison = models.CharField(max_length=255, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reparation_modele_int'
        unique_together = (('id_modele', 'id_intervenant'),)


class Statut(models.Model):
    id_statut = models.IntegerField(primary_key=True)
    libelle = models.CharField(max_length=2, blank=True, null=True)
    ops = models.IntegerField(blank=True, null=True)
    libelle_long = models.CharField(max_length=100, blank=True, null=True)
    mistral = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'statut'


class TblDebug(models.Model):
    dateheure = models.DateField(blank=True, null=True)
    logs = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_debug'


class TcoEngins(models.Model):
    genre = models.CharField(max_length=20, blank=True, null=True)
    gamme = models.CharField(max_length=20, blank=True, null=True)
    cout_assurance = models.IntegerField(blank=True, null=True)
    ptac = models.IntegerField(blank=True, null=True)
    puiss_fisc = models.IntegerField(blank=True, null=True)
    t_engin = models.CharField(max_length=20, blank=True, null=True)
    cat_affec = models.CharField(max_length=20, blank=True, null=True)
    carrosserie = models.CharField(max_length=20, blank=True, null=True)
    affec_adm = models.CharField(max_length=20, blank=True, null=True)
    immat = models.CharField(max_length=20, blank=True, null=True)
    marque = models.CharField(max_length=50, blank=True, null=True)
    equipeur = models.CharField(max_length=50, blank=True, null=True)
    d_mes = models.CharField(max_length=20, blank=True, null=True)
    num_ville = models.CharField(max_length=20, blank=True, null=True)
    num_dossier = models.CharField(max_length=20, blank=True, null=True)
    d_kilometrage = models.CharField(max_length=20, blank=True, null=True)
    kilometrage = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tco_engins'


class TcoPuissance(models.Model):
    immat = models.CharField(max_length=20, blank=True, null=True)
    puissance = models.IntegerField(blank=True, null=True)
    immatriculation = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tco_puissance'


class TypeAttelage(models.Model):
    id_type_attelage = models.IntegerField(primary_key=True)
    nom = models.CharField(unique=True, max_length=30, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True, auto_now_add=datetime.datetime.now().date())

    class Meta:
        managed = False
        db_table = 'type_attelage'


class TypeEngin(models.Model):
    idtype_engin = models.IntegerField(blank=True, null=True)
    # id_type_genre = models.ForeignKey(TypeGenre, models.DO_NOTHING, db_column='id_type_genre', blank=True, null=True)
    id_type_gamme = models.FloatField(blank=True, null=True)
    id_engin = models.ForeignKey(Engin, models.DO_NOTHING, db_column='id_engin', blank=True, null=True)
    masse_engin = models.CharField(max_length=20, blank=True, null=True)
    annee = models.CharField(max_length=20, blank=True, null=True)
    numero_engin = models.CharField(max_length=20, blank=True, null=True)
    id_type_serv = models.FloatField(blank=True, null=True)
    gisement_reel = models.ForeignKey(Affectation, models.DO_NOTHING, db_column='gisement_reel', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_engin'


class TypeGamme(models.Model):
    # id_type_gamme = models.IntegerField(blank=True, null=True)
    id_type_gamme = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_gamme'


class TypeGenre(models.Model):
    # id_type_genre = models.IntegerField(blank=True, null=True)
    id_type_genre = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_genre'


class TypeIntervenant(models.Model):
    id_type_intervenant = models.IntegerField(primary_key=True)
    categorie = models.CharField(max_length=30, blank=True, null=True)
    estexterne = models.CharField(max_length=1, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_intervenant'


class TypeMateriel(models.Model):
    id_type_materiel = models.IntegerField(primary_key=True)
    type_materiel = models.BigIntegerField(blank=True, null=True)
    libelle = models.CharField(max_length=100, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_materiel'


class TypeOperationPerio(models.Model):
    id_type = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    id_type_engin = models.ForeignKey('TypeOps', models.DO_NOTHING, db_column='id_type_engin', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_operation_perio'


class TypeOps(models.Model):
    id_type_ops = models.IntegerField(primary_key=True)
    nom = models.CharField(unique=True, max_length=10, blank=True, null=True)
    # id_type_genre = models.IntegerField(blank=True, null=True)
    id_type_genre = models.ForeignKey('TypeGenre', models.DO_NOTHING, db_column='id_type_genre', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_ops'


class TypeOrgane(models.Model):
    id_type_organe = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50, blank=True, null=True)
    temoin_auteur = models.CharField(max_length=50, blank=True, null=True)
    temoin_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_organe'


class TypeServ(models.Model):
    id_type_serv = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_serv'


class TypeTech(models.Model):
    id_type_tech = models.IntegerField(primary_key=True)
    nom = models.CharField(unique=True, max_length=20, blank=True, null=True)
    # id_type_gamme = models.IntegerField(blank=True, null=True)
    id_type_gamme = models.ForeignKey('TypeGamme', models.DO_NOTHING, db_column='id_type_gamme', blank=True, null=True)
    libelle = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'type_tech'


class Typeradio(models.Model):
    id_typeradio = models.IntegerField(primary_key=True)
    marque = models.CharField(max_length=30, blank=True, null=True)
    freq_sys = models.CharField(max_length=20, blank=True, null=True)
    delai_maintenance = models.IntegerField(blank=True, null=True)
    nom = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'typeradio'


class UtilIntervenant(models.Model):
    id_utilisateur = models.ForeignKey('Utilisateur', models.DO_NOTHING, db_column='id_utilisateur')
    id_intervenant = models.ForeignKey(Intervenant, models.DO_NOTHING, db_column='id_intervenant')
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'util_intervenant'


class Utilisateur(models.Model):
    idutilisateur = models.IntegerField(primary_key=True)
    login = models.CharField(unique=True, max_length=50, blank=True, null=True)
    affecacces = models.CharField(max_length=20, blank=True, null=True)
    droits = models.BigIntegerField(blank=True, null=True)
    last_access = models.DateField(blank=True, null=True)
    affecpref = models.CharField(max_length=20, blank=True, null=True)
    temoinauteur = models.CharField(max_length=50, blank=True, null=True)
    temoindate = models.DateField(blank=True, null=True)
    mail_alert = models.IntegerField(blank=True, null=True)
    azerty1login = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'utilisateur'
