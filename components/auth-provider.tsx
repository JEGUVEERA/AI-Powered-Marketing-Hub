"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

type User = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    // This is a mock implementation
    const mockUser = {
      id: "user-1",
      name: email.split("@")[0],
      email,
      image: null,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>{children}</AuthContext.Provider>
}
