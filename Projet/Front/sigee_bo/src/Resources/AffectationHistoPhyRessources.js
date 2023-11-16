// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les affectations d'historique de physique en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'affectationHistoPhy',

    // URL de base pour les requêtes liées aux affectations d'historique de physique
    url: `${baseURL}/affectationHistoPhy`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste d'affectations d'historique de physique (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer une nouvelle affectation d'historique de physique (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer une affectation d'historique de physique spécifique (GET) en utilisant l'ID de l'affectation
        getOne: {
            method: 'GET',
            gerundName: 'getting affectationHistoPhy',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de l'affectation spécifique
        },

        // Action pour récupérer une affectation d'historique de physique spécifique en fonction de l'ID de l'engin (GET)
        getOneBasedIdEngin: {
            method: 'GET',
            gerundName: 'getting affectationHistoPhy',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour mettre à jour une affectation d'historique de physique existante (PUT)
        updateAffectationHistoPhy: {
            method: 'PUT',
            gerundName: 'updating',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de l'affectation à mettre à jour
        },

        // Action pour supprimer une affectation d'historique de physique (DELETE)
        deleteAffectationHistoPhy: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
