"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Users,
  Sword,
  Shield,
  GemIcon as Treasure,
  Eye,
  Navigation,
  Compass,
  Mountain,
  Trees,
  Castle,
  Home,
  Scroll,
} from "lucide-react"

interface WorldExplorerProps {
  universe: string
}

interface Location {
  id: string
  name: string
  type: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  npcs: number
  quests: number
  x: number
  y: number
}

const getUniverseLocations = (universe: string): Location[] => {
  const baseLocations = [
    {
      id: "home",
      name: "Home Base",
      type: "Safe Zone",
      description: "Your personal sanctuary and starting point",
      icon: <Home className="h-5 w-5" />,
      unlocked: true,
      progress: 100,
      npcs: 3,
      quests: 2,
      x: 50,
      y: 50,
    },
    {
      id: "tavern",
      name: "The Gathering Place",
      type: "Social Hub",
      description: "Meet other adventurers and form parties",
      icon: <Users className="h-5 w-5" />,
      unlocked: true,
      progress: 75,
      npcs: 8,
      quests: 5,
      x: 30,
      y: 40,
    },
    {
      id: "training",
      name: "Training Grounds",
      type: "Skill Development",
      description: "Hone your abilities and learn new techniques",
      icon: <Sword className="h-5 w-5" />,
      unlocked: true,
      progress: 60,
      npcs: 4,
      quests: 7,
      x: 70,
      y: 30,
    },
    {
      id: "market",
      name: "Marketplace",
      type: "Commerce",
      description: "Trade resources and acquire new equipment",
      icon: <Treasure className="h-5 w-5" />,
      unlocked: true,
      progress: 40,
      npcs: 6,
      quests: 3,
      x: 20,
      y: 70,
    },
    {
      id: "wilderness",
      name: "Wild Frontier",
      type: "Adventure Zone",
      description: "Dangerous but rewarding exploration area",
      icon: <Trees className="h-5 w-5" />,
      unlocked: false,
      progress: 0,
      npcs: 2,
      quests: 12,
      x: 80,
      y: 80,
    },
    {
      id: "fortress",
      name: "Ancient Fortress",
      type: "Dungeon",
      description: "A mysterious stronghold with powerful challenges",
      icon: <Castle className="h-5 w-5" />,
      unlocked: false,
      progress: 0,
      npcs: 1,
      quests: 8,
      x: 90,
      y: 20,
    },
  ]

  // Customize names based on universe
  switch (universe) {
    case "scifi":
      baseLocations[1].name = "Space Station Cantina"
      baseLocations[2].name = "Training Simulator"
      baseLocations[3].name = "Trade Depot"
      baseLocations[4].name = "Uncharted Sector"
      baseLocations[5].name = "Derelict Ship"
      break
    case "cyberpunk":
      baseLocations[1].name = "Neon Bar"
      baseLocations[2].name = "VR Training Pod"
      baseLocations[3].name = "Black Market"
      baseLocations[4].name = "The Undercity"
      baseLocations[5].name = "Corporate Tower"
      break
    case "steampunk":
      baseLocations[1].name = "Airship Dock"
      baseLocations[2].name = "Workshop"
      baseLocations[3].name = "Steam Bazaar"
      baseLocations[4].name = "Clockwork Forest"
      baseLocations[5].name = "Sky Fortress"
      break
  }

  return baseLocations
}

export function WorldExplorer({ universe }: WorldExplorerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [locations] = useState(() => getUniverseLocations(universe))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw paths between unlocked locations
    const unlockedLocations = locations.filter((loc) => loc.unlocked)
    ctx.strokeStyle = "#4f46e5"
    ctx.lineWidth = 2
    for (let i = 0; i < unlockedLocations.length - 1; i++) {
      const from = unlockedLocations[i]
      const to = unlockedLocations[i + 1]
      ctx.beginPath()
      ctx.moveTo((from.x / 100) * canvas.width, (from.y / 100) * canvas.height)
      ctx.lineTo((to.x / 100) * canvas.width, (to.y / 100) * canvas.height)
      ctx.stroke()
    }

    // Draw locations
    locations.forEach((location) => {
      const x = (location.x / 100) * canvas.width
      const y = (location.y / 100) * canvas.height

      // Draw location circle
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, 2 * Math.PI)
      ctx.fillStyle = location.unlocked ? "#10b981" : "#6b7280"
      ctx.fill()
      ctx.strokeStyle = location.unlocked ? "#059669" : "#4b5563"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw progress ring
      if (location.unlocked && location.progress > 0) {
        ctx.beginPath()
        ctx.arc(x, y, 25, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * location.progress) / 100)
        ctx.strokeStyle = "#f59e0b"
        ctx.lineWidth = 4
        ctx.stroke()
      }

      // Draw location name
      ctx.fillStyle = "#f8fafc"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(location.name, x, y + 40)
    })

    // Draw player position (always at home base)
    const homeBase = locations.find((loc) => loc.id === "home")
    if (homeBase) {
      const x = (homeBase.x / 100) * canvas.width
      const y = (homeBase.y / 100) * canvas.height

      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = "#ef4444"
      ctx.fill()
      ctx.strokeStyle = "#dc2626"
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [locations])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / canvas.offsetWidth) * 100
    const y = ((event.clientY - rect.top) / canvas.offsetHeight) * 100

    // Find clicked location
    const clickedLocation = locations.find((location) => {
      const distance = Math.sqrt(Math.pow(x - location.x, 2) + Math.pow(y - location.y, 2))
      return distance < 8 // 8% tolerance
    })

    if (clickedLocation) {
      setSelectedLocation(clickedLocation)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">World Explorer</h2>
          <p className="text-muted-foreground">Navigate your adventure world and discover new locations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Compass className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Click locations to explore</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D World Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Interactive World Map</span>
              </CardTitle>
              <CardDescription>Explore your universe and unlock new areas by completing tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full h-96 border rounded-lg cursor-pointer bg-slate-900"
                  style={{ maxWidth: "100%" }}
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Unlocked</span>
                    <div className="w-3 h-3 bg-gray-500 rounded-full ml-4"></div>
                    <span>Locked</span>
                    <div className="w-3 h-3 bg-red-500 rounded-full ml-4"></div>
                    <span>You</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="h-5 w-5" />
                <span>Current Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLocation ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">{selectedLocation.icon}</div>
                    <div>
                      <h3 className="font-semibold">{selectedLocation.name}</h3>
                      <Badge variant="secondary">{selectedLocation.type}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>

                  {selectedLocation.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exploration Progress</span>
                        <span>{selectedLocation.progress}%</span>
                      </div>
                      <Progress value={selectedLocation.progress} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedLocation.npcs} NPCs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Scroll className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedLocation.quests} Quests</span>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!selectedLocation.unlocked}>
                    {selectedLocation.unlocked ? "Enter Location" : "Locked"}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Click on a location in the map to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mountain className="h-4 w-4 mr-2" />
                Fast Travel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                View Inventory
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Treasure className="h-4 w-4 mr-2" />
                Collect Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
