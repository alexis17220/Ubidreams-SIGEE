import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Tableau de données pour la table des garages d'engins
const EnginGarageTableData = {
    garageEngin: {
        pagination: {
            position: 'both', // Position de la pagination (en haut, en bas ou en haut et en bas)
            showSizeChanger: true, // Afficher l'option de changement de taille de page
        },
        rowKey: 'id', // Clé unique pour chaque ligne (doit être une propriété unique de chaque élément)
        columns: {
            compteur1: {
                title: I18n.t(`pages.garage.table.km`), // Titre de la colonne obtenu à partir de la traduction
                key: 'compteur1',
                dataIndex: 'compteur1', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    (get(a, 'compteur1', '') || '').localeCompare(
                        (get(b, 'compteur1', '') || '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            compteur2: {
                title: I18n.t(`pages.garage.table.hr`), // Titre de la colonne obtenu à partir de la traduction
                key: 'compteur2',
                dataIndex: 'compteur2', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'compteur2'), '').localeCompare(
                        defaultTo(get(b, 'compteur2'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            correction: {
                title: I18n.t(`pages.garage.table.corriger`), // Titre de la colonne obtenu à partir de la traduction
                key: 'correction',
                dataIndex: 'compteur1', // Propriété des données utilisée pour cette colonne
                render: (compteur1, record) => (
                    (record.compteur1 || '') + (80 * (record.compteur2 || 0))
                ), // Fonction de rendu pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'correction'), '').localeCompare(
                        defaultTo(get(b, 'correction'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoinauteur: {
                title: I18n.t(`pages.garage.table.author`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            d_compteur: {
                title: I18n.t(`pages.garage.table.date`), // Titre de la colonne obtenu à partir de la traduction
                key: 'd_compteur',
                dataIndex: 'd_compteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_compteur'), '').localeCompare(
                        defaultTo(get(b, 'd_compteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginGarageTableData};
