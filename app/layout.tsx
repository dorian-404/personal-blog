import './global.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { dictionaries } from './i18n'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: dictionaries.fr.metadata.siteTitle,
    template: `%s | ${dictionaries.fr.metadata.siteTitle}`,
  },
  description: dictionaries.fr.metadata.siteDescription,
  openGraph: {
    title: dictionaries.fr.metadata.siteTitle,
    description: dictionaries.fr.metadata.siteDescription,
    url: baseUrl,
    siteName: dictionaries.fr.metadata.siteTitle,
    locale: 'fr_CA',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cx(
          workSans.className,
          'text-[14px] leading-7 antialiased transition-colors'
        )}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const storedTheme = localStorage.getItem('theme')
                const theme = storedTheme === 'light' || storedTheme === 'dark'
                  ? storedTheme
                  : window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(theme)
              })()
            `,
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
