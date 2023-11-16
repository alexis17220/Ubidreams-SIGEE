// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet LogTableData contenant les informations de la table Log
const LogTableData = {
    logs: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés
            dateheure: {
                title: I18n.t(`pages.logs.table.dateheure`),  // Titre de la colonne traduit
                key: 'dateheure',  // Clé unique de la colonne
                dataIndex: 'dateheure',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'dateheure'), '').localeCompare(
                        defaultTo(get(b, 'dateheure'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'temoindate'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
            action: {
                title: I18n.t(`pages.logs.table.action`),  // Titre de la colonne traduit
                key: 'action',  // Clé unique de la colonne
                dataIndex: 'action',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'action'), '').localeCompare(
                        defaultTo(get(b, 'action'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'observation_chef'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            utilisateur: {
                title: I18n.t(`pages.logs.table.utilisateur`),  // Titre de la colonne traduit
                key: 'utilisateur',  // Clé unique de la colonne
                dataIndex: 'utilisateur',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'utilisateur'), '').localeCompare(
                        defaultTo(get(b, 'utilisateur'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'temoinauteur'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
        },
    },
};

export {LogTableData};  // Exportation de l'objet LogTableData pour être utilisé dans d'autres fichiers
