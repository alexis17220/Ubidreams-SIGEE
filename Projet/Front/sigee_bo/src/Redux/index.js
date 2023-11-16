// Libraries
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

// Sagas
import rootSaga from 'Sagas/'

// Store
import configureStore from './CreateStore'

// Reducer
import startupReducer from './StartupRedux'

// Resources
import { navReducer } from 'Navigation/NavigationRouter'
import { rootReducer as apiReducer } from 'Resources/ApiResource'
import { rootReducer as profileReducer } from 'Resources/ProfileResource'
import { rootReducer as authReducer } from 'Resources/AuthResource'

// Config
import ReduxPersist from 'Config/ReduxPersist'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  let rootReducer = combineReducers({
    startup: startupReducer,
    api: apiReducer,
    nav: navReducer,
    profile: profileReducer,
    auth: authReducer,
  })

  /* ------------- Config persistant store ------------- */
  if (ReduxPersist.active) {
    rootReducer = persistReducer(ReduxPersist.storeConfig, rootReducer)
  }

  return configureStore(rootReducer, rootSaga)
}
