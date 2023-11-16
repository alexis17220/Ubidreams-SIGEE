// @flow

import { get } from 'lodash'
import invariant from 'invariant'
import { createBrowserHistory } from 'history'
import { getNavigation, NavigationActions } from '@react-navigation/core'

import { matchPathAndParams } from '../Utils'

const reduxSubscribers = new Map()

// screenProps are a legacy concept in React Navigation,
// and should not be used in redux apps
const EMPTY_SCREEN_PROPS = {}
const getScreenProps = () => EMPTY_SCREEN_PROPS

const queryString = require('query-string')

const history = createBrowserHistory()

const getPathAndParamsFromLocation = (location) => {
  let path
  let params
  if (location.pathname) {
    path = encodeURI(location.pathname.substring(1))
    params = queryString.parse(location.search)
  } else {
    //fix de l'erreur de structure de l'objet reçu
    path = encodeURI(location.location.pathname.substring(1))
    params = queryString.parse(location.location.search)
  }

  return { path, params }
}

let initAction = NavigationActions.init()

let currentPathAndParams = getPathAndParamsFromLocation(history.location)

function createReactNavigationReduxMiddleware(
  key,
  navStateSelector,
  Navigator
) {
  reduxSubscribers.set(key, new Set())
  initAction = Navigator.router.getActionForPathAndParams(
    currentPathAndParams.path,
    currentPathAndParams.params
  )

  const setHistoryListener = (store) => {
    history.listen((location) => {
      const pathAndParams = getPathAndParamsFromLocation(location)

      if (matchPathAndParams(pathAndParams, currentPathAndParams)) {
        return
      }

      currentPathAndParams = pathAndParams

      const action = Navigator.router.getActionForPathAndParams(
        pathAndParams.path,
        pathAndParams.params
      )

      if (action) {
        store.dispatch(action)
      }
    })
  }

  return (store) => (next) => (action) => {
    const lastState = navStateSelector(store.getState())
    const result = next(action)
    const newState = navStateSelector(store.getState())
    const subscribers = reduxSubscribers.get(key)
    const pathAndParams =
      Navigator.router.getPathAndParamsForState &&
      Navigator.router.getPathAndParamsForState(newState)

    setHistoryListener(store)

    if (newState && newState !== lastState) {
      if (
        pathAndParams &&
        !matchPathAndParams(pathAndParams, currentPathAndParams)
      ) {
        history.push(
          `/${pathAndParams.path}?${queryString.stringify(
            pathAndParams.params
          )}`
        )
      }
    }

    invariant(subscribers, `subscribers set should exist for ${key}`)
    triggerAllSubscribers(key, subscribers, {
      type: 'action',
      action,
      state: newState,
      lastState,
    })

    return result
  }
}

let delaySubscriberTriggerUntilReactReduxConnectTriggers = false
const delayedTriggers = new Map()

function triggerAllSubscribers(key, subscribers, payload) {
  const trigger = () => subscribers.forEach((subscriber) => subscriber(payload))

  if (get(payload, 'action')) {
    if (
      !delaySubscriberTriggerUntilReactReduxConnectTriggers ||
      !payload.action.hasOwnProperty('type') ||
      !payload.action.type.startsWith('Navigation') ||
      payload.state === payload.lastState
    ) {
      trigger()
      return
    }

    const existingTriggers = delayedTriggers.get(key)

    if (existingTriggers) {
      existingTriggers.push(trigger)
    } else {
      delayedTriggers.set(key, [trigger])
    }
  }
}

function triggerDelayedSubscribers(key) {
  const triggers = delayedTriggers.get(key)
  if (!triggers) {
    return
  }
  delayedTriggers.delete(key)
  for (let trigger of triggers) {
    trigger()
  }
}

function createDidUpdateCallback(key) {
  delaySubscriberTriggerUntilReactReduxConnectTriggers = true
  return triggerDelayedSubscribers.bind(null, key)
}

function initializeListeners(key, state) {
  const subscribers = reduxSubscribers.get(key)
  invariant(
    subscribers,
    'Before calling `reduxifyNavigator`, please call ' +
      '`createReactNavigationReduxMiddleware`, so that we know ' +
      'when to trigger your listener.'
  )
  triggerAllSubscribers(key, subscribers, {
    type: 'action',
    action: initAction,
    state: state,
    lastState: null,
  })
  if (delaySubscriberTriggerUntilReactReduxConnectTriggers) {
    triggerDelayedSubscribers(key)
  }
}

function createNavigationPropConstructor(key) {
  const actionSubscribers = reduxSubscribers.get(key)
  invariant(
    actionSubscribers,
    'Before calling `reduxifyNavigator`, please call ' +
      '`createReactNavigationReduxMiddleware`, so that we know ' +
      'when to trigger your listener.'
  )
  return (dispatch, state, router, getCurrentNavigation) => {
    invariant(
      router,
      'App.router must be provided to createNavigationPropConstructor as of ' +
        'react-navigation-redux-helpers@2.0.0. Learn more: ' +
        'https://reactnavigation.org/docs/en/' +
        'redux-integration.html#breaking-changes-in-2.3'
    )
    invariant(
      getCurrentNavigation,
      'getCurrentNavigation must be provided to createNavigationPropConstructor as of ' +
        'react-navigation-redux-helpers@2.0.0. Learn more: ' +
        'https://reactnavigation.org/docs/en/' +
        'redux-integration.html#breaking-changes-in-2.3'
    )

    return getNavigation(
      router,
      state,
      dispatch,
      actionSubscribers,
      getScreenProps,
      getCurrentNavigation
    )
  }
}

export {
  createReactNavigationReduxMiddleware,
  createDidUpdateCallback,
  initializeListeners,
  createNavigationPropConstructor,
}
