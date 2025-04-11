"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User, Send } from "lucide-react"
import { saveChatEntry } from "@/utils/chatHistory"

interface Message {
  role: "user" | "assistant"
  content: string
  source?: "langchain" | "ollama"
}

export function ChatBot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    let responseText = ""

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2:1b",
          prompt: input,
          stream: true,
          options: { temperature: 0.7, top_k: 40, top_p: 0.9 },
        }),
      })

      if (!response.ok || !response.body) throw new Error("Failed to get response from Ollama")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Add initial empty assistant message
      let aiMessageIndex = -1
      setMessages((prev) => {
        const newMessages = [...prev, { role: "assistant", content: "", source: "ollama" }]
        aiMessageIndex = newMessages.length - 1
        return newMessages
      })

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (!line) continue
          const data = JSON.parse(line)
          responseText += data.response

          // Update assistant message content
          setMessages((prev) => {
            const newMessages = [...prev]
            if (aiMessageIndex >= 0) {
              newMessages[aiMessageIndex] = {
                ...newMessages[aiMessageIndex],
                content: responseText,
              }
            }
            return newMessages
          })
        }
      } // ✅ <-- this was missing!

      // ✅ Save once after full response is ready
      saveChatEntry({
        feature: "Chat Bot",
        user: input,
        ai: responseText,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error getting Ollama response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          source: "ollama",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="w-5 h-5" /> AI Chat Bot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <Avatar>
                <AvatarFallback>
                  {msg.role === "user" ? <User /> : <Bot />}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl max-w-[80%]">
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4 mr-1" /> Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
