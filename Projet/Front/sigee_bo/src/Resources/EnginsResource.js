// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "engins"
export const {types, actions} = createResource({
    name: 'engins', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/engins`, // URL de l'API backend associée aux entités "engins"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "engins"

        // Action GET pour récupérer une liste d'engins
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer la liste d'engins
        },

        // Action POST pour créer un nouvel engin
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouvel engin
        },

        // Action GET pour récupérer un seul engin basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'gettingOne', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un engin en fonction de son ID
        },

        // Action GET pour récupérer un seul engin basé sur un ID spécifique (non lié à l'ID de l'engin)
        getOneBasedIdEngin: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'gettingOne', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer un engin en fonction d'un ID spécifique (non lié à l'ID de l'engin)
        },

        // Action PUT pour mettre à jour un engin existant
        update: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un engin en fonction de son ID
        },

        // Action DELETE pour supprimer plusieurs engins en fonction de leur ID
        deleteSelection: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer plusieurs engins en fonction de leur ID
        },

        // Action PATCH pour archiver un engin (mise à jour partielle)
        archive: {
            method: 'PATCH', // Méthode HTTP utilisée (PATCH)
            gerundName: 'archiving', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './archive/', // URL relative pour archiver un engin (mise à jour partielle)
        },

        // Action PATCH pour supprimer un engin basé sur son ID
        deleteEngin: {
            method: 'PATCH', // Méthode HTTP utilisée (PATCH)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour supprimer un engin basé sur son ID
        },

        // Action PATCH pour mettre à jour un engin partiellement basé sur son ID
        patch: {
            method: 'PATCH', // Méthode HTTP utilisée (PATCH)
            gerundName: 'patching', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour partiellement un engin basé sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
