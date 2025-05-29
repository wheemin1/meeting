"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en") // 기본값을 영어로 변경

  useEffect(() => {
    try {
      // 컴포넌트가 마운트된 후에 localStorage에서 언어 설정을 확인
      const savedLanguage = localStorage.getItem("language") as Language
      console.log("Loaded language from localStorage:", savedLanguage)
      if (savedLanguage && (savedLanguage === "ko" || savedLanguage === "en")) {
        setLanguageState(savedLanguage)
      } else {
        // 저장된 언어가 없으면 기본값 영어로 설정하고 저장
        localStorage.setItem("language", "en")
      }
    } catch (error) {
      console.error("Error loading language:", error)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    console.log("Setting language to:", lang) // 디버깅용
    try {
      setLanguageState(lang)
      localStorage.setItem("language", lang)
      // 새로고침 없이 언어 변경 - window.location.reload() 제거
    } catch (error) {
      console.error("Error setting language:", error)
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
