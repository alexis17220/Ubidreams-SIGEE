// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet GarageEnginTableData contenant les informations de la table de garage pour les engins
const GarageEnginTableData = {
    garageEngin: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            id_engin: {
                title: I18n.t(`pages.garage.table.registration`),  // Titre de la colonne traduit
                key: 'id_engin',  // Clé unique de la colonne
                dataIndex: 'id_engin',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (id_engin) => get(id_engin, 'immatriculation'),  // Fonction de rendu personnalisée pour afficher la valeur de la colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin.immatriculation'), '').localeCompare(
                        defaultTo(get(b, 'id_engin.immatriculation'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'id_engin.immatriculation'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            compteur1: {
                title: I18n.t(`pages.garage.table.km`),  // Titre de la colonne traduit
                key: 'compteur1',  // Clé unique de la colonne
                dataIndex: 'compteur1',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            compteur2: {
                title: I18n.t(`pages.garage.table.hr`),  // Titre de la colonne traduit
                key: 'compteur2',  // Clé unique de la colonne
                dataIndex: 'compteur2',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            compteurCorriger: {
                title: I18n.t(`pages.garage.table.corriger`),  // Titre de la colonne traduit
                key: 'compteurCorriger',  // Clé unique de la colonne
                dataIndex: 'compteur1',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (compteur1, record) => (
                    (record.compteur1 || '') + (80 * (record.compteur2 || 0))
                ),  // Fonction de rendu personnalisée pour afficher la valeur de la colonne
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            temoinauteur: {
                title: I18n.t(`pages.garage.table.author`),  // Titre de la colonne traduit
                key: 'temoinauteur',  // Clé unique de la colonne
                dataIndex: 'temoinauteur',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'temoinauteur'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            d_compteur: {
                title: I18n.t(`pages.garage.table.date`),  // Titre de la colonne traduit
                key: 'd_compteur',  // Clé unique de la colonne
                dataIndex: 'd_compteur',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_compteur'), '').localeCompare(
                        defaultTo(get(b, 'd_compteur'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'd_compteur'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {GarageEnginTableData};  // Exportation de l'objet GarageEnginTableData pour être utilisé dans d'autres fichiers
