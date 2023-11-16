// Importation des modules et des dépendances nécessaires
import I18n from 'I18n'; // Module pour la gestion des traductions
import {defaultTo, get} from 'lodash'; // Fonctions de lodash pour la gestion des valeurs par défaut et l'accès aux propriétés d'objets
import React from 'react'; // Bibliothèque React pour créer des composants

// Définition de l'objet EquipementEnginTableData contenant les informations de la table d'association équipement-engin
const EquipementEnginTableData = {
    equipementsEngin: {
        pagination: {
            position: 'both',  // Position des boutons de pagination en haut et en bas de la table
            showSizeChanger: true,  // Afficher le sélecteur de taille pour changer le nombre d'éléments par page
        },
        rowKey: 'id',  // Nom de la clé unique pour chaque enregistrement de la table
        columns: {
            // Définition des colonnes de la table
            // Chaque colonne est définie par un objet avec plusieurs propriétés

            id_engin: {
                title: I18n.t(`pages.engin.table.registration`),  // Titre de la colonne traduit
                key: 'id_engin',  // Clé unique de la colonne
                dataIndex: 'id_engin',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (id_engin) => get(id_engin, 'immatriculation'),  // Fonction de rendu pour afficher le numéro d'immatriculation de l'engin
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_engin.immatriculation'), '').localeCompare(
                        defaultTo(get(b, 'id_engin.immatriculation'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de id_engin
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
            id_equipement: {
                title: I18n.t(`pages.equipement.table.libelle`),  // Titre de la colonne traduit
                key: 'id_equipement',  // Clé unique de la colonne
                dataIndex: 'id_equipement',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                render: (id_equipement) => get(id_equipement, 'libelle'),  // Fonction de rendu pour afficher le libellé de l'équipement
                sorter: (a, b) =>
                    defaultTo(get(a, 'id_equipement.libelle'), '').localeCompare(
                        defaultTo(get(b, 'id_equipement.libelle'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de id_equipement
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
            action: {
                title: I18n.t(`pages.equipementE.table.action`),  // Titre de la colonne traduit
                key: 'action',  // Clé unique de la colonne
                dataIndex: 'action',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'action'), '').localeCompare(
                        defaultTo(get(b, 'action'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de action
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
            utilisation: {
                title: I18n.t(`pages.equipementE.table.utilisation`),  // Titre de la colonne traduit
                key: 'd_limite_utilisation',  // Clé unique de la colonne
                dataIndex: 'd_limite_utilisation',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'd_limite_utilisation'), '').localeCompare(
                        defaultTo(get(b, 'd_limite_utilisation'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de d_limite_utilisation
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
            montage: {
                title: I18n.t(`pages.equipementE.table.montage`),  // Titre de la colonne traduit
                key: 'date_montage',  // Clé unique de la colonne
                dataIndex: 'date_montage',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'date_montage'), '').localeCompare(
                        defaultTo(get(b, 'date_montage'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de date_montage
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },
            verification: {
                title: I18n.t(`pages.equipementE.table.verification`),  // Titre de la colonne traduit
                key: 'date_verification',  // Clé unique de la colonne
                dataIndex: 'date_verification',  // Propriété de l'objet qui contient la valeur à afficher dans cette colonne
                sorter: (a, b) =>
                    defaultTo(get(a, 'date_verification'), '').localeCompare(
                        defaultTo(get(b, 'date_verification'), '')
                    ),
                // Fonction de tri personnalisée pour cette colonne, compare les valeurs de date_verification
                sortDirections: ['ascend', 'descend'],  // Directions de tri possibles (ascendant, descendant)
            },

        },
    },
};

export {EquipementEnginTableData};  // Exportation de l'objet EquipementEnginTableData pour être utilisé dans d'autres fichiers
