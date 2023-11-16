// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "equipements"
export const {types, actions} = createResource({
    name: 'equipements', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/equipements`, // URL de l'API backend associée aux entités "equipements"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "equipements"

        // Action GET pour récupérer une liste d'équipements
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique d'assigner directement la réponse de la requête à l'action
            url: './', // URL relative pour récupérer la liste d'équipements
        },

        // Action POST pour créer un nouvel équipement
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouvel équipement
        },

        // Action GET pour récupérer un seul équipement basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting equipements', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un équipement en fonction de son ID
        },

        // Action PUT pour mettre à jour un équipement existant
        updateEquipement: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un équipement en fonction de son ID
        },

        // Action DELETE pour supprimer un équipement basé sur son ID
        deleteEquipement: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer un équipement basé sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
