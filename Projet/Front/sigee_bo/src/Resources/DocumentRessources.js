// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource'
// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './'
// Création d'un gestionnaire de ressources pour les documents (document) en utilisant la fonction createResource
export const {types, actions} = createResource({
    // Nom de la ressource
    name: 'documents',
    // URL de base pour les requêtes liées aux documents
    url: `${baseURL}/documents`,

    // Options de requête
    credentials: 'include',

    // Définition des actions pour interagir avec l'API
    actions: {
        // Action pour récupérer une liste de document (GET)
        get: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },
        // Action pour créer un nouveau document (POST)
        create: {
            method: 'POST',
            gerundName: 'creating',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },
        // Action pour récupérer un document spécifique (GET) en utilisant l'ID du document
        getOne: {
            method: 'GET',
            gerundName: 'getting documents',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID du document spécifique
        },
        // Action pour récupérer un document en fonction de l'ID de l'engin (GET)
        getOneBasedIdEngin: {
            method: 'GET',
            gerundName: 'getting documents',
            url: './', // L'URL est relative à l'URL de base définie ci-dessus
        },
        // Action pour mettre à jour un document existante (PUT)
        updateDocument: {
            method: 'PUT',
            gerundName: 'updating',
            url: './:id/', // L'URL est relative à l'URL de base définie ci-dessus, et :id est un paramètre dynamique pour l'ID du document à mettre à jour
        },
        // Action pour supprimer un document (DELETE)
        deleteDocument: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './delete/', // L'URL est relative à l'URL de base définie ci-dessus
        },
    },
    // Option pour empêcher la suppression des barres obliques finales dans les URL
    stripTrailingSlashes: false,
})
