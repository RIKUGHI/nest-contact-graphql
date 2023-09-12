import React from "react"

interface LayoutProps {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}

export default function DashboardLayout({
  children,
  team,
  analytics,
}: LayoutProps) {
  return (
    <section>
      Dashboard Layout{children}
      {team}
      {analytics}
    </section>
  )
}
