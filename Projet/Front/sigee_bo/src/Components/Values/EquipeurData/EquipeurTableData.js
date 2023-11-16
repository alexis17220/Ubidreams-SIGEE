// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet EquipeurTableData contenant les informations de la table d'équipeurs
const EquipeurTableData = {
    equipeurs: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            name: {
                title: I18n.t(`pages.equipeur.name`),  // Titre de la colonne traduit
                key: 'name',  // Clé unique de la colonne
                dataIndex: 'nom',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'name'), '').localeCompare(
                        defaultTo(get(b, 'name'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de la propriété 'name'
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {EquipeurTableData};  // Exportation de l'objet EquipeurTableData pour être utilisé dans d'autres fichiers
