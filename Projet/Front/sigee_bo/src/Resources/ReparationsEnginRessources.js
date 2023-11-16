// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "reparationEngins"
export const {types, actions} = createResource({
    name: 'reparationEngins', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/reparationEngin`, // URL de l'API backend associée aux entités "reparationEngins"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "reparationEngins"

        // Action GET pour récupérer une liste de réparations d'engins
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique de stocker la réponse dans la variable d'état après la requête
            url: './', // URL relative pour récupérer la liste de réparations d'engins
        },

        // Action POST pour créer une nouvelle réparation d'engin
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer une nouvelle réparation d'engin
        },

        // Action GET pour récupérer une seule réparation d'engin basée sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting reparationEngin', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer une réparation d'engin en fonction de son ID
        },

        // Action GET pour récupérer une liste de réparations d'engins basée sur l'ID de l'engin
        getOneBasedOnIdEngin: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting id reparationEngin', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer une liste de réparations d'engins en fonction de l'ID de l'engin
        },

        // Action PUT pour mettre à jour une réparation d'engin existante
        updateReparationEngin: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour une réparation d'engin en fonction de son ID
        },

        // Action DELETE pour supprimer une réparation d'engin basée sur son ID
        deleteReparationEngin: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer une réparation d'engin basée sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
