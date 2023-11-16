// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet ProprietaireTableData contenant les informations de la table de propriétaires
const ProprietaireTableData = {
    proprietaires: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            name: {
                title: I18n.t(`Code Propriétaires`),  // Titre de la colonne traduit
                key: 'code',  // Clé unique de la colonne
                dataIndex: 'code_proprietaire',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'code'), '').localeCompare(
                        defaultTo(get(b, 'code'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'code'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            proprietaire: {
                title: I18n.t(`Libelle Propriétaires`),  // Titre de la colonne traduit
                key: 'proprietaire',  // Clé unique de la colonne
                dataIndex: 'libelle',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'proprietaire'), '').localeCompare(
                        defaultTo(get(b, 'proprietaire'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'proprietaire'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {ProprietaireTableData};  // Exportation de l'objet ProprietaireTableData pour être utilisé dans d'autres fichiers
