"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Twitter, Instagram, Facebook } from "lucide-react"

export function SocialMediaGenerator() {
  const [content, setContent] = useState("")
  const [platform, setPlatform] = useState("twitter")
  const [tone, setTone] = useState("professional")
  const [generatedPost, setGeneratedPost] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [model, setModel] = useState("gemini") // Default to Gemini

  const platformIcons = {
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
  }

  const trendingTopics = [
    "Artificial Intelligence",
    "Sustainable Marketing",
    "Digital Transformation",
    "Content Marketing",
    "Social Media Trends",
    "Customer Experience",
    "Video Marketing",
    "Influencer Partnerships",
    "Data-Driven Marketing",
    "Voice Search Optimization",
  ]

  const generatePost = async () => {
    if (!content.trim()) return
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          tone,
          content,
          model,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate post")
      }

      const data = await response.json()
      setGeneratedPost(data.post)
      setHashtags(data.hashtags)
    } catch (error) {
      console.error("Error generating post:", error)
      setGeneratedPost("Failed to generate post. Please try again.")
      setHashtags("")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPost = () => {
    if (!generatedPost) return

    const element = document.createElement("a")
    const file = new Blob([generatedPost + "\n\n" + hashtags], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${platform}-post.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {platformIcons[platform as keyof typeof platformIcons]}
              Social Media Post Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="witty">Witty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content Idea</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe what the post should be about..."
                  rows={5}
                />
              </div>

              <Button onClick={generatePost} disabled={!content.trim() || isGenerating} className="w-full">
                {isGenerating ? "Generating..." : "✨ Generate Post"}
              </Button>

              {generatedPost && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">📝 Generated Post</h3>
                    <p className="whitespace-pre-line">{generatedPost}</p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">🏷️ Suggested Hashtags</h3>
                    <p>{hashtags}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={downloadPost}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Post
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>🔥 Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => setContent(topic)}
                >
                  {index + 1}. {topic}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
