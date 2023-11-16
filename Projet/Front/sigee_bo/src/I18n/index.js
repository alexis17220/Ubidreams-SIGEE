import I18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import moment from 'moment'
import 'moment/locale/fr'

// Configurations
I18n.use(LanguageDetector).init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  react: {
    wait: true,
  },
  lng: 'fr',
  resources: {
    fr: {
      translation: require('./languages/fr.json'),
    },
  },
})

// Locales moment js
const locale = I18n.language || window.localStorage.i18nextLng

// Set the locales for momentJS
moment.locale(locale)

export default I18n
