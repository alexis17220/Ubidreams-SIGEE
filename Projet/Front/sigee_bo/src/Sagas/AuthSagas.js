// Libraries
import { put } from 'redux-saga/effects'
import { NavigationActions } from '@react-navigation/core'

// Actions
import { actions as AuthActions } from 'Resources/AuthResource'
import { actions as ProfileActions } from 'Resources/ProfileResource'

/**
 * Quand une session vient d'être ouverte (après un login)
 * @param action
 */
export function* setSession(action) {
  // Récupération du profile
  yield put(ProfileActions.getProfile())

  yield put(NavigationActions.navigate({ routeName: 'Authenticated' }))
}

/**
 * Quand le token n'est plus valable et que la session a expiré
 * @param action
 */
export function* sessionExpired(action) {
  // Vidage de la session
  yield put(AuthActions.resetAuth())

  // on revient vers la partie authentification
  yield put(NavigationActions.navigate({ routeName: 'Unauthenticated' }))
}
