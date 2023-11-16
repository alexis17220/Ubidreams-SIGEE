// Importation des modules et des dépendances nécessaires
import I18n from 'I18n';
import {get} from 'lodash';
import React from 'react';

// Définition de l'objet ReparationTableData contenant les informations de la table de réparations
const ReparationTableData = {
    reparation: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            // Colonne "genre"
            genre: {
                title: I18n.t(`pages.reparation.table.genre`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'id_type_ops.nom'), // Fonction de rendu pour afficher le nom du genre
                sorter: (a, b) =>
                    (get(a, 'id_engin.id_type_ops.nom', '') || '').localeCompare(
                        (get(b, 'id_engin.id_type_ops.nom', '') || '')
                    ), // Fonction de tri pour trier les noms des genres par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "immatriculation"
            immatriculation: {
                title: I18n.t(`pages.reparation.table.registration`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'immatriculation'), // Fonction de rendu pour afficher l'immatriculation de l'engin
                sorter: (a, b) =>
                    (get(a, 'id_engin.immatriculation', '') || '').localeCompare(
                        (get(b, 'id_engin.immatriculation', '') || '')
                    ), // Fonction de tri pour trier les immatriculations par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "carrosserie"
            carrosserie: {
                title: I18n.t(`pages.reparation.table.carrosserie`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'carrosserie'), // Fonction de rendu pour afficher la carrosserie de l'engin
                sorter: (a, b) =>
                    (get(a, 'id_engin.carrosserie', '') || '').localeCompare(
                        (get(b, 'id_engin.carrosserie', '') || '')
                    ), // Fonction de tri pour trier les carrosseries par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "statutops"
            statutops: {
                title: I18n.t(`pages.reparation.table.statutOps`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'id_statut_ops.libelle'), // Fonction de rendu pour afficher le libellé du statut des opérations
                sorter: (a, b) =>
                    (get(a, 'id_engin.id_statut_ops.libelle', '') || '').localeCompare(
                        (get(b, 'id_engin.id_statut_ops.libelle', '') || '')
                    ), // Fonction de tri pour trier les libellés des statuts des opérations par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "entree"
            entree: {
                title: I18n.t(`pages.reparation.table.dateE`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'd_entree',
                dataIndex: 'd_entree',
                sorter: (a, b) =>
                    (get(a, 'd_entree', '') || '').localeCompare(
                        (get(b, 'd_entree', '') || '')
                    ), // Fonction de tri pour trier les dates d'entrée par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "adm"
            adm: {
                title: I18n.t(`pages.reparation.table.affectationAdm`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'fix_id_radio.id_adm.libelle'), // Fonction de rendu pour afficher le libellé de l'affectation administrative
                sorter: (a, b) =>
                    (get(a, 'id_engin.fix_id_radio.id_adm.libelle', '') || '').localeCompare(
                        (get(b, 'id_engin.fix_id_radio.id_adm.libelle', '') || '')
                    ), // Fonction de tri pour trier les libellés des affectations administratives par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "phy"
            phy: {
                title: I18n.t(`pages.reparation.table.affectationPhy`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'fix_id_radio.id_phy.libelle'), // Fonction de rendu pour afficher le libellé de l'affectation physique
                sorter: (a, b) =>
                    (get(a, 'id_engin.fix_id_radio.id_adm.libelle', '') || '').localeCompare(
                        (get(b, 'id_engin.fix_id_radio.id_adm.libelle', '') || '')
                    ), // Fonction de tri pour trier les libellés des affectations physiques par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "description"
            description: {
                title: I18n.t(`pages.reparation.table.raison`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'desc_raison_entree',
                dataIndex: 'desc_raison_entree',
                sorter: (a, b) =>
                    (get(a, 'desc_raison_entree', '') || '').localeCompare(
                        (get(b, 'desc_raison_entree', '') || '')
                    ), // Fonction de tri pour trier les descriptions des raisons d'entrée par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "sortie"
            sortie: {
                title: I18n.t(`pages.reparation.table.dateS`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'd_sortie',
                dataIndex: 'd_sortie',
                sorter: (a, b) =>
                    (get(a, 'd_sortie', '') || '').localeCompare(
                        (get(b, 'd_sortie', '') || '')
                    ), // Fonction de tri pour trier les dates de sortie par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "auteur"
            auteur: {
                title: I18n.t(`pages.reparation.table.author`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoinauteur',
                dataIndex: 'temoinauteur',
                sorter: (a, b) =>
                    (get(a, 'temoinauteur', '') || '').localeCompare(
                        (get(b, 'temoinauteur', '') || '')
                    ), // Fonction de tri pour trier les noms des auteurs par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "date"
            date: {
                title: I18n.t(`pages.reparation.table.dateM`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoindate',
                dataIndex: 'temoindate',
                sorter: (a, b) =>
                    (get(a, 'temoindate', '') || '').localeCompare(
                        (get(b, 'temoindate', '') || '')
                    ), // Fonction de tri pour trier les dates des témoignages par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "intervenant"
            intervenant: {
                title: I18n.t(`pages.reparation.table.intervenant`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_intervenant',
                dataIndex: 'id_intervenant',
                render: (id_intervenant) => get(id_intervenant, 'nom'), // Fonction de rendu pour afficher le nom de l'intervenant
                sorter: (a, b) =>
                    (get(a, 'id_intervenant', '') || '').localeCompare(
                        (get(b, 'id_intervenant', '') || '')
                    ), // Fonction de tri pour trier les noms des intervenants par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
        },
    },
};

export {ReparationTableData};
