// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {get} from 'lodash'; // Fonction get du module lodash pour accéder aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants
import moment from 'moment'; // Module pour la manipulation des dates
import 'moment/locale/fr'; // Configuration du module moment pour utiliser la locale française

// Définition de l'objet EnginTableData contenant les informations de la table d'engins
const EnginTableData = {
    engins: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            immatriculation: {
                title: I18n.t('pages.engin.table.registration'),  // Titre de la colonne traduit
                key: 'immatriculation',  // Clé unique de la colonne
                dataIndex: 'immatriculation',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) => (
                    (get(a, 'immatriculation', '') || '').localeCompare(get(b, 'immatriculation', ''))
                ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs d'immatriculation
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            tech: {
                title: I18n.t('pages.engin.table.typeTech'),  // Titre de la colonne traduit
                key: 'tech',  // Clé unique de la colonne
                dataIndex: 'id_type_tech',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (id_type_tech) => get(id_type_tech, 'nom', ''),  // Fonction pour afficher le nom du type de tech
                sorter: (a, b) => (
                    (get(a, 'id_type_tech.nom', '') || '').localeCompare(get(b, 'id_type_tech.nom', ''))
                ),
                // Fonction de tri personnalisée pour cette colonne, compare les noms de type de tech
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            carrosserie: {
                title: I18n.t('pages.engin.table.bodywork'),
                key: 'carrosserie',
                dataIndex: 'carrosserie',
                sorter: (a, b) => (
                    (get(a, 'carrosserie', '') || '').localeCompare(get(b, 'carrosserie', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            circulation: {
                title: I18n.t('pages.engin.table.dateCircu'),
                key: 'circulation',
                dataIndex: 'd_mise_circulation',
                sorter: (a, b) => (
                    (get(a, 'd_mise_circulation', '') || '').localeCompare(get(b, 'd_mise_circulation', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            genre: {
                title: I18n.t('pages.engin.table.classification'),
                key: 'genre',
                dataIndex: 'id_type_ops',
                render: (id_type_ops) => get(id_type_ops, 'id_type_genre.nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_ops.id_type_genre.nom', '') || '').localeCompare(get(b, 'id_type_ops.id_type_genre.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },

            famille: {
                title: I18n.t('pages.engin.table.famille'),
                key: 'famille',
                dataIndex: 'idfamille',
                render: (idfamille) => get(idfamille, 'libelle_famille', ''),
                sorter: (a, b) => (
                    (get(a, 'idfamille.libelle_famille', '') || '').localeCompare(get(b, 'idfamille.libelle_famille', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            gamme: {
                title: I18n.t('pages.engin.table.gamme'),
                key: 'gamme',
                dataIndex: 'id_type_tech',
                render: (id_type_tech) => get(id_type_tech, 'id_type_gamme.nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_tech.id_type_gamme.nom', '') || '').localeCompare(get(b, 'id_type_tech.id_type_gamme.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            marque: {
                title: I18n.t('pages.engin.table.marque'),
                key: 'marque',
                dataIndex: 'id_marque',
                render: (id_marque) => get(id_marque, 'nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_marque.nom', '') || '').localeCompare(get(b, 'id_marque.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },

            appcom: {
                title: I18n.t('pages.engin.table.appellation'),
                key: 'appcom',
                dataIndex: 'id_appellation',
                render: (id_appellation) => get(id_appellation, 'nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_appellation.nom', '') || '').localeCompare(get(b, 'id_appellation.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            equipeur: {
                title: I18n.t('pages.engin.table.equipeur'),
                key: 'equipeur',
                dataIndex: 'id_equipeur',
                render: (id_equipeur) => get(id_equipeur, 'nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_equipeur.nom', '') || '').localeCompare(get(b, 'id_equipeur.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            phy: {
                title: I18n.t('pages.engin.table.affectPhy'),
                key: 'phy',
                dataIndex: 'id_affectation_physique',
                render: (id_affectation_physique) => get(id_affectation_physique, 'id_affec_phy.libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'id_affectation_physique.id_affec_phy.libelle', '') || '').localeCompare(get(b, 'id_affectation_physique.id_affec_phy.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            adm: {
                title: I18n.t('pages.engin.table.affectAdm'),
                key: 'adm',
                dataIndex: 'id_affectation_administrative',
                render: (id_affectation_administrative) => get(id_affectation_administrative, 'id_affec_adm.libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'id_affectation_administrative.id_affec_adm.libelle', '') || '').localeCompare(get(b, 'id_affectation_administrative.id_affec_adm.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            years: {
                title: I18n.t('pages.engin.table.years'),
                key: 'years',
                dataIndex: 'id_type_engin',
                render: (id_type_engin) => get(id_type_engin, 'annee', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_engin.annee', '') || '').localeCompare(get(b, 'id_type_engin.annee', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            proprietaire: {
                title: I18n.t('pages.engin.table.proprietaire'),
                key: 'proprietaire',
                dataIndex: 'idproprietaire',
                render: (idproprietaire) => get(idproprietaire, 'libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'idproprietaire.libelle', '') || '').localeCompare(get(b, 'idproprietaire.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            sortieInventaire: {
                title: I18n.t('pages.engin.table.dateSortInventaire'),
                key: 'sortieInventaire',
                dataIndex: 'd_sortie_inventaire_ville',
                sorter: (a, b) => (
                    (get(a, 'd_sortie_inventaire_ville', '') || '').localeCompare(get(b, 'd_sortie_inventaire_ville', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            etat: {
                title: I18n.t('pages.engin.table.etatEngin'),
                key: 'etat',
                dataIndex: 'idetat_engin',
                render: (idetat_engin) => get(idetat_engin, 'libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'idetat_engin.libelle', '') || '').localeCompare(get(b, 'idetat_engin.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            d_fvadministrative: {
                title: I18n.t('pages.engin.table.d_fvadministrative'),
                key: 'd_fvadministrative',
                dataIndex: 'd_fvadministrative',
                sorter: (a, b) => (
                    (get(a, 'd_fvadministrative', '') || '').localeCompare(get(b, 'd_fvadministrative', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            d_sortie_service: {
                title: I18n.t('pages.engin.table.d_sortie_service'),
                key: 'd_sortie_service',
                dataIndex: 'd_sortie_service',
                sorter: (a, b) => (
                    (get(a, 'd_sortie_service', '') || '').localeCompare(get(b, 'd_sortie_service', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            no_bcm: {
                title: I18n.t('pages.engin.table.bcm'),
                key: 'no_bcm',
                dataIndex: 'no_bcm',
                sorter: (a, b) => (
                    (get(a, 'no_bcm', '') || '').localeCompare(get(b, 'no_bcm', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            typeOps: {
                title: I18n.t('pages.engin.table.typeOps'),
                key: 'typeOps',
                dataIndex: 'id_type_ops',
                render: (id_type_ops) => get(id_type_ops, 'nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_ops.nom', '') || '').localeCompare(get(b, 'id_type_ops.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            typeServ: {
                title: I18n.t('pages.engin.table.typeServ'),
                key: 'typeServ',
                dataIndex: 'id_type_engin',
                render: (id_type_engin) => get(id_type_engin, 'id_type_serv.nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_engin.id_type_serv.nom', '') || '').localeCompare(get(b, 'id_type_engin.id_type_serv.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            compteur: {
                title: I18n.t('pages.engin.table.compteur'),
                key: 'compteur',
                dataIndex: 'compteur1',
                sorter: (a, b) => (
                    (get(a, 'compteur1', '') || '').localeCompare(get(b, 'compteur1', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            vie: {
                title: I18n.t('pages.engin.table.dureeVie'),
                key: 'vie',
                dataIndex: 'duree_vie_theorique',
                sorter: (a, b) => (
                    (get(a, 'duree_vie_theorique', '') || '').localeCompare(get(b, 'duree_vie_theorique', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            gisement: {
                title: I18n.t('pages.engin.table.position'),
                key: 'gisement',
                dataIndex: 'id_type_engin',
                render: (id_type_engin) => get(id_type_engin, 'gisement_reel.libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_engin.gisement_reel.libelle', '') || '').localeCompare(get(b, 'id_type_engin.gisement_reel.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            mine: {
                title: I18n.t('pages.engin.table.mine'),
                key: 'mine',
                dataIndex: 'no_mine',
                sorter: (a, b) => (
                    (get(a, 'no_mine', '') || '').localeCompare(get(b, 'no_mine', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            d_entree_service: {
                title: I18n.t('pages.engin.table.dateEntre'),
                key: 'd_entree_service',
                dataIndex: 'd_entree_service',
                sorter: (a, b) => (
                    (get(a, 'd_entree_service', '') || '').localeCompare(get(b, 'd_entree_service', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            categorie: {
                title: I18n.t('pages.engin.table.catAffect'),
                key: 'categorie',
                dataIndex: 'id_categorie',
                render: (id_categorie) => get(id_categorie, 'nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_categorie.nom', '') || '').localeCompare(get(b, 'id_categorie.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            statutTech: {
                title: I18n.t('pages.engin.table.statutTech'),
                key: 'statutTech',
                dataIndex: 'id_statut_tech',
                render: (id_statut_tech) => get(id_statut_tech, 'libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'id_statut_tech.libelle', '') || '').localeCompare(get(b, 'id_statut_tech.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            statutOps: {
                title: I18n.t('pages.engin.table.statutOps'),
                key: 'statutOps',
                dataIndex: 'id_statut_ops',
                render: (id_statut_ops) => get(id_statut_ops, 'libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'id_statut_ops.libelle', '') || '').localeCompare(get(b, 'id_statut_ops.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            compteur1: {
                title: I18n.t('pages.engin.table.compteur1'),
                key: 'compteur1',
                dataIndex: 'compteur1',
                render: (compteur1, record) => (
                    (record.compteur1 || '') + (80 * (record.compteur2 || 0))
                ),
                sorter: (a, b) => (
                    (get(a, 'compteur1', '') || '').localeCompare(get(b, 'compteur1', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            horametre: {
                title: I18n.t('pages.engin.table.horametre'),
                key: 'horametre',
                dataIndex: 'compteur2',
                sorter: (a, b) => (
                    (get(a, 'compteur2', '') || '').localeCompare(get(b, 'compteur2', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            folio: {
                title: I18n.t('pages.engin.table.folio'),
                key: 'folio',
                dataIndex: 'no_folio',
                sorter: (a, b) => (
                    (get(a, 'no_folio', '') || '').localeCompare(get(b, 'no_folio', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            dossier: {
                title: I18n.t('pages.engin.table.dossier'),
                key: 'dossier',
                dataIndex: 'no_dossier',
                sorter: (a, b) => (
                    (get(a, 'no_dossier', '') || '').localeCompare(get(b, 'no_dossier', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            inventaire: {
                title: I18n.t('pages.engin.table.invVille'),
                key: 'inventaire',
                dataIndex: 'no_inventaire_ville',
                sorter: (a, b) => (
                    (get(a, 'no_inventaire_ville', '') || '').localeCompare(get(b, 'no_inventaire_ville', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            observation: {
                title: I18n.t('pages.engin.table.observation'),
                key: 'observation',
                dataIndex: 'observations',
                sorter: (a, b) => (
                    (get(a, 'observations', '') || '').localeCompare(get(b, 'observations', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            numero_engin: {
                title: I18n.t('pages.engin.table.numero_engin'),
                key: 'numero_engin',
                dataIndex: 'id_type_engin',
                render: (id_type_engin) => get(id_type_engin, 'numero_engin', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_engin.numero_engin', '') || '').localeCompare(get(b, 'id_type_engin.numero_engin', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            age: {
                title: I18n.t('pages.engin.table.age'),
                key: 'age',
                dataIndex: 'd_mise_circulation',
                render: (d_mise_circulation, record) => {
                    const miseCirculation = moment(d_mise_circulation, 'YYYY/MM/DD');
                    const d_sortie_service = moment(record.d_sortie_service, 'YYYY/MM/DD');
                    const today = moment();

                    const diff = record.d_sortie_service ? d_sortie_service.diff(miseCirculation) : today.diff(miseCirculation);
                    const duration = moment.duration(diff);
                    const years = duration.years();
                    const months = duration.months();
                    const days = duration.days();

                    const formattedYears = years ? `${years} an${years > 1 ? 's' : ''}` : '';
                    const formattedMonths = months ? `${months} mois` : '';
                    const formattedDays = days ? `${days} jour${days > 1 ? 's' : ''}` : '';

                    return `${formattedYears} ${formattedMonths} ${formattedDays}`.trim();
                },
                sorter: (a, b) => {
                    const momentA = moment(a.d_mise_circulation, 'YYYY/MM/DD') || '';
                    const momentB = moment(b.d_mise_circulation, 'YYYY/MM/DD') || '';
                    return momentA.valueOf() - momentB.valueOf();
                },
                sortDirections: ['ascend', 'descend'],
            },

            attribution: {
                title: I18n.t('pages.engin.table.attribution'),
                key: 'attribution',
                dataIndex: 'id_histo_gisement',
                render: (id_histo_gisement) => get(id_histo_gisement, 'id_affec.libelle', ''),
                sorter: (a, b) => (
                    (get(a, 'id_histo_gisement.id_affec.libelle', '') || '').localeCompare(get(b, 'id_histo_gisement.id_affec.libelle', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            radio: {
                title: I18n.t('pages.engin.table.radio'),
                key: 'radio',
                dataIndex: 'id_radio',
                render: (id_radio) => get(id_radio, 'rfgi', ''),
                sorter: (a, b) => (
                    (get(a, 'id_radio.rfgi', '') || '').localeCompare(get(b, 'id_radio.rfgi', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            attelage: {
                title: I18n.t('pages.engin.table.attelage'),
                key: 'attelage',
                dataIndex: 'id_type_attelage',
                render: (id_type_attelage) => get(id_type_attelage, 'nom', ''),
                sorter: (a, b) => (
                    (get(a, 'id_type_attelage.nom', '') || '').localeCompare(get(b, 'id_type_attelage.nom', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            d_entree: {
                title: I18n.t('pages.engin.table.d_entree'),
                key: 'd_entree',
                dataIndex: 'id_reparation',
                render: (id_reparation) => get(id_reparation, 'd_entree', ''),
                sorter: (a, b) => (
                    (get(a, 'id_reparation.d_entree', '') || '').localeCompare(get(b, 'id_reparation.d_entree', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            desc_raison_entree: {
                title: I18n.t('pages.engin.table.desc_raison_entree'),
                key: 'desc_raison_entree',
                dataIndex: 'id_reparation',
                render: (id_reparation) => get(id_reparation, 'desc_raison_entree', ''),
                sorter: (a, b) => (
                    (get(a, 'id_reparation.desc_raison_entree', '') || '').localeCompare(get(b, 'id_reparation.desc_raison_entree', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },
            d_sortie: {
                title: I18n.t('pages.engin.table.d_sortie'),
                key: 'd_sortie',
                dataIndex: 'id_reparation',
                render: (id_reparation) => get(id_reparation, 'd_sortie', ''),
                sorter: (a, b) => (
                    (get(a, 'id_reparation.d_sortie', '') || '').localeCompare(get(b, 'id_reparation.d_sortie', ''))
                ),
                sortDirections: ['ascend', 'descend'],
            },

        },
    },

}

export {EnginTableData}
