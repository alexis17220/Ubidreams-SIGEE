// Libraries
import { defaultTo, merge, forEach } from 'lodash'

const queryString = require('query-string')

// Création d'un élément stackable
export const prepareStackElement = ({ screen, ...configs }) => {
  // Valeurs par défaut de navigation
  const defaultConfig = {
    path: '',
    navigationOptions: {
      title: process.env.REACT_APP_WEBSITE_NAME,
    },
  }

  // Merge des valeurs par défaut
  const screenConfig = merge(defaultConfig, configs)

  // Application des configurations inexistantes du composant
  forEach(screenConfig, (value, config) => {
    screen[config] = defaultTo(screen[config], value)
  })

  return screen
}

// Création d'une stack de navigation
export const prepareStack = (stackElements) => {
  // Création de la stack de navigation
  const navigationStack = {}

  // Ajout des écrans à la stack de navigation
  forEach(stackElements, (params, routeName) => {
    navigationStack[routeName] = prepareStackElement(params)
  })

  return navigationStack
}

export const matchPathAndParams = (a, b) => {
  if (a.path !== b.path) {
    return false
  }
  if (queryString.stringify(a.params) !== queryString.stringify(b.params)) {
    return false
  }
  return true
}
