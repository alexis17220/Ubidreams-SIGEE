// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "interventionEngins"
export const {types, actions} = createResource({
    name: 'interventionEngins', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/interventionEngin`, // URL de l'API backend associée aux entités "interventionEngins"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "interventionEngins"

        // Action GET pour récupérer une liste d'interventionEngins
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique de stocker la réponse dans la variable d'état après la requête
            url: './', // URL relative pour récupérer la liste d'interventionEngins
        },

        // Action POST pour créer un nouveau interventionEngin
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouveau interventionEngin
        },

        // Action GET pour récupérer un seul interventionEngin basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting interventionEngin', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un interventionEngin en fonction de son ID
        },

        // Action GET pour récupérer un seul interventionEngin basé sur l'ID de l'engin
        getOneBasedOnIdEngin: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting id interventionEngin', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer un interventionEngin en fonction de l'ID de l'engin
        },

        // Action GET pour récupérer un seul interventionEngin basé sur l'ID de la réparation
        getOneBasedOnIdReparation: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting id interventionReparation', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer un interventionEngin en fonction de l'ID de la réparation
        },

        // Action PUT pour mettre à jour un interventionEngin existant
        updateInterventionEngin: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un interventionEngin en fonction de son ID
        },

        // Action DELETE pour supprimer un interventionEngin basé sur son ID
        deleteInterventionEngin: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer un interventionEngin basé sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
