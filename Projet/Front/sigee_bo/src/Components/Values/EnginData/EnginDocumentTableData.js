import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Tableau de données pour la table des documents d'engins
const EnginDocumentTableData = {
    document: {
        pagination: {
            position: 'both', // Position de la pagination (en haut, en bas ou en haut et en bas)
            showSizeChanger: true, // Afficher l'option de changement de taille de page
        },
        rowKey: 'id', // Clé unique pour chaque ligne (doit être une propriété unique de chaque élément)
        columns: {
            titre: {
                title: I18n.t(`pages.document.table.title`), // Titre de la colonne obtenu à partir de la traduction
                key: 'titre',
                dataIndex: 'titre', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'titre'), '').localeCompare(
                        defaultTo(get(b, 'titre'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoinauteur: {
                title: I18n.t(`pages.document.table.autor`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoindate: {
                title: I18n.t(`pages.document.table.date`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoindate',
                dataIndex: 'temoindate', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            lien: {
                title: I18n.t(`Lien`), // Titre de la colonne obtenu à partir de la traduction
                key: 'lien',
                dataIndex: 'lien', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'lien'), '').localeCompare(
                        defaultTo(get(b, 'lien'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            datefv: {
                title: I18n.t(`pages.document.table.dateEnd`), // Titre de la colonne obtenu à partir de la traduction
                key: 'date_fv',
                dataIndex: 'date_fv', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'date_fv'), '').localeCompare(
                        defaultTo(get(b, 'date_fv'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginDocumentTableData};
