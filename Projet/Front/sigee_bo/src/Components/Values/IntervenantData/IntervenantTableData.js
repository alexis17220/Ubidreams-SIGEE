// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet IntervenantTableData contenant les informations de la table d'intervenants
const IntervenantTableData = {
    intervenant: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            nom: {
                title: I18n.t(`pages.intervenant.table.nom`),  // Titre de la colonne traduit
                key: 'nom',  // Clé unique de la colonne
                dataIndex: 'nom',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'nom'), '').localeCompare(
                        defaultTo(get(b, 'nom'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'nom'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            temoinauteur: {
                title: I18n.t(`pages.intervenant.table.author`),  // Titre de la colonne traduit
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
                title: I18n.t(`pages.intervenant.table.date`),  // Titre de la colonne traduit
                key: 'temoindate',  // Clé unique de la colonne
                dataIndex: 'temoindate',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'temoindate'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            id_type_intervenant: {
                title: I18n.t(`pages.intervenant.table.intervenant`),  // Titre de la colonne traduit
                key: 'id_type_intervenant',  // Clé unique de la colonne
                dataIndex: 'id_type_intervenant',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (id_type_intervenant) => get(id_type_intervenant, 'categorie'),  // Fonction de rendu personnalisée pour afficher la valeur de la colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_type_intervenant'), '').localeCompare(
                        defaultTo(get(b, 'id_type_intervenant'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'id_type_intervenant'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {IntervenantTableData};  // Exportation de l'objet IntervenantTableData pour être utilisé dans d'autres fichiers
