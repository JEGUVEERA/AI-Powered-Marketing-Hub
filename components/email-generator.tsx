"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Mail } from "lucide-react"

export function EmailGenerator() {
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [tone, setTone] = useState("professional")
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateEmail = () => {
    if (!subject.trim() || !body.trim()) return

    setIsGenerating(true)

    // Mock API call - in a real app, you would call your backend
    setTimeout(() => {
      const emailTemplates = {
        formal: `Dear Valued Customer,

I am writing to inform you about ${subject}.

${body}

We appreciate your continued support and look forward to serving you.

Kind regards,
[Your Name]
[Your Position]
[Company Name]`,

        casual: `Hey there!

Just wanted to reach out about ${subject}.

${body}

Thanks for being awesome!

Cheers,
[Your Name]
[Company Name]`,

        playful: `Hey there, superstar! ✨

Exciting news about ${subject}!

${body}

Can't wait to hear what you think!

High fives,
[Your Name]
The awesome team at [Company Name]`,

        professional: `Dear [Recipient Name],

I hope this email finds you well. I wanted to reach out regarding ${subject}.

${body}

Please don't hesitate to contact me if you have any questions or require additional information.

Best regards,
[Your Name]
[Your Position]
[Company Name]
[Contact Information]`,
      }

      setGeneratedEmail(emailTemplates[tone as keyof typeof emailTemplates])
      setIsGenerating(false)
    }, 1500)
  }

  const downloadEmail = () => {
    if (!generatedEmail) return

    const element = document.createElement("a")
    const file = new Blob([generatedEmail], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "email_content.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Marketing Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="playful">Playful</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter email subject..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Body (or key points)</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter email body or key points to include..."
              rows={5}
            />
          </div>

          <Button onClick={generateEmail} disabled={!subject.trim() || !body.trim() || isGenerating} className="w-full">
            {isGenerating ? "Generating..." : "Generate Email"}
          </Button>

          {generatedEmail && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">📩 AI-Generated Email Content</h3>
                <pre className="whitespace-pre-wrap font-sans">{generatedEmail}</pre>
              </div>

              <Button variant="outline" onClick={downloadEmail}>
                <Download className="h-4 w-4 mr-2" />
                Download Email
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

