export type Locale = 'fr' | 'en'

export const defaultLocale: Locale = 'fr'

export const dictionaries = {
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
    blog: {
      title: 'Blog',
      description: 'Read my writing on code, tools, interfaces, and product thinking.',
    },
    article: {
      onThisPage: 'On This Page',
      minRead: 'min read',
    },
    controls: {
      language: 'Language',
    },
    metadata: {
      siteTitle: 'Dorian Michael',
      siteDescription:
        'Personal blog about software, interfaces, tools, and product thinking.',
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
        'je construis des produits numériques avec une préférence pour la clarté, la vitesse et les interfaces calmes.',
        "j'explore l'espace entre l’ingénierie et l’écriture à travers des outils expressifs et compacts.",
        'je transforme ce site en carnet d’expériences, d’opinions et de leçons du web, surtout à travers le blog.',
      ],
      interests: 'Intérêts',
      interestItems: [
        'produits natifs à l’IA, interfaces soignées et design éditorial',
        'systèmes frontend, performance, code typé et outils de design',
        'écriture sur le goût produit, l’expérience développeur et la culture internet',
      ],
      writingAbout: "J'écris sur",
      writingBlurb:
        'des notes sur le code, les outils, les interfaces et les idées qui reviennent.',
      blogLabel: 'blog',
    },
    blog: {
      title: 'Blog',
      description:
        "Lire mes textes sur le code, les outils, les interfaces et la réflexion produit.",
    },
    article: {
      onThisPage: 'Sur cette page',
      minRead: 'min de lecture',
    },
    controls: {
      language: 'Langue',
    },
    metadata: {
      siteTitle: 'Dorian Michael',
      siteDescription:
        'Blog personnel sur le logiciel, les interfaces, les outils et la réflexion produit.',
    },
  },
} as const

export type Dictionary = (typeof dictionaries)[Locale]

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}

export const articleTranslations = {
  aboutDev: {
    fr: 'le-dev-est-foutu',
    en: 'is-dev-cooked',
  },
  staticTyping: {
    fr: 'puissance-du-typage-statique',
    en: 'power-of-static-typing',
  },
  spacesVsTabs: {
    fr: 'espaces-vs-tabs',
    en: 'spaces-vs-tabs',
  },
  vim: {
    fr: 'adopter-vim',
    en: 'embracing-vim',
  },
} as const

export function getLocalePath(locale: Locale, pathname: string) {
  if (locale === 'fr') {
    if (pathname === '/en') {
      return '/'
    }

    return pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  }

  if (pathname === '/') {
    return '/en'
  }

  return pathname.startsWith('/en') ? pathname : `/en${pathname}`
}
