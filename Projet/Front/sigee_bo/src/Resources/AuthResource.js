import { createResource } from 'redux-rest-resource'
import { baseURL } from './'

export const { types, actions, rootReducer } = createResource({
  name: 'auth',
  url: `${baseURL}/auth`,
  credentials: 'include',
  actions: {
    // Rôles
    fetchRoles: {
      method: 'GET',
      gerundName: 'fetchRoles',
      url: './roles/',
    },
    // Connexion
    login: {
      method: 'POST',
      gerundName: 'loggingIn',
      url: './login',
    },

    // Forgotten
    forgotten: {
      method: 'POST',
      gerundName: 'askingForgotten',
      url: './login/forgot-password',
    },

    // Enregistrement des credentials
    set: {
      isPure: true,
      reduce: (state, { context: credentials }) => ({
        ...state,
        item: credentials,
      }),
    },

    checkLogin: {
      method: 'POST',
      gerundName: 'checkingLogin',
      url: './login/check',
    },

    checkCode: {
      method: 'POST',
      gerundName: 'checkingCode',
      url: './login/code',
    },

    createPassword: {
      method: 'POST',
      gerundName: 'settingPassword',
      url: './login/set-password',
    },

    updateForgotPassword: {
      method: 'POST',
      gerundName: 'settingPassword',
      url: './login/update-forgot-password',
    },
    setEmail: {
      method: 'POST',
      gerundName: 'settingEmail',
      url: './users/set_username/',
    },
/*    setPseudo:{
      method: 'POST',
      gerundName:'settingPseudo',
      url: './users/set_pseudo/',
    },*/
    validateEmail: {
      method: 'POST',
      gerundName: 'validatingEmail',
      url: './users/set_username/validate/',
    },
    // Logout
    logout: {
      method: 'GET',
      gerundName: 'loggingOut',
      url: './logout',
    },

    // Vidage du reducer
    reset: {
      isPure: true,
      reduce: (state) => ({ ...state, item: null }),
    },

    // Validation du mot de passe pour les actions sensibles
    validate: {
      method: 'POST',
      gerundName: 'validating',
      url: './users/validate-admin/',
    },
  },
  stripTrailingSlashes: false,
})
