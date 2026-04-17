import './global.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { LanguageProvider } from './components/language-provider'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Dorian Michael',
    template: '%s | Dorian Michael',
  },
  description: 'Personal blog about software, interfaces, tools, and product thinking.',
  openGraph: {
    title: 'Dorian Michael',
    description: 'Personal blog about software, interfaces, tools, and product thinking.',
    url: baseUrl,
    siteName: 'Dorian Michael',
    locale: 'en_US',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cx(
          workSans.className,
          'text-[14px] leading-7 antialiased transition-colors'
        )}
      >
        <LanguageProvider>
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
          <main className="mx-4 mt-8 flex min-w-0 max-w-3xl flex-auto flex-col px-2 md:mx-auto md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
}
