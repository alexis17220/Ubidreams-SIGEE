import { createResource } from 'redux-rest-resource'
import { baseURL } from './'

export const { types, actions } = createResource({
  name: 'users',
  url: `${baseURL}/auth/users`,
  credentials: 'include',
  actions: {
    fetch: {
      method: 'GET',
      gerundName: 'fetching',
      assignResponse: true,
      url: './',
    },
    create: {
      method: 'POST',
      gerundName: 'creating',
      assignResponse: true,
      url: './',
    },
    update: {
      method: 'PUT',
      gerundName: 'updating',
      assignResponse: true,
      url: './:id/',
    },
    archive: {
      method: 'PATCH',
      gerundName: 'archiving',
      url: './:id/archive/',
    },
    archives: {
      method: 'PATCH',
      gerundName: 'archiving',
      url: './archive/',
    },
    delete: {
      method: 'DELETE',
      gerundName: 'deleting',
      url: './:id/',
    },
    reset: {
      method: 'GET',
      gerundName: 'resetting',
      url: './:id/reset/',
    },
    fetchArchives: {
      method: 'GET',
      gerundName: 'gettingArchives',
      url: './archives/',
    },
    restore: {
      method: 'PATCH',
      gerundName: 'restoring',
      url: './archives/restore/',
    },
  },
  stripTrailingSlashes: false,
})
