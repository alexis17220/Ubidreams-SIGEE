import { NavigationActions } from '@react-navigation/core'

const config = {}

const setNavigator = (nav) => {
  if (nav) {
    config.navigator = nav
  }
}

const navigate = (routeName, params) => {
  if (config.navigator && routeName) {
    let action = NavigationActions.navigate({ routeName, params })
    config.navigator.dispatch(action)
  }
}

export default { setNavigator, navigate }
