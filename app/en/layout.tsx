import { ReactNode } from 'react'
import { SiteShell } from 'app/components/site-shell'

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>
}
