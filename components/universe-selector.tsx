"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sword, Rocket, Cog, Eye, Cpu, Castle, Globe, Sparkles, Zap, Shield } from "lucide-react"

interface Universe {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  theme: string
  features: string[]
  color: string
}

const universes: Universe[] = [
  {
    id: "fantasy",
    name: "Fantasy Realm",
    description: "Medieval magic, dragons, and epic quests await",
    icon: <Sword className="h-8 w-8" />,
    theme: "Swords & Sorcery",
    features: ["Magic System", "Guild Quests", "Dragon Battles"],
    color: "from-purple-600 to-blue-600",
  },
  {
    id: "scifi",
    name: "Sci-Fi Universe",
    description: "Space exploration, AI companions, and tech advancement",
    icon: <Rocket className="h-8 w-8" />,
    theme: "Space Opera",
    features: ["Tech Trees", "Space Exploration", "AI Companions"],
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "steampunk",
    name: "Steampunk World",
    description: "Victorian machinery, airships, and clockwork wonders",
    icon: <Cog className="h-8 w-8" />,
    theme: "Industrial Revolution",
    features: ["Invention System", "Airship Travel", "Resource Crafting"],
    color: "from-amber-600 to-orange-600",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk City",
    description: "Neon-lit streets, hacking challenges, and corporate espionage",
    icon: <Cpu className="h-8 w-8" />,
    theme: "Digital Dystopia",
    features: ["Hacking Minigames", "Reputation System", "Virtual Reality"],
    color: "from-pink-600 to-purple-600",
  },
  {
    id: "noir",
    name: "Noir Detective",
    description: "1940s mysteries, investigation tasks, and shadowy secrets",
    icon: <Eye className="h-8 w-8" />,
    theme: "Detective Mystery",
    features: ["Investigation System", "Clue Collection", "Case Files"],
    color: "from-gray-600 to-slate-600",
  },
  {
    id: "medieval",
    name: "Medieval Kingdom",
    description: "Historical accuracy, trade routes, and political intrigue",
    icon: <Castle className="h-8 w-8" />,
    theme: "Historical Simulation",
    features: ["Trade System", "Seasonal Cycles", "Political Alliances"],
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "modern",
    name: "Modern World",
    description: "Subtle gamification for real-world productivity",
    icon: <Globe className="h-8 w-8" />,
    theme: "Contemporary Life",
    features: ["Location-Based", "Minimalist Design", "Real-World Focus"],
    color: "from-slate-600 to-gray-600",
  },
]

interface UniverseSelectorProps {
  onSelectUniverse: (universe: string) => void
}

export function UniverseSelector({ onSelectUniverse }: UniverseSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-purple-400 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MythicTasks
            </h1>
            <Sparkles className="h-12 w-12 text-purple-400 ml-4" />
          </div>
          <p className="text-xl text-gray-300 mb-4">Transform your productivity into an epic adventure</p>
          <p className="text-lg text-gray-400">Choose your universe and begin your legendary journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {universes.map((universe) => (
            <Card
              key={universe.id}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500 bg-slate-800/50 backdrop-blur-sm"
              onClick={() => onSelectUniverse(universe.id)}
            >
              <CardHeader className="text-center">
                <div
                  className={`mx-auto mb-4 p-4 rounded-full bg-gradient-to-r ${universe.color} text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {universe.icon}
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {universe.name}
                </CardTitle>
                <CardDescription className="text-gray-400">{universe.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-3">
                    {universe.theme}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {universe.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Zap className="h-3 w-3 text-yellow-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full bg-gradient-to-r ${universe.color} hover:opacity-90 transition-opacity`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectUniverse(universe.id)
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Enter Realm
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">What makes MythicTasks special?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-400">3D World Exploration</h4>
                <p className="text-sm">
                  Navigate immersive environments, discover hidden areas, and interact with NPCs
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-400">CLI Power Tools</h4>
                <p className="text-sm">Full terminal interface for developers and power users</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-400">Quest Designer</h4>
                <p className="text-sm">Create and share custom adventures with full DM tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
