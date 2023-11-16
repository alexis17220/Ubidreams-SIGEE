// Importation de la fonction createResource de la bibliothèque redux-rest-resource pour créer un gestionnaire de ressources
import {createResource} from 'redux-rest-resource';

// Importation de la variable baseURL depuis un fichier local non spécifié (probablement un fichier de configuration)
import {baseURL} from './';

// Création d'un gestionnaire de ressources pour les entités "equipementsEngin"
export const {types, actions} = createResource({
    name: 'equipementsEngin', // Nom de la ressource, utilisé pour générer les types d'action
    url: `${baseURL}/equipements_engin`, // URL de l'API backend associée aux entités "equipementsEngin"
    credentials: 'include', // Indique d'inclure les informations d'authentification lors des requêtes
    actions: {
        // Configuration des différentes actions que l'on peut effectuer sur les entités "equipementsEngin"

        // Action GET pour récupérer une liste d'équipements d'engin
        get: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'fetching', // Nom de l'action utilisé pour les messages en cours d'exécution
            assignResponse: true, // Indique d'assigner directement la réponse de la requête à l'action
            url: './', // URL relative pour récupérer la liste d'équipements d'engin
        },

        // Action POST pour créer un nouvel équipement d'engin
        create: {
            method: 'POST', // Méthode HTTP utilisée (POST)
            gerundName: 'creating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour créer un nouvel équipement d'engin
        },

        // Action GET pour récupérer un seul équipement d'engin basé sur son ID
        getOne: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting equipementsEngin', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour récupérer un équipement d'engin en fonction de son ID
        },

        // Action GET pour récupérer un seul équipement d'engin basé sur l'ID de l'engin (non lié à l'ID de l'équipement)
        getOneBasedOnIdEngin: {
            method: 'GET', // Méthode HTTP utilisée (GET)
            gerundName: 'getting id equipementsEngin', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './', // URL relative pour récupérer un équipement d'engin en fonction de l'ID de l'engin
        },

        // Action PUT pour mettre à jour un équipement d'engin existant
        updateEquipementEngin: {
            method: 'PUT', // Méthode HTTP utilisée (PUT)
            gerundName: 'updating', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './:id/', // URL relative pour mettre à jour un équipement d'engin en fonction de son ID
        },

        // Action DELETE pour supprimer un équipement d'engin basé sur son ID
        deleteEquipementEngin: {
            method: 'DELETE', // Méthode HTTP utilisée (DELETE)
            gerundName: 'deleting', // Nom de l'action utilisé pour les messages en cours d'exécution
            url: './delete/', // URL relative pour supprimer un équipement d'engin basé sur son ID
        },
    },
    stripTrailingSlashes: false, // Désactive la suppression des barres obliques de fin d'URL
});
