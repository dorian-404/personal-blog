'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type Locale = 'en' | 'fr'

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE: Locale = 'fr'

const dictionaries = {
  en: {
    nav: {
      home: 'home',
      blog: 'blog',
      projects: 'projects',
    },
    footer: {
      rss: 'rss',
      github: 'github',
      source: 'view source',
      rights: 'All rights reserved.',
    },
    home: {
      role: 'developer, product, engineer, writer',
      stints: 'Stints',
      stintsItems: [
        'building digital products with a bias for clarity, speed, and quiet interfaces.',
        'exploring the space between engineering and writing through tools that feel expressive and compact.',
        'turning this site into a notebook of experiments, opinions, and lessons from the web, mostly through the blog.',
      ],
      interests: 'Interests',
      interestItems: [
        'AI-native products, careful interfaces, and editorial design',
        'frontend systems, performance, type-safe code, and design tools',
        'writing on product taste, developer experience, and internet culture',
      ],
      writingAbout: 'Writing about',
      writingBlurb: 'notes on code, tools, interfaces, and recurring ideas.',
      blogLabel: 'blog',
    },
    article: {
      onThisPage: 'On This Page',
      minRead: 'min read',
    },
    controls: {
      language: 'Language',
      english: 'English',
      french: 'French',
    },
  },
  fr: {
    nav: {
      home: 'accueil',
      blog: 'blog',
      projects: 'projets',
    },
    footer: {
      rss: 'rss',
      github: 'github',
      source: 'voir le code',
      rights: 'Tous droits réservés.',
    },
    home: {
      role: 'développeur, produit, ingénieur, auteur',
      stints: 'Parcours',
      stintsItems: [
        "je construis des produits numériques avec une préférence pour la clarté, la vitesse et les interfaces calmes.",
        "j'explore l'espace entre l’ingénierie et l’écriture à travers des outils expressifs et compacts.",
        "je transforme ce site en carnet d’expériences, d’opinions et de leçons du web, surtout à travers le blog.",
      ],
      interests: 'Intérêts',
      interestItems: [
        'produits natifs à l’IA, interfaces soignées et design éditorial',
        'systèmes frontend, performance, code typé et outils de design',
        'écriture sur le goût produit, l’expérience développeur et la culture internet',
      ],
      writingAbout: "J'écris sur",
      writingBlurb: 'des notes sur le code, les outils, les interfaces et les idées qui reviennent.',
      blogLabel: 'blog',
    },
    article: {
      onThisPage: 'Sur cette page',
      minRead: 'min de lecture',
    },
    controls: {
      language: 'Langue',
      english: 'Anglais',
      french: 'Français',
    },
  },
} as const

type Dictionary = (typeof dictionaries)[Locale]

type LanguageContextValue = {
  dictionary: Dictionary
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'fr') {
    return stored
  }

  return DEFAULT_LOCALE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const initialLocale = getInitialLocale()
    setLocaleState(initialLocale)
    document.documentElement.lang = initialLocale
  }, [])

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale)
    window.localStorage.setItem(STORAGE_KEY, nextLocale)
    document.documentElement.lang = nextLocale
  }

  const value = useMemo(
    () => ({
      dictionary: dictionaries[locale],
      locale,
      setLocale,
    }),
    [locale]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
