// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet EquipementTableData contenant les informations de la table d'équipements
const EquipementTableData = {
    equipements: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            name: {
                title: I18n.t(`pages.equipement.table.libelle`),  // Titre de la colonne traduit
                key: 'equipement',  // Clé unique de la colonne
                dataIndex: 'libelle',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'equipement'), '').localeCompare(
                        defaultTo(get(b, 'equipement'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de libelle
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

            periode: {
                title: I18n.t(`pages.equipement.table.periode`),  // Titre de la colonne traduit
                key: 'periode',  // Clé unique de la colonne
                dataIndex: 'periode_revision',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'periode'), '').localeCompare(
                        defaultTo(get(b, 'periode'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de periode_revision
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {EquipementTableData};  // Exportation de l'objet EquipementTableData pour être utilisé dans d'autres fichiers
