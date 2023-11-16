import { createResource } from 'redux-rest-resource'
import { baseURL } from './'

export const { types, actions, rootReducer } = createResource({
  name: 'profile',
  url: `${baseURL}/auth`,
  credentials: 'include',
  actions: {
    get: { method: 'GET', gerundName: 'getting', url: './users/me/' },
    //update: { method: 'PATCH', gerundName: 'updating', url: './users/me/' },
    updatePassword: {
      method: 'POST',
      gerundName: 'updatingPassword',
      url: './users/set_password/',
    },
  },
  stripTrailingSlashes: false,
})
