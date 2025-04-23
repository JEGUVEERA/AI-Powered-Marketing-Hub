"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Mail, Copy, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function EmailGenerator() {
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [tone, setTone] = useState("professional")
  const [recipient, setRecipient] = useState("")
  const [senderName, setSenderName] = useState("")
  const [position, setPosition] = useState("")
  const [company, setCompany] = useState("")
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateEmail = async () => {
    if (!subject.trim() || !body.trim()) {
      toast.warning("Please enter both subject and body.")
      return
    }

    setIsGenerating(true)
    setGeneratedEmail("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const template = {
        formal: `Dear ${recipient || "Valued Customer"},\n\nI am writing to inform you about ${subject}.\n\n${body}\n\nWe appreciate your continued support and look forward to serving you.\n\nKind regards,\n${senderName || "[Your Name]"}\n${position || "[Your Position]"}\n${company || "[Company Name]"}`,
        casual: `Hi ${recipient || "there"},\n\nJust wanted to reach out about ${subject}.\n\n${body}\n\nThanks!\n\n- ${senderName || "[Your Name]"} @ ${company || "[Company]"}`,
        playful: `Hey ${recipient || "superstar"}! ✨\n\nBig news about ${subject}!\n\n${body}\n\nLet me know what you think!\n\nCheers,\n${senderName || "[Your Name]"} and the awesome team at ${company || "[Company]"}`,
        professional: `Dear ${recipient || "[Recipient Name]"},\n\nI hope this message finds you well. I'm reaching out regarding ${subject}.\n\n${body}\n\nPlease feel free to contact me for any further information.\n\nBest regards,\n${senderName || "[Your Name]"}\n${position || "[Your Position]"}\n${company || "[Company Name]"}`,
      }

      setGeneratedEmail(template[tone as keyof typeof template])
      toast.success("Email generated successfully!")
    } catch (err) {
      toast.error("Failed to generate email.")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadEmail = () => {
    const blob = new Blob([generatedEmail], { type: "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "email_content.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
    toast.info("Copied to clipboard!")
  }

  return (
    <Card className="shadow-xl border border-purple-300 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-purple-700 dark:text-purple-300 font-semibold">
          <Mail className="h-6 w-6 text-purple-500" />
          AI Email Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Recipient Name</label>
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. John Doe" className="mt-1 focus-visible:ring-purple-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Sender Name</label>
            <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="e.g. Jane Smith" className="mt-1 focus-visible:ring-purple-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Your Position</label>
            <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Marketing Manager" className="mt-1 focus-visible:ring-purple-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Company Name</label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. OpenAI Inc." className="mt-1 focus-visible:ring-purple-500" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Select Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="mt-1 focus-visible:ring-purple-500">
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
            <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Email Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Product Launch Update" className="mt-1 focus-visible:ring-purple-500" />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-purple-700 dark:text-purple-300">Email Body / Key Points</label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What do you want the email to say?"
            rows={5}
            className="mt-1 focus-visible:ring-purple-500"
          />
        </div>

        <Button
          onClick={generateEmail}
          disabled={isGenerating || !subject.trim() || !body.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
        >
          {isGenerating ? "Generating..." : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Email
            </>
          )}
        </Button>

        {generatedEmail && (
          <div className="border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4 bg-purple-50/40 dark:bg-purple-900/10 mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 text-lg">📩 Generated Email</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="hover:bg-purple-200 dark:hover:bg-purple-800" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-purple-200 dark:hover:bg-purple-800" onClick={downloadEmail}>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 dark:text-slate-200">{generatedEmail}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EmailGenerator;