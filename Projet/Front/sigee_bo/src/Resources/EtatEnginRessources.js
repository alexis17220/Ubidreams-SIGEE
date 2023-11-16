// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "etatengin"
export const {types, actions} = createResource({
    name: 'etatengin', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/etatengin`, // URL de l'API backend associée aux entités "etatengin"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "etatengin"

        // Action GET pour récupérer une liste d'états d'engins
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer la liste d'états d'engins
        },

        // Action POST pour créer un nouvel état d'engin
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouvel état d'engin
        },

        // Action GET pour récupérer un seul état d'engin basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'gettingOne', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un état d'engin en fonction de son ID
        },

        // Action PUT pour mettre à jour un état d'engin existant
        update: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un état d'engin en fonction de son ID
        },

        // Action DELETE pour supprimer un ensemble d'états d'engins basé sur une sélection
        deleteSelection: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer une sélection d'états d'engins
        },

        // Action PATCH pour archiver un état d'engin
        archive: {
            method: 'PATCH', // Méthode HTTP utilisée (PATCH)
            gerundName: 'archiving', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './archive/', // URL relative pour archiver un état d'engin
        },

        // Action PATCH pour supprimer un état d'engin basé sur son ID
        deleteEtatEngin: {
            method: 'PATCH', // Méthode HTTP utilisée (PATCH)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour supprimer un état d'engin basé sur son ID
        },

        // Action PATCH pour effectuer une modification partielle sur un état d'engin existant
        patch: {
            method: 'PATCH', // Méthode HTTP utilisée (PATCH)
            gerundName: 'patching', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour effectuer une modification partielle sur un état d'engin en fonction de son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
