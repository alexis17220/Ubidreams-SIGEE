// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les états de commande (commandeEtat) en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'commandeEtat',

    // URL de base pour les requêtes liées aux états de commande
    url: `${baseURL}/commandeEtat`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste d'états de commande (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour créer un nouvel état de commande (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },

        // Action pour récupérer un état de commande spécifique (GET) en utilisant l'ID de l'état de commande
        getOne: {
            method: 'GET',
            gerundName: 'getting commandeEtat',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de l'état de commande spécifique
        },

        // Action pour mettre à jour un état de commande existant (PUT)
        updateCommandeEtat: {
            method: 'PUT',
            gerundName: 'updating',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID de l'état de commande à mettre à jour
        },

        // Action pour supprimer un état de commande (DELETE)
        deleteCommandeEtat: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },

    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
});
