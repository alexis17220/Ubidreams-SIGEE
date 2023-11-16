// Import des dépendances nécessaires
import I18n from "I18n";
import moment from "moment";

// Obtention de l'année en cours et des deux années précédentes
const currentYear = moment().year();
const nextYear = currentYear - 1;
const secondNextYear = currentYear - 2;

// Définition du tableau de colonnes pour les données de réparation du tableau de bord
const DashboardReparationTableData = [
    {
        // Titre de la colonne obtenu à partir de la traduction "pages.reparation.table.raison"
        title: I18n.t(`pages.reparation.table.raison`),
        // Clé de la colonne associée aux données "desc_raison_entree" de chaque élément
        key: 'desc_raison_entree',
        // Index des données à afficher dans la colonne
        dataIndex: 'desc_raison_entree',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne affichant le nombre de réparations pour l'année en cours
        title: `${I18n.t('pages.reparation.table.nbAnnee')} ${currentYear}`,
        // Clé de la colonne associée aux données "total_reparationsN" de chaque élément
        key: 'total_reparationsN',
        // Index des données à afficher dans la colonne
        dataIndex: 'total_reparationsN',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne affichant le nombre de réparations pour l'année suivante
        title: `${I18n.t('pages.reparation.table.nbAnnee')} ${nextYear}`,
        // Clé de la colonne associée aux données "total_reparationsN1" de chaque élément
        key: 'total_reparationsN1',
        // Index des données à afficher dans la colonne
        dataIndex: 'total_reparationsN1',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne affichant le nombre de réparations pour l'année suivant l'année suivante
        title: `${I18n.t('pages.reparation.table.nbAnnee')} ${secondNextYear}`,
        // Clé de la colonne associée aux données "total_reparationsN2" de chaque élément
        key: 'total_reparationsN2',
        // Index des données à afficher dans la colonne
        dataIndex: 'total_reparationsN2',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour les données de réparation du tableau de bord
export {DashboardReparationTableData};

// Définition du tableau de colonnes pour les données de réparation technique du tableau de bord
const DashboardReparationTechTableData = [
    {
        // Titre de la colonne obtenu à partir de la traduction "Type Tech"
        title: I18n.t(`Type Tech`),
        // Clé de la colonne associée aux données "nom" de chaque élément
        key: 'nom',
        // Index des données à afficher dans la colonne
        dataIndex: 'nom',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne affichant le nombre de réparations techniques pour l'année en cours
        title: `${I18n.t('pages.reparation.table.nbAnnee')} ${currentYear}`,
        // Clé de la colonne associée aux données "nbr_reparation" de chaque élément
        key: 'nbr_reparation',
        // Index des données à afficher dans la colonne
        dataIndex: 'nbr_reparation',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour les données de réparation technique du tableau de bord
export {DashboardReparationTechTableData};

// Définition du tableau de colonnes pour les données d'intervention de réparation du tableau de bord
const DashboardReparationInterventionTableData = [
    {
        // Titre de la colonne obtenu à partir de la traduction "Type Tech"
        title: I18n.t(`Type Tech`),
        // Clé de la colonne associée aux données "nom" de chaque élément
        key: 'nom',
        // Index des données à afficher dans la colonne
        dataIndex: 'nom',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
    {
        // Titre de la colonne affichant le nombre d'interventions de réparation pour l'année en cours
        title: `${I18n.t('pages.reparation.table.nbAnnee')} ${currentYear}`,
        // Clé de la colonne associée aux données "nbre_inter" de chaque élément
        key: 'nbre_inter',
        // Index des données à afficher dans la colonne
        dataIndex: 'nbre_inter',
        // Directions de tri possibles pour cette colonne
        sortDirections: ['ascend', 'descend'],
    },
];

// Export du tableau de colonnes pour les données d'intervention de réparation du tableau de bord
export {DashboardReparationInterventionTableData};
