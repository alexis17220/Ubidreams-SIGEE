import React from 'react'

// Libraries
import { cloneDeep, filter, keys, isObject, isNil } from 'lodash'

/**
 * Filtre les données en fonction du motif renseigné dans le champs de recherche
 *
 * Retourne un tableau contenant toutes les données en fonction de la recherche de l'utilisateur
 * @return {array}
 */
export const searchData = (data, searchText) => {
  searchText = searchText.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')

  // Création de l'expression rationnelle avec la recherche de l'utilisateur
  const regExp = new RegExp(searchText, 'gi')

  // Données filtrées sur la recherche
  const filteredData = filter(cloneDeep(data), (element) => {
    let found = false

    if (isObject(element)) {
      // Pour chaque champs recherche avec le mot clé
      keys(element).forEach((key, index) => {
        if (!isNil(element[key])) {
          found = found || JSON.stringify(element[key]).match(regExp)
        }
      })
    } else {
      found = element.match(regExp)
    }

    return found
  })

  return filteredData
}
