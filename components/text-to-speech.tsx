// app/components/TextToSpeech.tsx
"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Play, Pause, Volume2 } from "lucide-react"

export function TextToSpeech() {
  const [text, setText] = useState("")
  const [voice, setVoice] = useState("male")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const convertToSpeech = async () => {
    if (!text.trim()) return

    setIsConverting(true)
    setAudioUrl(null)

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, voice }),
      })

      const data = await res.json()
      setAudioUrl(data.audioUrl)
    } catch (err) {
      console.error("Error converting to speech", err)
    } finally {
      setIsConverting(false)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Text to Speech Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            rows={6}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Select Voice</label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={convertToSpeech} disabled={!text.trim() || isConverting} className="w-full">
            {isConverting ? "Converting..." : "Convert to Speech"}
          </Button>

          {audioUrl && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-4">🔊 Generated Audio</h3>
                <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" />
                <div className="flex items-center gap-4">
                  <Button onClick={togglePlayPause} variant="outline" size="icon" className="h-12 w-12 rounded-full">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-primary transition-all ${isPlaying ? "animate-progress" : ""}`}
                      style={{ width: isPlaying ? "100%" : "0%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <a href={audioUrl} download className="block">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Audio
                </Button>
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
