// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les catégories d'affectation en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'categorieAffectation',

    // URL de base pour les requêtes liées aux catégories d'affectation
    url: `${baseURL}/categorieAffectation`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste de catégories d'affectation (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer une nouvelle catégorie d'affectation (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer une catégorie d'affectation spécifique (GET) en utilisant l'ID de la catégorie
        getOne: {
            method: 'GET',
            gerundName: 'getting categorieAffectation',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de la catégorie spécifique
        },

        // Action pour mettre à jour une catégorie d'affectation existante (PUT)
        updateCategorieAffectation: {
            method: 'PUT',
            gerundName: 'updating',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de la catégorie à mettre à jour
        },

        // Action pour supprimer une catégorie d'affectation (DELETE)
        deleteCategorieAffectation: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
