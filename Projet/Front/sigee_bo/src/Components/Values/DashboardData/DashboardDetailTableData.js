// Import des dépendances nécessaires
import I18n from "I18n";

// Définition du tableau de colonnes pour la classification
const classification = [
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.classification.nom"
        title: I18n.t(`pages.classification.nom`),
        // Clé de la colonne associée aux données "libelle" de chaque élément
        key: 'libelle',
        // Index des données à afficher dans la colonne
        dataIndex: 'libelle',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.classification.nbEngin"
        title: I18n.t(`pages.classification.nbEngin`),
        // Clé de la colonne associée aux données "nbr_engin" de chaque élément
        key: 'nbr_engin',
        // Index des données à afficher dans la colonne
        dataIndex: 'nbr_engin',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour la classification
export {classification};

// Définition du tableau de colonnes pour la gamme
const gamme = [
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.gamme.nom"
        title: I18n.t(`pages.gamme.nom`),
        // Clé de la colonne associée aux données "nom" de chaque élément
        key: 'nom',
        // Index des données à afficher dans la colonne
        dataIndex: 'nom',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.gamme.nbEngin"
        title: I18n.t(`pages.gamme.nbEngin`),
        // Clé de la colonne associée aux données "nbr_engin" de chaque élément
        key: 'nbr_engin',
        // Index des données à afficher dans la colonne
        dataIndex: 'nbr_engin',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour la gamme
export {gamme};

// Définition du tableau de colonnes pour le propriétaire
const proprietaire = [
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.proprietaire.table.nom"
        title: I18n.t(`pages.proprietaire.table.nom`),
        // Clé de la colonne associée aux données "libelle" de chaque élément
        key: 'libelle',
        // Index des données à afficher dans la colonne
        dataIndex: 'libelle',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.proprietaire.table.nbEngin"
        title: I18n.t(`pages.proprietaire.table.nbEngin`),
        // Clé de la colonne associée aux données "nbr_engin" de chaque élément
        key: 'nbr_engin',
        // Index des données à afficher dans la colonne
        dataIndex: 'nbr_engin',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour le propriétaire
export {proprietaire};

// Définition du tableau de colonnes pour l'âge
const age = [
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.engin.table.typeTech"
        title: I18n.t(`pages.engin.table.typeTech`),
        // Clé de la colonne associée aux données "nom" de chaque élément
        key: 'nom',
        // Index des données à afficher dans la colonne
        dataIndex: 'nom',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.engin.table.nbEngin"
        title: I18n.t(`pages.engin.table.nbEngin`),
        // Clé de la colonne associée aux données "nombreEngin" de chaque élément
        key: 'nombreEngin',
        // Index des données à afficher dans la colonne
        dataIndex: 'nombreEngin',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.engin.table.age"
        title: I18n.t(`pages.engin.table.age`),
        // Clé de la colonne associée aux données "ageEngin" de chaque élément
        key: 'ageEngin',
        // Index des données à afficher dans la colonne
        dataIndex: 'ageEngin',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour l'âge
export {age};
