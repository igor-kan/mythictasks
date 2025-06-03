"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface CLIInterfaceProps {
  universe: string
}

interface CommandOutput {
  command: string
  output: string
  type: "success" | "error" | "info"
  timestamp: Date
}

const COMMANDS = {
  help: {
    description: "Show available commands",
    usage: "mt help [command]",
    examples: ["mt help", "mt help task"],
  },
  task: {
    description: "Manage tasks",
    usage: "mt task <action> [options]",
    examples: [
      'mt task add "Complete project" --due tomorrow',
      "mt task list --status pending",
      "mt task complete 123",
    ],
  },
  habit: {
    description: "Track habits",
    usage: "mt habit <action> [options]",
    examples: ["mt habit track exercise --positive", "mt habit list", "mt habit streak meditation"],
  },
  quest: {
    description: "Manage quests",
    usage: "mt quest <action> [options]",
    examples: ['mt quest start "The Productivity Challenge"', "mt quest list --active", "mt quest complete 456"],
  },
  stats: {
    description: "View statistics",
    usage: "mt stats [period]",
    examples: ["mt stats", "mt stats --weekly", "mt stats --monthly"],
  },
  universe: {
    description: "Switch universe",
    usage: "mt universe <name>",
    examples: ["mt universe fantasy", "mt universe cyberpunk", "mt universe list"],
  },
  party: {
    description: "Manage party/guild",
    usage: "mt party <action> [options]",
    examples: ["mt party invite @username", "mt party list", "mt party quest start"],
  },
  config: {
    description: "Configuration management",
    usage: "mt config <action> [options]",
    examples: ["mt config set theme dark", "mt config get", "mt config reset"],
  },
}

