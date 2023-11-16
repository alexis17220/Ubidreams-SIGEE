import { createResourceAction } from 'redux-rest-resource'
import { baseURL } from './'

export const { types, actions, rootReducer } = createResourceAction({
  name: 'api',
  method: 'GET',
  url: `${baseURL}`,
  headers: {
    app: 'BO',
  },
})
