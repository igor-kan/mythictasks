"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Save, Play, Share, Wand2, Target, Clock, Trophy, Users, BookOpen, Zap, Settings } from "lucide-react"

interface QuestDesignerProps {
  universe: string
}

interface Quest {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  duration: string
  rewards: string[]
  objectives: string[]
  story: string
}

export function QuestDesigner({ universe }: QuestDesignerProps) {
  const [activeQuest, setActiveQuest] = useState<Quest>({
    id: "",
    title: "",
    description: "",
    type: "personal",
    difficulty: "medium",
    duration: "1 week",
    rewards: [],
    objectives: [],
    story: "",
  })

  const [savedQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "The Productivity Awakening",
      description: "Master the art of daily task completion",
      type: "personal",
      difficulty: "easy",
      duration: "2 weeks",
      rewards: ["100 XP", "Focus Potion", "Time Crystal"],
      objectives: ["Complete 7 daily tasks", "Maintain 5-day streak", "Unlock time management skill"],
      story: "In a world where chaos reigns, you must learn to harness the power of organization...",
    },
    {
      id: "2",
      title: "Guild of the Deadline Warriors",
      description: "Form a team to tackle major project milestones",
      type: "group",
      difficulty: "hard",
      duration: "1 month",
      rewards: ["500 XP", "Legendary Armor", "Guild Badge"],
      objectives: ["Form a 4-person team", "Complete 3 major milestones", "Support team members"],
      story: "The ancient guild seeks worthy warriors to face the dreaded Deadline Dragon...",
    },
  ])

  const questTypes = [
    { value: "personal", label: "Personal Quest", icon: <Target className="h-4 w-4" /> },
    { value: "group", label: "Group Adventure", icon: <Users className="h-4 w-4" /> },
    { value: "daily", label: "Daily Challenge", icon: <Clock className="h-4 w-4" /> },
    { value: "epic", label: "Epic Campaign", icon: <Trophy className="h-4 w-4" /> },
  ]

  const difficulties = [
    { value: "easy", label: "Novice", color: "bg-green-500" },
    { value: "medium", label: "Adventurer", color: "bg-yellow-500" },
    { value: "hard", label: "Hero", color: "bg-orange-500" },
    { value: "legendary", label: "Legendary", color: "bg-red-500" },
  ]

  const addObjective = () => {
    setActiveQuest((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }))
  }

  const updateObjective = (index: number, value: string) => {
    setActiveQuest((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => (i === index ? value : obj)),
    }))
  }

  const addReward = () => {
    setActiveQuest((prev) => ({
      ...prev,
      rewards: [...prev.rewards, ""],
    }))
  }

  const updateReward = (index: number, value: string) => {
    setActiveQuest((prev) => ({
      ...prev,
      rewards: prev.rewards.map((reward, i) => (i === index ? value : reward)),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Quest Designer</h2>
          <p className="text-muted-foreground">Create epic adventures and challenges for yourself and others</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Quest Library
          </Button>
          <Button>
            <Wand2 className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>

      <Tabs defaultValue="designer" className="space-y-6">
        <TabsList>
          <TabsTrigger value="designer">Quest Designer</TabsTrigger>
          <TabsTrigger value="library">My Quests</TabsTrigger>
          <TabsTrigger value="community">Community Quests</TabsTrigger>
        </TabsList>

        <TabsContent value="designer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quest Builder */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Set up the core details of your quest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Quest Title</label>
                    <Input
                      placeholder="Enter an epic quest title..."
                      value={activeQuest.title}
                      onChange={(e) => setActiveQuest((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe what this quest is about..."
                      value={activeQuest.description}
                      onChange={(e) => setActiveQuest((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Quest Type</label>
                      <Select
                        value={activeQuest.type}
                        onValueChange={(value) => setActiveQuest((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {questTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                {type.icon}
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Difficulty</label>
                      <Select
                        value={activeQuest.difficulty}
                        onValueChange={(value) => setActiveQuest((prev) => ({ ...prev, difficulty: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((diff) => (
                            <SelectItem key={diff.value} value={diff.value}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${diff.color}`}></div>
                                <span>{diff.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quest Objectives</CardTitle>
                  <CardDescription>Define what needs to be accomplished</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeQuest.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Objective ${index + 1}...`}
                        value={objective}
                        onChange={(e) => updateObjective(index, e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setActiveQuest((prev) => ({
                            ...prev,
                            objectives: prev.objectives.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addObjective}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Objective
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rewards & Incentives</CardTitle>
                  <CardDescription>Set up what players earn for completion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeQuest.rewards.map((reward, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Reward ${index + 1}...`}
                        value={reward}
                        onChange={(e) => updateReward(index, e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setActiveQuest((prev) => ({
                            ...prev,
                            rewards: prev.rewards.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addReward}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reward
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quest Narrative</CardTitle>
                  <CardDescription>Write the story that drives your quest</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Once upon a time, in a land where productivity was but a legend..."
                    value={activeQuest.story}
                    onChange={(e) => setActiveQuest((prev) => ({ ...prev, story: e.target.value }))}
                    rows={6}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Preview & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quest Preview</CardTitle>
                  <CardDescription>See how your quest will appear</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeQuest.title && (
                    <div>
                      <h3 className="font-bold text-lg">{activeQuest.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{activeQuest.description}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{questTypes.find((t) => t.value === activeQuest.type)?.label}</Badge>
                    <Badge variant="outline">
                      {difficulties.find((d) => d.value === activeQuest.difficulty)?.label}
                    </Badge>
                  </div>

                  {activeQuest.objectives.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Objectives:</h4>
                      <ul className="text-sm space-y-1">
                        {activeQuest.objectives
                          .filter((obj) => obj.trim())
                          .map((objective, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span>{objective}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {activeQuest.rewards.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Rewards:</h4>
                      <div className="flex flex-wrap gap-1">
                        {activeQuest.rewards
                          .filter((reward) => reward.trim())
                          .map((reward, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {reward}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Quest
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Test Quest
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share className="h-4 w-4 mr-2" />
                    Share Quest
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Generate objectives
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Suggest rewards
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Improve story
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedQuests.map((quest) => (
              <Card key={quest.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{quest.title}</CardTitle>
                      <CardDescription className="mt-1">{quest.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{quest.type}</Badge>
                    <Badge variant="outline">{quest.difficulty}</Badge>
                  </div>

                  <div className="text-sm">
                    <p>
                      <strong>Duration:</strong> {quest.duration}
                    </p>
                    <p>
                      <strong>Objectives:</strong> {quest.objectives.length}
                    </p>
                    <p>
                      <strong>Rewards:</strong> {quest.rewards.length}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Quests</h3>
            <p className="text-muted-foreground mb-6">Discover and play quests created by other adventurers</p>
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Community
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