export function CLIInterface({ universe }: CLIInterfaceProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "mt --version",
      output: "MythicTasks CLI v2.1.0\nWelcome to the command-line interface for epic productivity!",
      type: "info",
      timestamp: new Date()
    }
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    // Parse command
    const parts = trimmedCommand.split(" ")
    const baseCommand = parts[0]
    const subCommand = parts[1]
    const args = parts.slice(2)

    let output = ""
    let type: "success" | "error" | "info" = "info"

    // Handle different commands
    if (baseCommand === "mt" || baseCommand === "mythictasks") {
      switch (subCommand) {
        case "help":
          if (args[0] && COMMANDS[args[0] as keyof typeof COMMANDS]) {
            const cmd = COMMANDS[args[0] as keyof typeof COMMANDS]
            output = `${args[0].toUpperCase()}\n\n${cmd.description}\n\nUsage: ${cmd.usage}\n\nExamples:\n${cmd.examples.map(ex => `  ${ex}`).join('\n')}`
          } else {
            output = `MythicTasks CLI - Available Commands:\n\n${Object.entries(COMMANDS).map(([name, cmd]) => `  ${name.padEnd(12)} ${cmd.description}`).join('\n')}\n\nUse 'mt help <command>' for detailed information.`
          }
          type = "info"
          break

        case "task":
          switch (args[0]) {
            case "add":
              output = `✓ Task created: "${args.slice(1).join(' ').replace(/"/g, '')}"\n  ID: TSK-${Math.random().toString(36).substr(2, 6).toUpperCase()}\n  XP Reward: 25\n  Gold Reward: 10`
              type = "success"
              break
            case "list":
              output = `Active Tasks:\n\n  TSK-ABC123  Complete project documentation     Due: Tomorrow\n  TSK-DEF456  Review code changes               Due: Today\n  TSK-GHI789  Update user interface             Due: Next week\n\n3 tasks found.`
              type = "info"
              break
            case "complete":
              output = `✓ Task completed!\n  +50 XP earned\n  +25 Gold earned\n  Streak bonus: +10 XP`
              type = "success"
              break
            default:
              output = `Usage: mt task <add|list|complete|delete> [options]\nUse 'mt help task' for more information.`
              type = "error"
          }
          break

        case "habit":
          switch (args[0]) {
            case "track":
              output = `✓ Habit tracked: "${args[1]}"\n  Streak: 7 days\n  +15 XP earned\n  +5 Gold earned`
              type = "success"
              break
            case "list":
              output = `Active Habits:\n\n  Exercise        7 day streak    +15 XP/day\n  Meditation      3 day streak    +10 XP/day\n  Reading         12 day streak   +20 XP/day\n\n3 habits tracked.`
              type = "info"
              break
            default:
              output = `Usage: mt habit <track|list|streak> [options]\nUse 'mt help habit' for more information.`
              type = "error"
          }
          break

        case "quest":
          switch (args[0]) {
            case "start":
              output = `🎯 Quest started: "${args.slice(1).join(' ').replace(/"/g, '')}"\n  Difficulty: Medium\n  Duration: 1 week\n  Potential XP: 500\n  Potential Gold: 200`
              type = "success"
              break
            case "list":
              output = `Active Quests:\n\n  QST-001  The Productivity Challenge    Progress: 60%\n  QST-002  Master of Time Management    Progress: 25%\n  QST-003  Social Butterfly            Progress: 80%\n\n3 active quests.`
              type = "info"
              break
            default:
              output = `Usage: mt quest <start|list|complete|abandon> [options]\nUse 'mt help quest' for more information.`
              type = "error"
          }
          break

        case "stats":
          output = `📊 Your Statistics (${args[0] === '--weekly' ? 'This Week' : args[0] === '--monthly' ? 'This Month' : 'All Time'}):\n\n  Level: 12\n  Total XP: 15,420\n  Gold: 1,250\n  Tasks Completed: 156\n  Quests Completed: 8\n  Current Streak: 7 days\n  Longest Streak: 23 days\n\n  Class: Productivity Mage\n  Next Level: 580 XP remaining`
          type = "info"
          break

        case "universe":
          if (args[0] === "list") {
            output = `Available Universes:\n\n  fantasy     🧝 Fantasy Realm\n  scifi       🚀 Sci-Fi Universe\n  cyberpunk   💾 Cyberpunk City\n  steampunk   🛠 Steampunk World\n  noir        🕵️ Noir Detective\n  medieval    🏰 Medieval Kingdom\n  modern      🌍 Modern World\n\nCurrent: ${universe}`
            type = "info"
          } else if (args[0]) {
            output = `🌍 Universe switched to: ${args[0]}\nReloading interface...`
            type = "success"
          } else {
            output = `Current universe: ${universe}\nUse 'mt universe list' to see available universes.`
            type = "info"
          }
          break

        case "party":
          switch (args[0]) {
            case "invite":
              output = `📨 Party invitation sent to ${args[1]}\nWaiting for response...`
              type = "success"
              break
            case "list":
              output = `Party Members:\n\n  @alice_codes     Level 15  Warrior\n  @bob_designs     Level 11  Mage\n  @charlie_writes  Level 13  Rogue\n\n3 members in party.`
              type = "info"
              break
            default:
              output = `Usage: mt party <invite|list|leave|quest> [options]\nUse 'mt help party' for more information.`
              type = "error"
          }
          break

        case "config":
          switch (args[0]) {
            case "set":
              output = `✓ Configuration updated: ${args[1]} = ${args[2]}`
              type = "success"
              break
            case "get":
              output = `Current Configuration:\n\n  theme: dark\n  universe: ${universe}\n  notifications: enabled\n  sound: enabled\n  auto_save: true`
              type = "info"
              break
            default:
              output = `Usage: mt config <set|get|reset> [options]\nUse 'mt help config' for more information.`
              type = "error"
          }
          break

        case "--version":
          output = `MythicTasks CLI v2.1.0\nBuild: 2024.01.15\nUniverse: ${universe}\nNode.js: v18.17.0`
          type = "info"
          break

        default:
          output = `Unknown command: ${subCommand}\nUse 'mt help' to see available commands.`
          type = "error"
      }
    } else {
      output = `Command not found: ${baseCommand}\nDid you mean 'mt ${baseCommand}'?`
      type = "error"
    }

    // Add to history
    setHistory(prev => [...prev, {
      command: trimmedCommand,
      output,
      type,
      timestamp: new Date()
    }])

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
