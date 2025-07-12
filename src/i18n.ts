import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Импорт файлов переводов
import commonRu from './locales/ru/common.json'
import commonEn from './locales/en/common.json'

// Ресурсы с переводами
const resources = {
  ru: {
    common: commonRu
  },
  en: {
    common: commonEn
  }
}

i18n
  // Определение языка браузера
  .use(LanguageDetector)
  // Интеграция с React
  .use(initReactI18next)
  // Инициализация i18next
  .init({
    resources,
    // Язык по умолчанию
    fallbackLng: 'ru',
    // Пространство имен по умолчанию
    defaultNS: 'common',
    // Отладка
    debug: process.env.NODE_ENV === 'development',
    // Опции интерполяции
    interpolation: {
      escapeValue: false // не экранировать HTML
    }
  })

export default i18n
