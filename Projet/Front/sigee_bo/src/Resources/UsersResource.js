// Import du gestionnaire de ressources et de l'URL de base
import {createResource} from 'redux-rest-resource'
import {baseURL} from './'

// Création du gestionnaire de ressources pour les entités "users"
export const {types, actions} = createResource({
    name: 'users',
    url: `${baseURL}/users`,
    credentials: 'include',
    actions: {
        // Action GET pour récupérer une liste d'utilisateurs
        fetch: {
            method: 'GET',
            gerundName: 'fetching',
            assignResponse: true,
            url: './',
        },
        // Action POST pour créer un nouvel utilisateur. La réponse est assignée à la variable d'état.
        create: {
            method: 'POST',
            gerundName: 'creating',
            assignResponse: true,
            url: './',
        },
        // Action PUT pour mettre à jour un utilisateur existant. La réponse est assignée à la variable d'état.
        update: {
            method: 'PUT',
            gerundName: 'updating',
            assignResponse: true,
            url: './:id/',
        },
        // Action PATCH pour archiver un utilisateur spécifique en fonction de son ID.
        archive: {
            method: 'PATCH',
            gerundName: 'archiving',
            url: './:id/archive/',
        },
        // Action PATCH pour archiver plusieurs utilisateurs à la fois.
        archives: {
            method: 'PATCH',
            gerundName: 'archiving',
            url: './archive/',
        },
        // Action DELETE pour supprimer un utilisateur spécifique en fonction de son ID.
        delete: {
            method: 'DELETE',
            gerundName: 'deleting',
            url: './:id/',
        },
        // Action GET pour réinitialiser les informations d'un utilisateur en fonction de son ID.
        reset: {
            method: 'GET',
            gerundName: 'resetting',
            url: './:id/reset/',
        },
        // Action GET pour récupérer la liste des utilisateurs archivés.
        fetchArchives: {
            method: 'GET',
            gerundName: 'gettingArchives',
            url: './archives/',
        },
        // Action PATCH pour restaurer un utilisateur archivé.
        restore: {
            method: 'PATCH',
            gerundName: 'restoring',
            url: './archives/restore/',
        },
    },
    // Désactiver la suppression des barres obliques finales dans l'URL
    stripTrailingSlashes: false,
})
