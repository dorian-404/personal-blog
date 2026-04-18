'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  articleTranslations,
  getDictionary,
  getLocalePath,
  Locale,
} from 'app/i18n'

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[14px] w-[14px]">
      <path
        d="m5 7.5 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
}

function getArticleLocalePath(pathname: string, nextLocale: Locale) {
  const frMatch = pathname.match(/^\/blog\/([^/]+)$/)
  const enMatch = pathname.match(/^\/en\/blog\/([^/]+)$/)

  if (!frMatch && !enMatch) {
    return getLocalePath(nextLocale, pathname)
  }

  const currentSlug = frMatch?.[1] || enMatch?.[1]
  const currentLocale: Locale = frMatch ? 'fr' : 'en'

  const entry = Object.values(articleTranslations).find(
    (translation) => translation[currentLocale] === currentSlug
  )

  if (!entry) {
    return getLocalePath(nextLocale, pathname)
  }

  const nextSlug = entry[nextLocale]
  return nextLocale === 'fr' ? `/blog/${nextSlug}` : `/en/blog/${nextSlug}`
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale)
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const nextLocale = locale === 'fr' ? 'en' : 'fr'
  const nextPath = useMemo(
    () => getArticleLocalePath(pathname, nextLocale),
    [nextLocale, pathname]
  )

  function handleLocaleSelect() {
    router.push(nextPath)
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative z-30">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dictionary.controls.language}
        title={dictionary.controls.language}
        onClick={() => setOpen((current) => !current)}
        className="flex h-8 min-w-[58px] items-center justify-between gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 text-[0.88rem] font-medium text-[var(--foreground)] shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-[var(--muted-soft)]"
      >
        <span>{localeLabels[locale]}</span>
        <ChevronIcon />
      </button>

      {open ? (
        <div className="absolute right-0 z-40 mt-2 rounded-[14px] border border-[var(--border)] bg-[var(--background)] p-1 shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
          <button
            type="button"
            onClick={handleLocaleSelect}
            className="flex min-w-[52px] items-center justify-center rounded-[10px] px-3 py-1.5 text-center text-[0.8rem] font-medium text-[var(--muted-strong)] hover:bg-[var(--surface)]"
          >
            <span>{localeLabels[nextLocale]}</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
