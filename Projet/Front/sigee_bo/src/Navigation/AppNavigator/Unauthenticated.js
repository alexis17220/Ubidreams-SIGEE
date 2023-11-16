// Libraries
import { createNavigator, StackRouter } from '@react-navigation/core'

// Utils
import { prepareStack } from 'Navigation/Utils'

// Layout
import { UnauthenticatedLayout } from 'Navigation/Layout'

// Views
import { Login } from 'Views/Authentication'

// Stacks
export const Stack = StackRouter(
  prepareStack({
    Login: {
      screen: Login,
      path: 'login',
      navigationOptions: {
        title: 'Connexion',
      },
    },
  }),
  {
    initialRouteName: 'Login',
  }
)

// Navigators
const navigationConfig = {}
const Navigator = createNavigator(
  UnauthenticatedLayout,
  Stack,
  navigationConfig
)

export default Navigator
