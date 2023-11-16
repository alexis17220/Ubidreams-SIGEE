// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet InterventionReparationTableData contenant les informations de la table d'interventions sur les réparations
const InterventionReparationTableData = {
    interventionReparation: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            d_attribution_travaux: {
                title: I18n.t(`pages.interventionR.table.dateE`),  // Titre de la colonne traduit
                key: 'd_attribution_travaux',  // Clé unique de la colonne
                dataIndex: 'd_attribution_travaux',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_attribution_travaux'), '').localeCompare(
                        defaultTo(get(b, 'd_attribution_travaux'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'd_attribution_travaux'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            sortie: {
                title: I18n.t(`pages.interventionR.table.dateS`),  // Titre de la colonne traduit
                key: 'd_clos',  // Clé unique de la colonne
                dataIndex: 'd_clos',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_clos'), '').localeCompare(
                        defaultTo(get(b, 'd_clos'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'd_clos'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            prev: {
                title: I18n.t(`pages.interventionR.table.datePrev`),  // Titre de la colonne traduit
                key: 'd_fin_prev',  // Clé unique de la colonne
                dataIndex: 'd_fin_prev',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_fin_prev'), '').localeCompare(
                        defaultTo(get(b, 'd_fin_prev'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'd_fin_prev'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            nature_travaux: {
                title: I18n.t(`pages.interventionR.table.nature`),  // Titre de la colonne traduit
                key: 'nature_travaux',  // Clé unique de la colonne
                dataIndex: 'nature_travaux',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'nature_travaux'), '').localeCompare(
                        defaultTo(get(b, 'nature_travaux'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'nature_travaux'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            id_intervenant: {
                title: I18n.t(`pages.interventionR.table.intervenant`),  // Titre de la colonne traduit
                key: 'id_intervenant',  // Clé unique de la colonne
                dataIndex: 'id_intervenant',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (id_intervenant) => get(id_intervenant, 'nom'),  // Fonction de rendu personnalisée pour afficher la valeur de la colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_intervenant.nom'), '').localeCompare(
                        defaultTo(get(b, 'id_intervenant.nom'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'id_intervenant.nom'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            observation_chef: {
                title: I18n.t(`pages.interventionR.table.observation`),  // Titre de la colonne traduit
                key: 'observation_chef',  // Clé unique de la colonne
                dataIndex: 'observation_chef',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'observation_chef'), '').localeCompare(
                        defaultTo(get(b, 'observation_chef'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'observation_chef'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            atelier: {
                title: I18n.t(`pages.interventionR.table.atelier`),  // Titre de la colonne traduit
                key: 'nb_heure_atelier',  // Clé unique de la colonne
                dataIndex: 'nb_heure_atelier',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'nb_heure_atelier'), '').localeCompare(
                        defaultTo(get(b, 'nb_heure_atelier'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'nb_heure_atelier'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            temoinauteur: {
                title: I18n.t(`pages.interventionR.table.author`),  // Titre de la colonne traduit
                key: 'temoinauteur',  // Clé unique de la colonne
                dataIndex: 'temoinauteur',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'temoinauteur'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            temoindate: {
                title: I18n.t(`pages.interventionR.table.date`),  // Titre de la colonne traduit
                key: 'temoindate',  // Clé unique de la colonne
                dataIndex: 'temoindate',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'temoindate'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {InterventionReparationTableData};  // Exportation de l'objet InterventionReparationTableData pour être utilisé dans d'autres fichiers
