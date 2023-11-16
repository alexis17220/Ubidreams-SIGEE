// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "marques"
export const {types, actions} = createResource({
    name: 'marques', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/marques`, // URL de l'API backend associée aux entités "marques"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "marques"

        // Action GET pour récupérer une liste de marques
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique de stocker la réponse dans la variable d'état après la requête
            url: './', // URL relative pour récupérer la liste de marques
        },

        // Action POST pour créer une nouvelle marque
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer une nouvelle marque
        },

        // Action GET pour récupérer une seule marque basée sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting marque', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer une marque en fonction de son ID
        },

        // Action PUT pour mettre à jour une marque existante
        updateMarque: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour une marque en fonction de son ID
        },

        // Action DELETE pour supprimer une marque basée sur son ID
        deleteMarque: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer une marque basée sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
