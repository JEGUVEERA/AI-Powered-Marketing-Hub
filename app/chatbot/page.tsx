"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, Send } from "lucide-react"
import { saveChatEntry } from "@/utils/chatHistory"
import clsx from "clsx"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: string
  source?: "langchain" | "ollama"
}

export function ChatBot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [typingEffect, setTypingEffect] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typingEffect])

  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const timestamp = new Date().toISOString()
    const userMessage: Message = { role: "user", content: input, timestamp }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setTypingEffect("")

    let responseText = ""
    let fullText = ""

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2:1b",
          prompt: input,
          stream: true,
          options: { temperature: 0.7, top_k: 40, top_p: 0.9 }
        })
      })

      if (!response.ok || !response.body) throw new Error("Failed to get response from Ollama")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      const aiTimestamp = new Date().toISOString()

      setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: aiTimestamp, source: "ollama" }])
      const index = messages.length + 1

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (!line) continue
          const data = JSON.parse(line)
          responseText += data.response
          fullText += data.response

          setTypingEffect(data.response)

          setMessages((prev) => {
            const updated = [...prev]
            if (index < updated.length) {
              updated[index] = {
                ...updated[index],
                content: fullText
              }
            }
            return updated
          })
        }
      }

      saveChatEntry({
        feature: "Chat Bot",
        user: input,
        ai: fullText,
        timestamp: aiTimestamp
      })
    } catch (error) {
      console.error("Error getting Ollama response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
          source: "ollama"
        }
      ])
    } finally {
      setIsLoading(false)
      setTypingEffect("")
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10 rounded-3xl shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-yellow-200" /> AI Chat Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4">
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={clsx("flex gap-3 items-end", {
                "justify-end": msg.role === "user",
                "justify-start": msg.role === "assistant"
              })}
            >
              {msg.role === "assistant" && (
                <Avatar className="bg-gradient-to-r from-green-400 to-blue-500">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={clsx(
                  "rounded-xl px-4 py-3 text-sm max-w-[80%] relative whitespace-pre-wrap transition-all duration-300",
                  {
                    "bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-br-none": msg.role === "user",
                    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none":
                      msg.role === "assistant"
                  }
                )}
              >
                {msg.content}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {formatTime(msg.timestamp)}
                </div>
              </div>

              {msg.role === "user" && (
                <Avatar className="bg-gradient-to-r from-yellow-400 to-red-500">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {typingEffect && (
            <div className="flex items-start gap-3">
              <Avatar className="bg-gradient-to-r from-green-400 to-blue-500">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-2 text-sm max-w-[80%]">
                <span className="animate-pulse inline-block">{typingEffect}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex gap-3 items-center">
          <Input
            className="flex-1 rounded-full px-4 py-3 text-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white flex items-center gap-2"
          >
            <Send className="w-5 h-5" /> Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChatBot;