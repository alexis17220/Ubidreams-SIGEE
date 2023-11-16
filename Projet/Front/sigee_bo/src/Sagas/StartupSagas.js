import { includes } from 'lodash'
import { call, put, take, select, delay } from 'redux-saga/effects'

// Actions
import { startupDone } from 'Redux/StartupRedux'

// Sagas
import { sessionExpired } from './AuthSagas'

// Resources
import { actions as apiActions } from 'Resources/ApiResource'
import {
  types as profileTypes,
  actions as profileActions,
} from 'Resources/ProfileResource'

/**
 * Déclenchée au démarrage de l'application
 * @param action
 */
export function* startupBLA(action) {
  // Récupération de l'état de l'API
  yield put(apiActions.getApi())
}

/**
 * L'API est disponible, on peut démarrer l'application normalement
 */
export function* apiAvailable() {
  yield put(profileActions.getProfile())
  yield take(({ status, type }) => {
    return includes([profileTypes.GET_PROFILE], type) && status !== 'pending'
  })
  // récupération des informations liées à la session
  const session = yield select((state) => state.profile.item)

  // Fake waiting
  // yield delay(1000)
  if (!session) {
    yield call(sessionExpired)
  }

  // Démarrage ok
  yield put(startupDone())
}

/**
 * L'api est indisponible, on affiche un message de maintenance
 */
export function* apiUnavailable() {}
