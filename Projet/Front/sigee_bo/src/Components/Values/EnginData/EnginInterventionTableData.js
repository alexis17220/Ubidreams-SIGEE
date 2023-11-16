import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Tableau de données pour la table des interventions sur les engins
const EnginInterventionTableData = {
    interventionEngins: {
        pagination: {
            position: 'both', // Position de la pagination (en haut, en bas ou en haut et en bas)
            showSizeChanger: true, // Afficher l'option de changement de taille de page
        },
        rowKey: 'id', // Clé unique pour chaque ligne (doit être une propriété unique de chaque élément)
        columns: {
            d_attribution_travaux: {
                title: I18n.t(`pages.interventionE.table.dateE`), // Titre de la colonne obtenu à partir de la traduction
                key: 'd_attribution_travaux',
                dataIndex: 'd_attribution_travaux', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_attribution_travaux'), '').localeCompare(
                        defaultTo(get(b, 'd_attribution_travaux'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            d_clos: {
                title: I18n.t(`pages.interventionE.table.dateS`), // Titre de la colonne obtenu à partir de la traduction
                key: 'd_clos',
                dataIndex: 'd_clos', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_clos'), '').localeCompare(
                        defaultTo(get(b, 'd_clos'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            nature_travaux: {
                title: I18n.t(`pages.interventionE.table.nature`), // Titre de la colonne obtenu à partir de la traduction
                key: 'nature_travaux',
                dataIndex: 'nature_travaux', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'nature_travaux'), '').localeCompare(
                        defaultTo(get(b, 'nature_travaux'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            id_intervenant: {
                title: I18n.t(`pages.interventionE.table.intervenant`), // Titre de la colonne obtenu à partir de la traduction
                key: 'id_intervenant',
                dataIndex: 'id_intervenant', // Propriété des données utilisée pour cette colonne
                render: (id_intervenant) => get(id_intervenant, 'nom', ''), // Fonction de rendu pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_intervenant'), '').localeCompare(
                        defaultTo(get(b, 'id_intervenant'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            observation_chef: {
                title: I18n.t(`pages.interventionE.table.observation`), // Titre de la colonne obtenu à partir de la traduction
                key: 'observation_chef',
                dataIndex: 'observation_chef', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'observation_chef'), '').localeCompare(
                        defaultTo(get(b, 'observation_chef'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoinauteur: {
                title: I18n.t(`pages.interventionE.table.author`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoindate: {
                title: I18n.t(`pages.interventionE.table.dateM`), // Titre de la colonne obtenu à partir de la traduction
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

export {EnginInterventionTableData};
