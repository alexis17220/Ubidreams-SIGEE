// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les commandes (commande) en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'commande',

    // URL de base pour les requêtes liées aux commandes
    url: `${baseURL}/commande`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste de commandes (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer une nouvelle commande (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer une commande spécifique (GET) en utilisant l'ID de la commande
        getOne: {
            method: 'GET',
            gerundName: 'getting commande',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de la commande spécifique
        },

        // Action pour récupérer une commande en fonction de l'ID de l'intervention (GET)
        getOneIdIntervention: {
            method: 'GET',
            gerundName: 'getting commande intervention',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour mettre à jour une commande existante (PUT)
        updateCommande: {
            method: 'PUT',
            gerundName: 'updating',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de la commande à mettre à jour
        },

        // Action pour supprimer une commande (DELETE)
        deleteCommande: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
