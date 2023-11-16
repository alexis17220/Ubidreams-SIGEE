// Libraries
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createPromise } from 'redux-promise-middleware'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants'

// Navigation
import { navigationMiddleware } from 'Navigation/NavigationRouter'

// Config
import ReduxPersist from 'Config/ReduxPersist'

// Services
import Rehydration from 'Services/Rehydration'

// Creation of the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Promise Middleware ------------- */

  middleware.push(
    createPromise({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    })
  )

  /* ------------- Navigation Middleware ------------- */

  middleware.push(navigationMiddleware)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor =
    process.env.NODE_ENV !== 'production'
      ? console.tron.createSagaMonitor()
      : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */

  const SAGA_LOGGING_BLACKLIST = [
    'EFFECT_TRIGGERED',
    'EFFECT_RESOLVED',
    'EFFECT_REJECTED',
    'persist/REHYDRATE',
  ]

  if (process.env.NODE_ENV === 'development') {
    // silence these saga-based messages
    // create the logger
    const logger = createLogger({
      predicate: (getState, { type }) =>
        SAGA_LOGGING_BLACKLIST.indexOf(type) === -1,
    })

    // middleware.push(logger)
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  if (process.env.NODE_ENV !== 'production') {
    enhancers.push(console.tron.createEnhancer())
  }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(...middleware)

  /* ------------- Run ------------- */

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // Cette déclaration permet d'inclure les middlewares inclus par défaut dans redux-toolkit. Pour le middleware serializableCheck je renseigne les éléments qu'il ne doit pas vérifier (les fonction notamments).
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredActionPaths: ['options.reduce'],
        },
      }).concat(middleware),
  })

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  // applyMiddleware(sagaMiddleware)
  sagaMiddleware.run(rootSaga)

  return store
}
