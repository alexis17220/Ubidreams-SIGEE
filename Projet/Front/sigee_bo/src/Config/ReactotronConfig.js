import Immutable from 'seamless-immutable'
import Reactotron from 'reactotron-react-js'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import apiSaucePlugin from 'reactotron-apisauce'

if (process.env.NODE_ENV !== 'production') {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron.configure({
    name: 'App',
  })
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .use(apiSaucePlugin())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  // Display normal console a build production
  console.tron = console
}
