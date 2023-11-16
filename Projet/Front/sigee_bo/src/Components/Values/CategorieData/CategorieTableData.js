// Import des bibliothèques et modules nécessaires
import I18n from 'I18n'; // Module de gestion de la traduction
import {defaultTo, get} from 'lodash'; // Fonctions utilitaires pour gérer les valeurs par défaut et l'accès aux propriétés d'un objet
import React from 'react'; // Import de React

// Définition de l'objet CategorieTableData qui contient les configurations pour la table des catégories
const CategorieTableData = {
    categories: {
        // Configuration de la pagination de la table
        pagination: {
            position: 'both', // Position des boutons de pagination ('top', 'bottom', 'both')
            showSizeChanger: true, // Affichage du sélecteur pour changer la taille de la page
        },
        // Clé unique pour chaque ligne de la table (colonne 'id' dans les données)
        rowKey: 'id',
        // Configuration des colonnes de la table
        columns: {
            // Colonne 'name'
            name: {
                title: I18n.t(`pages.category.table.code`), // Titre de la colonne traduit
                key: 'code', // Clé unique de la colonne
                dataIndex: 'code_famille', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'code' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'code'), '').localeCompare(
                        defaultTo(get(b, 'code'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'famille'
            famille: {
                title: I18n.t(`pages.category.table.libelle`), // Titre de la colonne traduit
                key: 'famille', // Clé unique de la colonne
                dataIndex: 'libelle_famille', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'famille' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'famille'), '').localeCompare(
                        defaultTo(get(b, 'famille'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
        },
    },
};

// Export de l'objet CategorieTableData pour être utilisé dans d'autres parties du code
export {CategorieTableData};
