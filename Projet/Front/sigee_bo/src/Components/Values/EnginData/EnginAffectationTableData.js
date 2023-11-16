import I18n from 'I18n';
import {defaultTo, get} from 'lodash';
import React from 'react';

// Tableau de données pour la table d'affectation historique administrative des engins
const EnginAffectationTableData = {
    affectationHistoAdm: {
        pagination: {
            position: 'both', // Position de la pagination (en haut, en bas ou en haut et en bas)
            showSizeChanger: true, // Afficher l'option de changement de taille de page
        },
        rowKey: 'id', // Clé unique pour chaque ligne (doit être une propriété unique de chaque élément)
        columns: {
            id_affec_adm: {
                title: I18n.t(`pages.affectAdm.table.code`), // Titre de la colonne obtenu à partir de la traduction
                key: 'id_affec_adm',
                dataIndex: 'id_affec_adm', // Propriété des données utilisée pour cette colonne
                render: (id_affec_adm) => get(id_affec_adm, 'code_centre', ''), // Fonction de rendu pour afficher le code du centre associé
                sorter: (a, b) =>
                    defaultTo(get(a, 'name'), '').localeCompare(
                        defaultTo(get(b, 'name'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            affectAdm: {
                title: I18n.t(`pages.affectAdm.table.affectation`), // Titre de la colonne obtenu à partir de la traduction
                key: 'affectAdm',
                dataIndex: 'id_affec_adm', // Propriété des données utilisée pour cette colonne
                render: (id_affec_adm) => get(id_affec_adm, 'libelle', ''), // Fonction de rendu pour afficher le libellé associé
                sorter: (a, b) =>
                    defaultTo(get(a, 'affectAdm'), '').localeCompare(
                        defaultTo(get(b, 'affectAdm'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoindate: {
                title: I18n.t(`pages.affectAdm.table.date`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoindate',
                dataIndex: 'temoindate', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            reference: {
                title: I18n.t(`pages.affectAdm.table.reference`), // Titre de la colonne obtenu à partir de la traduction
                key: 'reference',
                dataIndex: 'reference', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'reference'), '').localeCompare(
                        defaultTo(get(b, 'reference'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoinauteur: {
                title: I18n.t(`pages.affectAdm.table.author`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginAffectationTableData};

// Tableau de données pour la table d'affectation historique des gisements des engins
const EnginAttributionTableData = {
    affectationHistoGisement: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            id_affec: {
                title: I18n.t(`pages.affectGis.table.code`), // Titre de la colonne obtenu à partir de la traduction
                key: 'id_affec',
                dataIndex: 'id_affec', // Propriété des données utilisée pour cette colonne
                render: (id_affec) => get(id_affec, 'code_centre', ''), // Fonction de rendu pour afficher le code du centre associé
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_affec'), '').localeCompare(
                        defaultTo(get(b, 'id_affec'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            attribution: {
                title: I18n.t(`pages.affectPhy.table.affectation`), // Titre de la colonne obtenu à partir de la traduction
                key: 'attribution',
                dataIndex: 'id_affec', // Propriété des données utilisée pour cette colonne
                render: (id_affec) => get(id_affec, 'libelle', ''), // Fonction de rendu pour afficher le libellé associé
                sorter: (a, b) =>
                    defaultTo(get(a, 'attribution'), '').localeCompare(
                        defaultTo(get(b, 'attribution'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoindate: {
                title: I18n.t(`pages.affectPhy.table.date`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoindate',
                dataIndex: 'temoindate', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoinauteur: {
                title: I18n.t(`pages.affectPhy.table.author`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginAttributionTableData};

// Tableau de données pour la table d'affectation historique physique des engins
const EnginAffectationPHYTableData = {
    affectationHistoPhy: {
        pagination: {
            position: 'both',
            showSizeChanger: true,
        },
        rowKey: 'id',
        columns: {
            id_affec_phy: {
                title: I18n.t(`pages.affectPhy.table.code`), // Titre de la colonne obtenu à partir de la traduction
                key: 'id_affec_phy',
                dataIndex: 'id_affec_phy', // Propriété des données utilisée pour cette colonne
                render: (id_affec_phy) => get(id_affec_phy, 'code_centre', ''), // Fonction de rendu pour afficher le code du centre associé
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_affec_phy'), '').localeCompare(
                        defaultTo(get(b, 'id_affec_phy'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            affectAdm: {
                title: I18n.t(`pages.affectPhy.table.affectation`), // Titre de la colonne obtenu à partir de la traduction
                key: 'affectAdm',
                dataIndex: 'id_affec_phy', // Propriété des données utilisée pour cette colonne
                render: (id_affec_phy) => get(id_affec_phy, 'libelle', ''), // Fonction de rendu pour afficher le libellé associé
                sorter: (a, b) =>
                    defaultTo(get(a, 'affectAdm'), '').localeCompare(
                        defaultTo(get(b, 'affectAdm'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoindate: {
                title: I18n.t(`pages.affectPhy.table.date`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoindate',
                dataIndex: 'temoindate', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
            temoinauteur: {
                title: I18n.t(`pages.affectPhy.table.author`), // Titre de la colonne obtenu à partir de la traduction
                key: 'temoinauteur',
                dataIndex: 'temoinauteur', // Propriété des données utilisée pour cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour cette colonne
                sortDirections: ['ascend', 'descend'], // Direction de tri autorisée (ascendant ou descendant)
            },
        },
    },
};

export {EnginAffectationPHYTableData};
