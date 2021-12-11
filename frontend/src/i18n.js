import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'



// available languages for the website
const availableLanguages = ['kr', 'en']

// fallback language for the website
const fallbackLanguages = 'kr'

// i18next options
const options = {
    supportedLngs: availableLanguages,
    fallbackLng: fallbackLanguages,
    debug: false,
    // Options for language detector
    detection: {
        order: ['localStorage'],
        caches: ['localStorage'],
    },
    // react: { useSuspense: false },
    backend: {
        loadPath: '/assets/locales/{{lng}}.json',
    },
}


// initiating i18next
i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options)



export default i18next
export { availableLanguages }