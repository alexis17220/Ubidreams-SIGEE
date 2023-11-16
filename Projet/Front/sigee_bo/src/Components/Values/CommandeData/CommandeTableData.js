// Import des bibliothèques et modules nécessaires
import I18n from 'I18n'; // Module de gestion de la traduction
import {defaultTo, get} from 'lodash'; // Fonctions utilitaires pour gérer les valeurs par défaut et l'accès aux propriétés d'un objet
import React from 'react'; // Import de React

// Définition de l'objet CommandeTableData qui contient les configurations pour la table des commandes
const CommandeTableData = {
    commandes: {
        // Configuration de la pagination de la table
        pagination: {
            position: 'both', // Position des boutons de pagination ('top', 'bottom', 'both')
            showSizeChanger: true, // Affichage du sélecteur pour changer la taille de la page
        },
        // Clé unique pour chaque ligne de la table (colonne 'id' dans les données)
        rowKey: 'id',
        // Configuration des colonnes de la table
        columns: {
            // Colonne 'no_bon_cmd'
            no_bon_cmd: {
                title: I18n.t(`pages.commande.table.number`), // Titre de la colonne traduit
                key: 'no_bon_cmd', // Clé unique de la colonne
                dataIndex: 'no_bon_cmd', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'no_bon_cmd' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'no_bon_cmd'), '').localeCompare(
                        defaultTo(get(b, 'no_bon_cmd'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'atelier'
            atelier: {
                title: I18n.t(`pages.commande.table.workshop`), // Titre de la colonne traduit
                key: 'id_intervention', // Clé unique de la colonne
                dataIndex: 'id_intervention', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche le nom de l'intervenant lié à l'intervention)
                render: (id_intervention) => get(id_intervention, 'id_intervenant.nom'),
                // Fonction de tri pour la colonne (tri par la propriété 'id_intervention' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_intervention'), '').localeCompare(
                        defaultTo(get(b, 'id_intervention'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'auteur'
            auteur: {
                title: I18n.t(`pages.commande.table.autor`), // Titre de la colonne traduit
                key: 'temoinauteur', // Clé unique de la colonne
                dataIndex: 'temoinauteur', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'temoinauteur' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'date'
            date: {
                title: I18n.t(`pages.commande.table.date`), // Titre de la colonne traduit
                key: 'temoindate', // Clé unique de la colonne
                dataIndex: 'temoindate', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'temoindate' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'demande'
            demande: {
                title: I18n.t(`pages.commande.table.asked`), // Titre de la colonne traduit
                key: 'demande', // Clé unique de la colonne
                dataIndex: 'demande', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de tri pour la colonne (tri par la propriété 'demande' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'demande'), '').localeCompare(
                        defaultTo(get(b, 'demande'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'typeOps'
            typeOps: {
                title: I18n.t(`pages.commande.table.sort`), // Titre de la colonne traduit
                key: 'id_engin', // Clé unique de la colonne
                dataIndex: 'id_engin', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche le nom du type d'opération lié à l'engin)
                render: (id_engin) => get(id_engin, 'id_type_ops.nom'),
                // Fonction de tri pour la colonne (tri par la propriété 'id_engin' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'id_engin'
            id_engin: {
                title: I18n.t(`pages.commande.table.registration`), // Titre de la colonne traduit
                key: 'id_engin', // Clé unique de la colonne
                dataIndex: 'id_engin', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche l'immatriculation liée à l'engin)
                render: (id_engin) => get(id_engin, 'immatriculation'),
                // Fonction de tri pour la colonne (tri par la propriété 'id_engin' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'carrosserie'
            carrosserie: {
                title: I18n.t(`pages.commande.table.bodywork`), // Titre de la colonne traduit
                key: 'id_engin', // Clé unique de la colonne
                dataIndex: 'id_engin', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche la carrosserie liée à l'engin)
                render: (id_engin) => get(id_engin, 'carrosserie'),
                // Fonction de tri pour la colonne (tri par la propriété 'id_engin' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin'), '').localeCompare(
                        defaultTo(get(b, 'id_engin'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
            // Colonne 'id_etat'
            id_etat: {
                title: I18n.t(`pages.commande.table.state`), // Titre de la colonne traduit
                key: 'id_etat', // Clé unique de la colonne
                dataIndex: 'id_etat', // Nom de la propriété des données à afficher dans cette colonne
                // Fonction de rendu pour la colonne (affiche le nom de l'état lié à la commande)
                render: (id_etat) => get(id_etat, 'nom'),
                // Fonction de tri pour la colonne (tri par la propriété 'id_etat' des objets)
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_etat'), '').localeCompare(
                        defaultTo(get(b, 'id_etat'), '')
                    ),
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles (ascendant, descendant)
            },
        },
    },
};

// Export de l'objet CommandeTableData pour être utilisé dans d'autres parties du code
export {CommandeTableData};
