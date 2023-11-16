// External libs
import axios from 'axios'
import dotenv from 'dotenv'
import { Promise } from 'es6-promise'
import queryString from 'query-string'
import { get, defaultTo } from 'lodash'
import dotenvExpand from 'dotenv-expand'
import defaults from 'axios/lib/defaults'
import Reactotron from 'reactotron-react-js'
import { defaultGlobals as reduxRestResourceGlobals } from 'redux-rest-resource'

// Configuration de l'environnement
const myEnv = dotenv.config()
dotenvExpand(myEnv)

/**
 * L'URL d'accès à l'API
 * @type {string}
 */
export const baseURL = process.env.REACT_APP_API_SERVER_URL

/**
 * Méthode d'initialisation pour la configuration de redux-rest-resource
 * @private
 */
export default () => {
  /**
   * Permet de parser la réponse d'API renvoyée par axios afin de rester
   * conforme à ce qu'attend en retour redux-rest-resource pour son processus
   * @param response
   * @return Object
   */
  const parseResponse = (response) => {
    // log de la réponse dans reactotron
    if (Reactotron.apisauce) Reactotron.apisauce(response)

    return {
      ...response,
      headers: new window.Headers(get(response, 'headers', {})),
      json: () => {
        let promise

        try {
          promise = Promise.resolve(JSON.parse(get(response, 'data', {})))
        } catch (err) {
          promise = Promise.resolve({})
        }

        return promise
      },
      text: () => Promise.resolve(get(response, 'data', '')),
    }
  }

  /**
   * Permet de gérer le refresh du token
   * @param config
   */
  const refreshToken = () =>
    new Promise((resolve, reject) => {
      axios
        .get(`${baseURL}/auth/token/refresh`, { withCredentials: true })
        .then((response) => {
          // Token refreshed
          resolve(response)
        })
        .catch((error) => {
          // Erreur lors du refresh
          reject(error)
        })
    })

  /**
   * On surcharge la méthode fetch utilisée par redux-rest-resource
   * pour utiliser axios à la place
   * @param url
   * @param config
   * @return AxiosPromise
   */
  const fetch = (url, config) => {
    // Traitement de l'url
    const parsed = queryString.parseUrl(url)

    return axios.request({
      ...config,
      url: get(parsed, 'url'),
      data: config.body,
      params: {
        ...defaultTo(get(config, 'query'), {}),
        ...defaultTo(get(parsed, 'query'), {}),
      },
      adapter: (config) => {
        return new Promise((resolve, reject) => {
          defaults
            .adapter(config)
            .then((response) => {
              return resolve({
                ...parseResponse(response),
                ok: true,
              })
            })
            .catch((error) => {
              // Token expiré
              if (get(error, 'response.status') === 401) {
                refreshToken()
                  .then(() => {
                    // Relance de la tâche en cours avec le nouveau token
                    resolve(fetch(url, config))
                  })
                  // Token non-refresh
                  // Throw de l'erreur précédente
                  .catch(() => {
                    resolve({
                      ...parseResponse(error.response),
                      ok: false,
                    })
                  })
              } else {
                return resolve({
                  ...parseResponse(error.response),
                  ok: false,
                })
              }
            })
        })
      },
      timeout: 10000,
      withCredentials: true,
    })
  }

  Object.assign(reduxRestResourceGlobals, { fetch, Promise })
}
