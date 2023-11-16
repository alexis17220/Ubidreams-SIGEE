// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "equipeurs"
export const {types, actions} = createResource({
    name: 'equipeurs', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/equipeurs`, // URL de l'API backend associée aux entités "equipeurs"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "equipeurs"

        // Action GET pour récupérer une liste d'équipeurs
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique d'assigner directement la réponse de la requête à l'action
            url: './', // URL relative pour récupérer la liste d'équipeurs
        },

        // Action POST pour créer un nouvel équipeur
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouvel équipeur
        },

        // Action GET pour récupérer un seul équipeur basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting equipeur', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un équipeur en fonction de son ID
        },

        // Action PUT pour mettre à jour un équipeur existant
        updateEquipeur: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un équipeur en fonction de son ID
        },

        // Action DELETE pour supprimer un équipeur basé sur son ID
        deleteEquipeur: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer un équipeur basé sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
