// Importations nécessaires pour utiliser les fonctionnalités du code
import I18n from 'I18n'; // Bibliothèque de gestion des traductions
import {defaultTo, get} from 'lodash'; // Bibliothèque d'utilitaires pour manipuler les données
import React from 'react'; // Bibliothèque de création d'interfaces utilisateur

// Objet de configuration de la table des types techniques
const TypeTechTableData = {
    typeTech: {
        pagination: {
            position: 'both', // Position des contrôles de pagination (en haut et en bas de la table)
            showSizeChanger: true, // Option pour changer la taille des pages affichées
        },
        rowKey: 'id', // Propriété utilisée comme clé unique pour chaque ligne de la table
        columns: {
            // Configuration des colonnes de la table
            name: {
                title: I18n.t(`pages.typeTech.table.name`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'nom', // Clé unique de la colonne, correspond à la propriété 'nom' des données
                dataIndex: 'nom', // Propriété des données à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'nom'), '').localeCompare(
                        defaultTo(get(b, 'nom'), '')
                    ), // Fonction de tri pour trier les noms par ordre alphabétique
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles pour cette colonne
            },
            libelle: {
                title: I18n.t(`pages.typeTech.table.libelle`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'libelle', // Clé unique de la colonne, correspond à la propriété 'libelle' des données
                dataIndex: 'libelle', // Propriété des données à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'libelle'), '').localeCompare(
                        defaultTo(get(b, 'libelle'), '')
                    ), // Fonction de tri pour trier les libellés par ordre alphabétique
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles pour cette colonne
            },
            typeGamme: {
                title: I18n.t(`pages.typeTech.table.gamme`), // Titre de la colonne obtenu à partir de la traduction I18n
                key: 'id_type_gamme', // Clé unique de la colonne, correspond à la propriété 'id_type_gamme' des données
                dataIndex: 'id_type_gamme', // Propriété des données à afficher dans cette colonne
                render: (id_type_gamme) => get(id_type_gamme, 'nom'), // Fonction de rendu pour afficher le nom de la gamme associée
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_type_gamme.nom'), '').localeCompare(
                        defaultTo(get(b, 'id_type_gamme.nom'), '')
                    ), // Fonction de tri pour trier les noms de gamme par ordre alphabétique
                sortDirections: ['ascend', 'descend'], // Directions de tri possibles pour cette colonne
            },
        },
    },
};

// Exportation de l'objet de configuration pour pouvoir l'utiliser ailleurs dans l'application
export {TypeTechTableData};
