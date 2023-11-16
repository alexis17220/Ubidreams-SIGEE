import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Tableau de données pour la table des équipements d'engins
const EnginEquipementTableData = {
    equipements: {
        pagination: {
            position: 'both', // Position de la pagination (en haut, en bas ou en haut et en bas)
            showSizeChanger: true, // Afficher l'option de changement de taille de page
        },
        rowKey: 'id', // Clé unique pour chaque ligne (doit être une propriété unique de chaque élément)
        columns: {
            equipement: {
                title: I18n.t(`pages.equipement.table.equipements`), // Titre de la colonne obtenu à partir de la traduction
                key: 'equipement',
                dataIndex: 'id_equipement', // Propriété des données utilisée pour cette colonne
                render: (id_equipement) => get(id_equipement, 'libelle', ''), // Fonction de rendu pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'equipement'), '').localeCompare(
                        defaultTo(get(b, 'equipement'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            action: {
                title: I18n.t(`pages.equipementE.table.action`), // Titre de la colonne obtenu à partir de la traduction
                key: 'action',
                dataIndex: 'action', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'action'), '').localeCompare(
                        defaultTo(get(b, 'action'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            user: {
                title: I18n.t(`pages.equipementE.table.temoinAuthor`), // Titre de la colonne obtenu à partir de la traduction
                key: 'user',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'user'), '').localeCompare(
                        defaultTo(get(b, 'user'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            date: {
                title: I18n.t(`pages.equipementE.table.temoinDate`), // Titre de la colonne obtenu à partir de la traduction
                key: 'date',
                dataIndex: 'temoindate', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'date'), '').localeCompare(
                        defaultTo(get(b, 'date'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            montage: {
                title: I18n.t(`pages.equipementE.table.montage`), // Titre de la colonne obtenu à partir de la traduction
                key: 'montage',
                dataIndex: 'date_montage', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'montage'), '').localeCompare(
                        defaultTo(get(b, 'montage'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            verif: {
                title: I18n.t(`pages.equipementE.table.verification`), // Titre de la colonne obtenu à partir de la traduction
                key: 'verif',
                dataIndex: 'date_verification', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'verif'), '').localeCompare(
                        defaultTo(get(b, 'verif'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            limite: {
                title: I18n.t(`pages.equipementE.table.utilisation`), // Titre de la colonne obtenu à partir de la traduction
                key: 'limite',
                dataIndex: 'd_limite_utilisation', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'limite'), '').localeCompare(
                        defaultTo(get(b, 'limite'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginEquipementTableData};
