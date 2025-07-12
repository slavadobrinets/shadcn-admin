import React, { createContext, useContext, useEffect, useState } from 'react'
import { LanguageCode, languages } from '@/config/languages'
import i18n from '@/i18n'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, _setLanguage] = useState<LanguageCode>(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageCode
    return languages.some(([code]) => code === savedLanguage) ? savedLanguage : 'ru'
  })

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
    i18n.changeLanguage(language)
  }, [language])

  const setLanguage = (language: LanguageCode) => {
    localStorage.setItem('language', language)
    _setLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
