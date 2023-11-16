import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Tableau de données pour la table des réparations sur les engins
const EnginReparationTableData = {
    reparationEngins: {
        pagination: {
            position: 'both', // Position de la pagination (en haut, en bas ou en haut et en bas)
            showSizeChanger: true, // Afficher l'option de changement de taille de page
        },
        rowKey: 'id', // Clé unique pour chaque ligne (doit être une propriété unique de chaque élément)
        columns: {
            entree: {
                title: I18n.t(`pages.reparationE.table.dateE`), // Titre de la colonne obtenu à partir de la traduction
                key: 'd_entree',
                dataIndex: 'd_entree', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_entree'), '').localeCompare(
                        defaultTo(get(b, 'action'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            sortie: {
                title: I18n.t(`pages.reparationE.table.dateS`), // Titre de la colonne obtenu à partir de la traduction
                key: 'd_sortie',
                dataIndex: 'd_sortie', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_sortie'), '').localeCompare(
                        defaultTo(get(b, 'd_sortie'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            km: {
                title: I18n.t(`pages.reparationE.table.km`), // Titre de la colonne obtenu à partir de la traduction
                key: 'km_reception',
                dataIndex: 'km_reception', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'km_reception'), '').localeCompare(
                        defaultTo(get(b, 'km_reception'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            hr: {
                title: I18n.t(`pages.reparationE.table.hr`), // Titre de la colonne obtenu à partir de la traduction
                key: 'hdm_moteur_reception',
                dataIndex: 'hdm_moteur_reception', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'hdm_moteur_reception'), '').localeCompare(
                        defaultTo(get(b, 'hdm_moteur_reception'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            description: {
                title: I18n.t(`pages.reparationE.table.description`), // Titre de la colonne obtenu à partir de la traduction
                key: 'desc_raison_entree',
                dataIndex: 'desc_raison_entree', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'desc_raison_entree'), '').localeCompare(
                        defaultTo(get(b, 'desc_raison_entree'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            auteur: {
                title: I18n.t(`pages.reparationE.table.author`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            date: {
                title: I18n.t(`pages.reparationE.table.date`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoindate',
                dataIndex: 'temoindate', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginReparationTableData};
