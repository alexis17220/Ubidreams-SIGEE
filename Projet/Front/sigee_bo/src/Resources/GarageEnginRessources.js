// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "garageEngins"
export const {types, actions} = createResource({
    name: 'garageEngins', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/garageEngin`, // URL de l'API backend associée aux entités "garageEngins"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "garageEngins"

        // Action GET pour récupérer une liste de garageEngins
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique de stocker la réponse dans la variable d'état après la requête
            url: './', // URL relative pour récupérer la liste de garageEngins
        },

        // Action POST pour créer un nouveau garageEngin
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouveau garageEngin
        },

        // Action GET pour récupérer un seul garageEngin basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting garages', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un garageEngin en fonction de son ID
        },

        // Action GET pour récupérer un seul garageEngin basé sur l'ID d'un engin associé
        getOneBasedIdEngin: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting garages', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer un garageEngin en fonction de l'ID de l'engin associé
        },

        // Action PUT pour mettre à jour un garageEngin existant
        updateGarage: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un garageEngin en fonction de son ID
        },

        // Action DELETE pour supprimer un garageEngin basé sur son ID
        deleteGarage: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer un garageEngin basé sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
