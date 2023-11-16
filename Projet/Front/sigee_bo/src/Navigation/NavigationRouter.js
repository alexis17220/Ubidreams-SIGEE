// Libraries
import { connect } from 'react-redux'
import { createSwitchNavigator } from '@react-navigation/core'
import { createBrowserApp } from '@react-navigation/web'

// Navigation Helpers
import {
  createNavigationReducer,
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from './Helpers'

// Utils
import { prepareStack } from 'Navigation/Utils'

// Routes
import { Authenticated, Unauthenticated } from 'Navigation/AppNavigator'

export const AppNavigator = createSwitchNavigator(
  prepareStack({
    Unauthenticated: {
      screen: Unauthenticated,
      path: 'auth',
    },
    Authenticated: {
      screen: Authenticated,
      path: '',
    },
  })
)

export const BrowserAppNavigation = createBrowserApp(AppNavigator)

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.nav,
  AppNavigator
)

export const navReducer = createNavigationReducer(AppNavigator)

export const ReduxAppNavigation = reduxifyNavigator(AppNavigator, 'root')

const mapStateToProps = (state) => ({
  state: state.nav,
})

export default connect(mapStateToProps)(reduxifyNavigator(AppNavigator, 'root'))
