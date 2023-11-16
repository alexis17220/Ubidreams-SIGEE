import { createResource } from 'redux-rest-resource'
import { baseURL } from './'

export const { types, actions } = createResource({
  name: 'homepage',
  url: `${baseURL}/homepage`,
  credentials: 'include',
  actions: {
    get: {
      method: 'GET',
      gerundName: 'fetching',
      assignResponse: true,
      url: './',
    },
    getOne: {
      method: 'GET',
      gerundName: 'fetching',
      assignResponse: true,
      url: './:id/',
    },
    create: {
      method: 'POST',
      gerundName: 'creating',
      url: './',
    },
    update: {
      method: 'PUT',
      gerundName: 'updating',
      url: './',
    },
    delete: {
      method: 'DELETE',
      gerundName: 'deleting',
      url: './delete/',
    },
  },
  stripTrailingSlashes: false,
})
