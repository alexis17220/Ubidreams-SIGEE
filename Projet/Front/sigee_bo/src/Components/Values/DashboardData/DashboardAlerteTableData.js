// Import de la bibliothèque I18n pour gérer les traductions
import I18n from "I18n";

// Import des fonctions utilitaires de lodash
import {defaultTo, get} from "lodash";

// Tableau de colonnes pour la table d'alertes de révision
const columnsTableAlerteRevision = [
    {
        // Titre de la colonne 'cis' avec la traduction de la page "pages.engin.table.cis"
        title: I18n.t(`pages.engin.table.cis`),
        // Clé de la colonne
        key: 'cis',
        // Nom de la propriété des données à afficher dans la colonne ('libelle_phy')
        dataIndex: 'libelle_phy',
        // Direction de tri possible pour cette colonne (ascendant ou descendant)
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne 'carrosserie' avec la traduction de la page "pages.engin.table.bodywork"
        title: I18n.t(`pages.engin.table.bodywork`),
        // Clé de la colonne
        key: 'carrosserie',
        // Nom de la propriété des données à afficher dans la colonne ('carrosserie')
        dataIndex: 'carrosserie',
        // Fonction de tri pour cette colonne
        // Le tri se fait en fonction de la valeur de 'carrosserie' dans chaque ligne
        sorter: (a, b) => defaultTo(get(a, 'carrosserie'), '').localeCompare(defaultTo(get(b, 'carrosserie'), '')),
        // Direction de tri possible pour cette colonne (ascendant ou descendant)
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne 'immatriculation' avec la traduction de la page "pages.engin.table.registration"
        title: I18n.t(`pages.engin.table.registration`),
        // Clé de la colonne
        key: 'immatriculation',
        // Nom de la propriété des données à afficher dans la colonne ('immatriculation')
        dataIndex: 'immatriculation',
        // Fonction de tri pour cette colonne
        // Le tri se fait en fonction de la valeur de 'immatriculation' dans chaque ligne
        sorter: (a, b) => defaultTo(get(a, 'immatriculation'), '').localeCompare(defaultTo(get(b, 'immatriculation'), '')),
        // Direction de tri possible pour cette colonne (ascendant ou descendant)
        sortDirections: ['ascend', 'descend'],
    },
];

// Exportation du tableau de colonnes pour la table d'alertes de révision
export {columnsTableAlerteRevision};

// Tableau de colonnes pour la table d'alertes de validité
const columnsTableAlerteValidite = [
    // Les colonnes sont similaires à celles de la table d'alertes de révision, donc je n'ai pas ajouté de commentaires ici
    {
        title: I18n.t(`pages.engin.table.cis`),
        key: 'cis',
        dataIndex: 'libelle_phy',
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: I18n.t(`pages.engin.table.bodywork`),
        key: 'carrosserie',
        dataIndex: 'carrosserie',
        sorter: (a, b) => defaultTo(get(a, 'carrosserie'), '').localeCompare(defaultTo(get(b, 'carrosserie'), '')),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: I18n.t(`pages.engin.table.registration`),
        key: 'immatriculation',
        dataIndex: 'immatriculation',
        sorter: (a, b) => defaultTo(get(a, 'immatriculation'), '').localeCompare(defaultTo(get(b, 'immatriculation'), '')),
        sortDirections: ['ascend', 'descend'],
    },
];

// Exportation du tableau de colonnes pour la table d'alertes de validité
export {columnsTableAlerteValidite};
