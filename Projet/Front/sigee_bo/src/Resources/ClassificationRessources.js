// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les classifications en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'classifications',

    // URL de base pour les requêtes liées aux classifications
    url: `${baseURL}/classifications`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste de classifications (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer une nouvelle classification (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer une classification spécifique (GET) en utilisant l'ID de la classification
        getOne: {
            method: 'GET',
            gerundName: 'getting classification',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de la classification spécifique
        },

        // Action pour mettre à jour une classification existante (PUT)
        updateClassification: {
            method: 'PUT',
            gerundName: 'updating',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de la classification à mettre à jour
        },

        // Action pour supprimer une classification (DELETE)
        deleteClassification: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
