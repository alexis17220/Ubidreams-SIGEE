// Importations nécessaires pour utiliser les fonctionnalités du code
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {defaultTo, get} from 'lodash'; // Bibliothèque d'utilitaires pour manipuler les données
import React from 'react'; // Bibliothèque de création d'interfaces utilisateur

// Objet de configuration de la table des types d'attelage
const TypeAttelageTableData = {
    typeAttelages: {
        pagination: {
            position: 'both', // Position des contrôles de pagination (en haut et en bas de la table)
            showSizeChanger: true, // Option pour changer la taille des pages affichées
        },
        rowKey: 'id', // Propriété utilisée comme clé unique pour chaque ligne de la table
        columns: {
            // Configuration des colonnes de la table
            name: {
                title: I18n.t(`pages.attelage.table.name`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'nom', // Clé unique de la colonne, correspond à la propriété 'nom' des données
                dataIndex: 'nom', // Propriété des données à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'nom'), '').localeCompare(
                        defaultTo(get(b, 'nom'), '')
                    ), // Fonction de tri pour trier les noms par ordre alphabétique
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles pour cette colonne
            },
            auteur: {
                title: I18n.t(`pages.attelage.table.author`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoinauteur', // Clé unique de la colonne, correspond à la propriété 'temoinauteur' des données
                dataIndex: 'temoinauteur', // Propriété des données à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoinauteur'), '').localeCompare(
                        defaultTo(get(b, 'temoinauteur'), '')
                    ), // Fonction de tri pour trier les noms des auteurs par ordre alphabétique
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles pour cette colonne
            },
            date: {
                title: I18n.t(`pages.attelage.table.date`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'temoindate', // Clé unique de la colonne, correspond à la propriété 'temoindate' des données
                dataIndex: 'temoindate', // Propriété des données à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'temoindate'), '').localeCompare(
                        defaultTo(get(b, 'temoindate'), '')
                    ), // Fonction de tri pour trier les dates par ordre alphabétique
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles pour cette colonne
            },
        },
    },
};

// Exportation de l'objet de configuration pour pouvoir l'utiliser ailleurs dans l'application
export {TypeAttelageTableData};
