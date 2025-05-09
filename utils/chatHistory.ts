//utils/chatHistory.ts
// This file contains functions to save and retrieve chat history from local storage
export interface ChatEntry {
    feature: string
    user: string
    ai: string
    timestamp?: string
  }
  
  export function saveChatEntry(entry: ChatEntry) {
    try {
      const existing = JSON.parse(localStorage.getItem("chatHistory") || "[]")
      const updated = [entry, ...existing]
      localStorage.setItem("chatHistory", JSON.stringify(updated))
    } catch (error) {
      console.error("Failed to save chat history:", error)
    }
  }
  