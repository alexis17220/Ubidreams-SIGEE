// Import des bibliothèques et modules nécessaires
import I18n from 'I18n'; // Module de gestion de la traduction
import {defaultTo, get} from 'lodash'; // Fonctions utilitaires pour gérer les valeurs par défaut et l'accès aux propriétés d'un objet
import React from 'react'; // Import de React

// Définition de l'objet AffectationHistoGisementTableData qui contient les configurations pour la table d'historique d'affectation de gisement
const AffectationHistoGisementTableData = {
    affectationHistoGisement: {
        // Configuration de la pagination de la table
        pagination: {
            position: 'both', // Position des boutons de pagination ('top', 'bottom', 'both')
            showSizeChanger: true, // Affichage du sélecteur pour changer la taille de la page
        },
        // Clé unique pour chaque ligne de la table (colonne 'id' dans les données)
        rowKey: 'id',
        // Configuration des colonnes de la table
        columns: {
            // Colonne 'id_engin'
            id_engin: {
                title: I18n.t(`pages.affectGis.table.registration`), // Titre de la colonne traduit
                key: 'id_engin', // Clé unique de la colonne
                dataIndex: 'id_engin', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche la propriété 'immatriculation' de l'objet 'id_engin')
                render: (id_engin) => get(id_engin, 'immatriculation'),
                // Fonction de tri pour la colonne (tri par la propriété 'immatriculation' des objets 'id_engin')
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin.immatriculation'), '').localeCompare(
                        defaultTo(get(b, 'id_engin.immatriculation'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'code_centre'
            code_centre: {
                title: I18n.t(`pages.affectGis.table.code`), // Titre de la colonne traduit
                key: 'id_affec', // Clé unique de la colonne
                dataIndex: 'id_affec', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche la propriété 'code_centre' de l'objet 'id_affec')
                render: (id_affec) => get(id_affec, 'code_centre'),
                // Fonction de tri pour la colonne (tri par la propriété 'code_centre' des objets 'id_affec')
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_affec.code_centre'), '').localeCompare(
                        defaultTo(get(b, 'id_affec.code_centre'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'id_affec'
            id_affec: {
                title: I18n.t(`pages.affectGis.table.affectation`), // Titre de la colonne traduit
                key: 'id_affec', // Clé unique de la colonne
                dataIndex: 'id_affec', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche la propriété 'libelle' de l'objet 'id_affec')
                render: (id_affec) => get(id_affec, 'libelle'),
                // Fonction de tri pour la colonne (tri par la propriété 'libelle' des objets 'id_affec')
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_affec.libelle'), '').localeCompare(
                        defaultTo(get(b, 'id_affec.libelle'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },

            // Colonne 'd_affec'
            d_affec: {
                title: I18n.t(`pages.affectGis.table.date`), // Titre de la colonne traduit
                key: 'd_affec', // Clé unique de la colonne
                dataIndex: 'd_affec', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'd_affec' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_affec'), '').localeCompare(
                        defaultTo(get(b, 'd_affec'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'auteur'
            auteur: {
                title: I18n.t(`pages.affectGis.table.author`), // Titre de la colonne traduit
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

// Export de l'objet AffectationHistoGisementTableData pour être utilisé dans d'autres parties du code
export {AffectationHistoGisementTableData};
