"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Download, Bot, User } from "lucide-react"

interface ChatEntry {
  feature: string
  user: string
  ai: string
  timestamp?: string
}

export function ChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredHistory, setFilteredHistory] = useState<ChatEntry[]>([])
  const [selectedFeature, setSelectedFeature] = useState("all")

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory")
    const parsedHistory = storedHistory ? JSON.parse(storedHistory) : []
    setChatHistory(parsedHistory)
    setFilteredHistory(parsedHistory)
  }, [])

  useEffect(() => {
    let filtered = chatHistory

    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.ai.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedFeature !== "all") {
      filtered = filtered.filter((entry) => entry.feature === selectedFeature)
    }

    setFilteredHistory(filtered)
  }, [searchTerm, selectedFeature, chatHistory])

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your chat history? This action cannot be undone.")) {
      setChatHistory([])
      setFilteredHistory([])
      localStorage.removeItem("chatHistory")
    }
  }

  const downloadHistory = () => {
    const historyJson = JSON.stringify(chatHistory, null, 2)
    const blob = new Blob([historyJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "chat_history.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const features = ["all", ...Array.from(new Set(chatHistory.map((entry) => entry.feature)))]

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Chat History</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadHistory} disabled={chatHistory.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={clearHistory} disabled={chatHistory.length === 0}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search chat history..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs value={selectedFeature} onValueChange={setSelectedFeature}>
                <TabsList className="grid grid-cols-3 sm:grid-cols-5">
                  {features.map((feature) => (
                    <TabsTrigger key={feature} value={feature}>
                      {feature === "all" ? "All" : feature}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No chat history found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((entry, index) => (
                  <Card key={index}>
                    <CardHeader className="bg-muted/50 py-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{entry.feature}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="p-4 border-b">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm mb-1">User</div>
                            <div className="text-sm">{entry.user}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm mb-1">AI</div>
                            <div className="text-sm whitespace-pre-line">{entry.ai}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
