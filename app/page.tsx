"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { UniverseSelector } from "@/components/universe-selector"
import { MainDashboard } from "@/components/main-dashboard"

export default function Home() {
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background">
        {!selectedUniverse ? (
          <UniverseSelector onSelectUniverse={setSelectedUniverse} />
        ) : (
          <MainDashboard universe={selectedUniverse} onChangeUniverse={() => setSelectedUniverse(null)} />
        )}
      </div>
    </ThemeProvider>
  )
}
