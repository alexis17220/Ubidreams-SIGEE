// Import des bibliothèques et modules nécessaires
import I18n from 'I18n'; // Module de gestion de la traduction
import {defaultTo, get} from 'lodash'; // Fonctions utilitaires pour gérer les valeurs par défaut et l'accès aux propriétés d'un objet
import React from 'react'; // Import de React

// Définition de l'objet AffectationTableData qui contient les configurations pour la table des affectations
const AffectationTableData = {
    affectation: {
        // Configuration de la pagination de la table
        pagination: {
            position: 'both', // Position des boutons de pagination ('top', 'bottom', 'both')
            showSizeChanger: true, // Affichage du sélecteur pour changer la taille de la page
        },
        // Clé unique pour chaque ligne de la table (colonne 'id' dans les données)
        rowKey: 'id',
        // Configuration des colonnes de la table
        columns: {
            // Colonne 'libelle'
            libelle: {
                title: I18n.t(`pages.affectation.table.libelle`), // Titre de la colonne traduit
                key: 'libelle', // Clé unique de la colonne
                dataIndex: 'libelle', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'libelle' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'libelle'), '').localeCompare(
                        defaultTo(get(b, 'libelle'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'libelle_long'
            libelle_long: {
                title: I18n.t(`pages.affectation.table.libelle_long`), // Titre de la colonne traduit
                key: 'libelle_long', // Clé unique de la colonne
                dataIndex: 'libelle_long', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'libelle_long' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'libelle_long'), '').localeCompare(
                        defaultTo(get(b, 'libelle_long'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'code_centre'
            code_centre: {
                title: I18n.t(`pages.affectation.table.code_centre`), // Titre de la colonne traduit
                key: 'code_centre', // Clé unique de la colonne
                dataIndex: 'code_centre', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'code_centre' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'code_centre'), '').localeCompare(
                        defaultTo(get(b, 'code_centre'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'id_pere_adm'
            id_pere_adm: {
                title: I18n.t(`pages.affectation.table.affectation`), // Titre de la colonne traduit
                key: 'id_pere_adm', // Clé unique de la colonne
                dataIndex: 'id_pere_adm', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche la propriété 'libelle' de l'objet 'id_pere_adm')
                render: (id_pere_adm) => get(id_pere_adm, 'libelle'),
                // Fonction de tri pour la colonne (tri par la propriété 'id_pere_adm' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_pere_adm'), '').localeCompare(
                        defaultTo(get(b, 'id_pere_adm'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'libelle_sigale'
            libelle_sigale: {
                title: I18n.t(`pages.affectation.table.libelle_sigale`), // Titre de la colonne traduit
                key: 'libelle_sigale', // Clé unique de la colonne
                dataIndex: 'libelle_sigale', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'libelle_sigale' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'libelle_sigale'), '').localeCompare(
                        defaultTo(get(b, 'libelle_sigale'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'temoindate'
            temoindate: {
                title: I18n.t(`pages.affectation.table.date`), // Titre de la colonne traduit
                key: 'temoindate', // Clé unique de la colonne
                dataIndex: 'temoindate', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'temoindate' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'auteur'
            auteur: {
                title: I18n.t(`pages.affectation.table.author`), // Titre de la colonne traduit
                key: 'temoinauteur', // Clé unique de la colonne
                dataIndex: 'temoinauteur', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'temoinauteur' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
        },
    },
};

// Export de l'objet AffectationTableData pour être utilisé dans d'autres parties du code
export {AffectationTableData};
