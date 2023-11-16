import { NavigationActions } from '@react-navigation/core'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const queryString = require('query-string')

const getPathAndParamsFromLocation = (location) => {
  const path = encodeURI(location.pathname.substr(1))
  const params = queryString.parse(location.search)
  return { path, params }
}

let currentPathAndParams = getPathAndParamsFromLocation(history.location)

function createNavigationReducer(navigator) {
  const initAction =
    navigator.router.getActionForPathAndParams(
      currentPathAndParams.path,
      currentPathAndParams.params
    ) || NavigationActions.init()
  const initialState = navigator.router.getStateForAction(initAction, null)

  return (state = initialState, action) => {
    return navigator.router.getStateForAction(action, state) || state
  }
}

export { createNavigationReducer }
