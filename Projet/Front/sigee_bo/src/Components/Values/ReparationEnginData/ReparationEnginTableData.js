// Importation des modules et des dépendances nécessaires
import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Définition de l'objet ReparationEnginTableData contenant les informations de la table de réparations d'engins
const ReparationEnginTableData = {
    reparationEngins: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            // Colonne "id_engin"
            id_engin: {
                title: I18n.t(`pages.reparationE.table.registration`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_engin',
                dataIndex: 'id_engin',
                render: (id_engin) => get(id_engin, 'immatriculation'), // Fonction de rendu pour afficher l'immatriculation de l'engin
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin.immatriculation'), '').localeCompare(
                        defaultTo(get(b, 'id_engin.immatriculation'), '')
                    ), // Fonction de tri pour trier les immatriculations par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "d_entree"
            d_entree: {
                title: I18n.t(`pages.reparationE.table.dateE`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'd_entree',
                dataIndex: 'd_entree',
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_entree'), '').localeCompare(
                        defaultTo(get(b, 'd_entree'), '')
                    ), // Fonction de tri pour trier les dates d'entrée par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "d_sortie"
            d_sortie: {
                title: I18n.t(`pages.reparationE.table.dateS`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'd_sortie',
                dataIndex: 'd_sortie',
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_sortie'), '').localeCompare(
                        defaultTo(get(b, 'd_sortie'), '')
                    ), // Fonction de tri pour trier les dates de sortie par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "km_reception"
            km_reception: {
                title: I18n.t(`pages.reparationE.table.km`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'km_reception',
                dataIndex: 'km_reception',
                sorter: (a, b) =>
                    (get(a, 'km_reception', '') || '').localeCompare(
                        (get(b, 'km_reception', '') || '')
                    ), // Fonction de tri pour trier les kilométrages de réception par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "hdm_moteur_reception"
            hdm_moteur_reception: {
                title: I18n.t(`pages.reparationE.table.hr`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'hdm_moteur_reception',
                dataIndex: 'hdm_moteur_reception',
                sorter: (a, b) =>
                    (get(a, 'hdm_moteur_reception', '') || '').localeCompare(
                        (get(b, 'hdm_moteur_reception', '') || '')
                    ), // Fonction de tri pour trier les heures du moteur de réception par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "desc_raison_entree"
            desc_raison_entree: {
                title: I18n.t(`pages.reparationE.table.description`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'desc_raison_entree',
                dataIndex: 'desc_raison_entree',
                sorter: (a, b) =>
                    (get(a, 'desc_raison_entree', '') || '').localeCompare(
                        (get(b, 'desc_raison_entree', '') || '')
                    ), // Fonction de tri pour trier les descriptions des raisons d'entrée par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
            // Colonne "auteur"
            auteur: {
                title: I18n.t(`pages.reparationE.table.author`), // Titre de la colonne obtenu à partir de la traduction I18n
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
                title: I18n.t(`pages.reparationE.table.date`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoindate',
                dataIndex: 'temoindate',
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour trier les dates des témoignages par ordre alphabétique
                sortDirections: ['ascend', 'descend'],
            },
        },
    },
};

// Exportation de l'objet ReparationEnginTableData pour pouvoir l'utiliser ailleurs
export {ReparationEnginTableData};
