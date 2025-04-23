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
    <div className="space-y-6 p-6 bg-gradient-to-r from-purple-500 to-indigo-600">
      <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4">
          <CardTitle className="text-xl font-semibold">Chat History</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadHistory} disabled={chatHistory.length === 0} className="bg-green-500 hover:bg-green-600 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={clearHistory} disabled={chatHistory.length === 0} className="bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search chat history..."
                  className="pl-8 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs value={selectedFeature} onValueChange={setSelectedFeature}>
                <TabsList className="grid grid-cols-3 sm:grid-cols-5">
                  {features.map((feature) => (
                    <TabsTrigger key={feature} value={feature} className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg text-indigo-700">
                      {feature === "all" ? "All" : feature}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50 text-indigo-500" />
                <p>No chat history found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((entry, index) => (
                  <Card key={index} className="border-2 border-indigo-300 shadow-md rounded-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-200 to-indigo-300 py-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-indigo-700">{entry.feature}</div>
                        <div className="text-xs text-gray-500">{formatDate(entry.timestamp)}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <User className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm mb-1 text-indigo-600">User</div>
                            <div className="text-sm text-gray-700">{entry.user}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <Bot className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm mb-1 text-indigo-600">AI</div>
                            <div className="text-sm text-gray-700 whitespace-pre-line">{entry.ai}</div>
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

export default ChatHistory;