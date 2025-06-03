"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Map,
  Terminal,
  Scroll,
  CheckSquare,
  User,
  Users,
  BarChart3,
  ArrowLeft,
  Crown,
  Coins,
  Heart,
  Zap,
} from "lucide-react"
import { WorldExplorer } from "@/components/world-explorer"
import { CLIInterface } from "@/components/cli-interface"
import { QuestDesigner } from "@/components/quest-designer"
import { TaskManager } from "@/components/task-manager"
import { CharacterSheet } from "@/components/character-sheet"
import { SocialHub } from "@/components/social-hub"
import { Analytics } from "@/components/analytics"

interface MainDashboardProps {
  universe: string
  onChangeUniverse: () => void
}

const universeThemes = {
  fantasy: {
    name: "Fantasy Realm",
    colors: "from-purple-600 to-blue-600",
    bgPattern: "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20",
  },
  scifi: {
    name: "Sci-Fi Universe",
    colors: "from-blue-600 to-cyan-600",
    bgPattern: "bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-blue-900/20",
  },
  steampunk: {
    name: "Steampunk World",
    colors: "from-amber-600 to-orange-600",
    bgPattern: "bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-amber-900/20",
  },
  cyberpunk: {
    name: "Cyberpunk City",
    colors: "from-pink-600 to-purple-600",
    bgPattern: "bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-pink-900/20",
  },
  noir: {
    name: "Noir Detective",
    colors: "from-gray-600 to-slate-600",
    bgPattern: "bg-gradient-to-br from-gray-900/20 via-slate-900/20 to-gray-900/20",
  },
  medieval: {
    name: "Medieval Kingdom",
    colors: "from-green-600 to-emerald-600",
    bgPattern: "bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-900/20",
  },
  modern: {
    name: "Modern World",
    colors: "from-slate-600 to-gray-600",
    bgPattern: "bg-gradient-to-br from-slate-900/20 via-gray-900/20 to-slate-900/20",
  },
}

export function MainDashboard({ universe, onChangeUniverse }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState("world")
  const theme = universeThemes[universe as keyof typeof universeThemes]

  // Mock character data
  const character = {
    name: "Hero of Tasks",
    level: 12,
    class: "Productivity Mage",
    hp: 85,
    maxHp: 100,
    xp: 2450,
    xpToNext: 3000,
    gold: 1250,
    mana: 60,
  }

  return (
    <div className={`min-h-screen ${theme.bgPattern} bg-background`}>
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onChangeUniverse}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Change Universe
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold">{theme.name}</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {character.name}</p>
              </div>
            </div>

            {/* Character Stats */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">Lv.{character.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>
                  {character.hp}/{character.maxHp}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>{character.mana}/100</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span>{character.gold}</span>
              </div>
              <Badge variant="secondary" className={`bg-gradient-to-r ${theme.colors} text-white`}>
                {character.class}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7">
            <TabsTrigger value="world" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">World</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="quests" className="flex items-center space-x-2">
              <Scroll className="h-4 w-4" />
              <span className="hidden sm:inline">Quests</span>
            </TabsTrigger>
            <TabsTrigger value="character" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Character</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="cli" className="flex items-center space-x-2">
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">CLI</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="world" className="space-y-6">
            <WorldExplorer universe={universe} />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <TaskManager universe={universe} />
          </TabsContent>

          <TabsContent value="quests" className="space-y-6">
            <QuestDesigner universe={universe} />
          </TabsContent>

          <TabsContent value="character" className="space-y-6">
            <CharacterSheet universe={universe} character={character} />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <SocialHub universe={universe} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics universe={universe} />
          </TabsContent>

          <TabsContent value="cli" className="space-y-6">
            <CLIInterface universe={universe} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
