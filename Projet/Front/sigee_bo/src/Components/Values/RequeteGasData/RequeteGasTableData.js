// Importation des modules et des dépendances nécessaires
import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Définition de l'objet RequeteGasTableData contenant les informations de la table de requêtes de gaz
const RequeteGasTableData = {
    requeteGas: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            // Colonne "genre"
            genre: {
                title: I18n.t(`Genre`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'id_type_ops.nom'), // Fonction de rendu pour afficher le nom du type d'opération
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les genres par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "carrosserie"
            carrosserie: {
                title: I18n.t(`Carrosserie`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'carrosserie'), // Fonction de rendu pour afficher le type de carrosserie
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les carrosseries par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "immatriculation"
            immatriculation: {
                title: I18n.t(`Immatriculation`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'immatriculation'), // Fonction de rendu pour afficher l'immatriculation de l'engin
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les immatriculations par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "marque"
            marque: {
                title: I18n.t(`Marque`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'id_marque.nom'), // Fonction de rendu pour afficher le nom de la marque
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les marques par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "equipeur"
            equipeur: {
                title: I18n.t(`Equipeurs`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'id_equipeur.nom'), // Fonction de rendu pour afficher le nom de l'équipeur
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les equipeurs par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "km"
            km: {
                title: I18n.t(`Kilometrage`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'km_reception',
                dataIndex: 'km_reception',
                sorter: (a, b) =>
                    defaultTo(get(a, 'km_reception'), '').localeCompare(
                        defaultTo(get(b, 'km_reception'), '')
                    ), // Fonction de tri pour trier les kilométrages par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "statuttech"
            statuttech: {
                title: I18n.t(`Statut Tech`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'id_statut_tech.libelle'), // Fonction de rendu pour afficher le libellé du statut technique
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les statuts techniques par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "entree"
            entree: {
                title: I18n.t(`Date d'Entrée`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'd_entree',
                dataIndex: 'd_entree',
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_entree'), '').localeCompare(
                        defaultTo(get(b, 'action'), '')
                    ), // Fonction de tri pour trier les dates d'entrée par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "adm"
            adm: {
                title: I18n.t(`Affectation ADM`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'fix_id_radio.id_adm.libelle'), // Fonction de rendu pour afficher le libellé de l'affectation ADM
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les affectations ADM par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "phy"
            phy: {
                title: I18n.t(`Affectation PHY`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'fix_id_radio.id_phy.libelle'), // Fonction de rendu pour afficher le libellé de l'affectation PHY
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ), // Fonction de tri pour trier les affectations PHY par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "description"
            description: {
                title: I18n.t(`Description de la Raison`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'desc_raison_entree',
                dataIndex: 'desc_raison_entree',
                sorter: (a, b) =>
                    defaultTo(get(a, 'desc_raison_entree'), '').localeCompare(
                        defaultTo(get(b, 'desc_raison_entree'), '')
                    ), // Fonction de tri pour trier les descriptions de la raison par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "sortie"
            sortie: {
                title: I18n.t(`Date de Sortie`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'd_sortie',
                dataIndex: 'd_sortie',
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_sortie'), '').localeCompare(
                        defaultTo(get(b, 'd_sortie'), '')
                    ), // Fonction de tri pour trier les dates de sortie par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "auteur"
            auteur: {
                title: I18n.t(`Auteur`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoinauteur',
                dataIndex: 'temoinauteur',
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour trier les noms des auteurs par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "date"
            date: {
                title: I18n.t(`Date Modif`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoindate',
                dataIndex: 'temoindate',
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour trier les dates des témoignages par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "intervenant"
            intervenant: {
                title: I18n.t(`Intervenant`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_intervenant',
                dataIndex: 'id_intervenant',
                render: (id_intervenant) => get(id_intervenant, 'nom'), // Fonction de rendu pour afficher le nom de l'intervenant
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_intervenant'), '').localeCompare(
                        defaultTo(get(b, 'id_intervenant'), '')
                    ), // Fonction de tri pour trier les noms des intervenants par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
        },
    },
};

// Exportation de l'objet RequeteGasTableData pour l'utiliser ailleurs dans l'application
export {RequeteGasTableData};
