import { ReactNode } from 'react'
import { SiteShell } from 'app/components/site-shell'

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>
}
