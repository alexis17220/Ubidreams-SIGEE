import { takeLatest, all } from 'redux-saga/effects'
import { get } from 'lodash'

/* ------------- Types ------------- */

import { startup } from 'Redux/StartupRedux'
import { types as AuthTypes } from 'Resources/AuthResource'
import { types as ApiTypes } from 'Resources/ApiResource'

/* ------------- Sagas ------------- */

import { startupBLA, apiAvailable, apiUnavailable } from './StartupSagas'
import { setSession, sessionExpired } from './AuthSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // Erreur 401 > sessionExpired
    takeLatest((action) => {
      return (
        // Status rejected et erreur 401
        get(action, 'status') === 'rejected' && get(action, 'code') === 401
      )
    }, sessionExpired),

    // Session Utilisateur
    takeLatest(
      (action) =>
        action.type === AuthTypes.LOGIN_AUTH && action.status === 'resolved',
      setSession
    ),
    takeLatest(
      (action) =>
        action.type === AuthTypes.LOGOUT_AUTH && action.status === 'resolved',
      sessionExpired
    ),

    // API
    takeLatest((action) => {
      return action.type === ApiTypes.GET_API && action.status === 'resolved'
    }, apiAvailable),
    takeLatest(
      (action) =>
        action.type === ApiTypes.GET_API && action.status === 'rejected',
      apiUnavailable
    ),

    // Démarrage de l'application
    takeLatest(startup.type, startupBLA),
  ])
}
