// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les affectations en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'affectations',

    // URL de base pour les requêtes liées aux affectations
    url: `${baseURL}/affectations`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste d'affectations (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer une nouvelle affectation (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer une affectation spécifique (GET) en utilisant l'ID de l'affectation
        getOne: {
            method: 'GET',
            gerundName: 'getting affectations',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de l'affectation spécifique
        },

        // Action pour mettre à jour une affectation existante (PUT)
        updateAffectations: {
            method: 'PUT',
            gerundName: 'updating',
            url: './all/:id_affectation/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de l'affectation à mettre à jour
        },

        // Action pour supprimer une affectation (DELETE)
        deleteAffectations: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
