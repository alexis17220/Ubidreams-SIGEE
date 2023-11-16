// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les log en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'log',

    // URL de base pour les requêtes liées au log
    url: `${baseURL}/log`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste de log (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer un nouveau log (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer un log spécifique (GET) en utilisant l'ID de log
        getOne: {
            method: 'GET',
            gerundName: 'getting log',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de log spécifique
        },

        // Action pour mettre à jour un log existante (PUT)
        updatelog: {
            method: 'PUT',
            gerundName: 'updating',
            url: './all/:id_log/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de log à mettre à jour
        },

        // Action pour supprimer un log (DELETE)
        deletelog: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
