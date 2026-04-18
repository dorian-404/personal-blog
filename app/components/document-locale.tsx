'use client'

import { useEffect } from 'react'
import { Locale } from 'app/i18n'

export function DocumentLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
