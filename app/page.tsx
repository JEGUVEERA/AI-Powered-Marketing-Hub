
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
        variant: "success",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card className="w-full max-w-md shadow-xl rounded-lg bg-white p-6">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl font-semibold text-indigo-600">Login</CardTitle>
          <CardDescription className="text-lg text-gray-500">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 p-3 rounded-md w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 p-3 rounded-md w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-all duration-300" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-sm text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
