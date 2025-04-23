"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Sparkles } from "lucide-react"
import { m } from "framer-motion"

const marketingKeywords = [
  "product name", "product features", "product benefits", "product pricing", "product launch","product reviews", "product comparison",
  "product promotion", "product launch", "product launch date", "product launch time", "product launch location",
  "product launch event", "product launch party", "product launch party date", "product launch party time", "product launch party location",
  "product launch party event", "product launch party venue", "product launch party cost", "product launch party budget",
  "product launch party location", "product launch party venue", "product launch party date", "product launch party time",
  "product launch party budget", "product launch party cost", "product launch party budget", "product launch party cost",
  "product launch party budget", "product launch party cost", "product launch party budget", "product launch party cost", 
  "product usp", "value proposition", "product reviews", "product comparisons",
  "ad copy", "sales copy", "marketing slogans", "taglines", "catchphrases", "hooks",
  "headlines", "banners", "commercial scripts",
  "campaign ideas", "target audience", "buyer persona", "customer pain points",
  "ctas", "campaign objectives", "brand voice", "marketing goals", "campaign timelines",
  "seasonal offers", "social media posts", "instagram captions", "facebook ads",
  "twitter threads", "linkedin posts", "tiktok video ideas", "youtube ad scripts",
  "email marketing content", "sms campaigns", "push notifications",
  "mood", "tone", "emotions", "themes", "visual ideas", "storyline", "narrative",
  "slogan style", "demographics", "psychographics", "market trends", "competitor names",
  "consumer behavior", "influencer personas", "offer details", "discounts", "deals",
  "limited-time offer", "testimonials", "case studies", "pricing models", "guarantee",
  "warranty", "brand name", "mission statement", "brand personality", "company values",
  "industry niche", "vision statement", "product", "launch", "food",

  // Single words and additional keywords
  "strategy", "branding", "awareness", "conversion", "reach", "retention", "loyalty",
  "traffic", "engagement", "clicks", "views", "impressions", "leads", "pipeline",
  "funnel", "retargeting", "acquisition", "growth", "insights", "analytics",
  "kpis", "roi", "metrics", "optimization", "segmentation", "testing", "feedback",
  "onboarding", "activation", "triggers", "empathy", "resonance", "alignment", "scalability",
  "automation", "personalization", "funnels", "email", "outreach", "awareness",
  "loyalty", "referral", "subscription", "membership", "upsell", "cross-sell",
  "brand", "conversion", "buzz", "viral", "trend", "share", "comment", "like",
  "testimonial", "endorsement", "influencer", "ambassador", "authority", "credibility",
  "trust", "reviews", "ratings", "experience", "customer", "client", "user",
  "interface", "journey", "delight", "value", "proposition", "advantage", "edge",
  "niche", "market", "segmentation", "persona", "avatar", "identity", "image",
  "perception", "reputation", "impact", "story", "tone", "emotion", "color", "font",
  "aesthetic", "design", "logo", "symbol", "name", "voice", "sound", "jingle",
  "catchy", "memorable", "snappy", "bold", "friendly", "funny", "serious", "playful",
  "aspirational", "inspirational", "motivational", "emotional", "technical",
  "minimalist", "luxury", "premium", "budget", "eco-friendly", "sustainable", "organic",
  "natural", "handmade", "limited", "exclusive", "sale", "flash", "bundle", "combo",
  "bogo", "giveaway", "contest", "promotion", "event", "webinar", "conference",
  "booth", "demo", "pitch", "deck", "presentation", "report", "survey", "poll",
  "announcement", "update", "news", "newsletter", "feature", "release", "version",
  "how-to", "guide", "tutorial", "ebook", "checklist", "template", "calendar", "plan",
  "roadmap", "vision", "goal", "objective", "milestone", "kpi", "metric", "dashboard",
  "insight", "data", "behavior", "heatmap", "tracking", "cookies", "pixel",
  "adwords", "seo", "sem", "ppc", "organic", "search", "ranking", "google",
  "bing", "yahoo", "meta", "ads", "manager", "boost", "campaign", "split-test",
  "variant", "ab test", "result", "winning", "losing", "conversion rate",
  "open rate", "click-through", "bounce rate", "unsubscribe", "retention rate",
  "loyalty program", "customer support", "crm", "salesforce", "hubspot", "zendesk",
  "drip", "mailchimp", "activecampaign", "klaviyo", "convertkit", "substack",
  "shopify", "woocommerce", "magento", "wordpress", "landing page", "homepage",
  "about us", "contact", "faq", "support", "pricing", "checkout", "cart", "abandonment",
  "recovery", "upsell", "recommendation", "wishlist", "social proof", "scarcity",
  "urgency", "countdown", "timer", "stock", "inventory", "demand", "trend",
  "viral", "trending", "explore", "for you", "shorts", "reels", "stories",
  "livestream", "broadcast", "highlight", "clip", "reaction", "meme", "gif",
  "caption", "description", "alt text", "metadata", "thumbnail", "cover", "banner",
  "background", "cta", "call to action", "click here", "learn more", "buy now",
  "sign up", "subscribe", "join now", "get started", "try free", "limited time",
  "best value", "no risk", "money back", "guarantee", "fast shipping", "free trial",
  "zero cost", "bonus", "freebie", "gift", "exclusive", "early access", "vip",
  "priority", "waitlist", "preorder", "beta access", "founders offer", "test group","slogans","promotional","discount","offer","sale","special","limited","exclusive","free","bundle","combo",
  "ad copy", "sales copy", "marketing slogans", "taglines", "catchphrases", "hooks",
  "headlines", "banners", "commercial scripts", "campaign ideas", "target audience","campaign ideas","ideas","idea","slogan","slogans","promotional","discount","offer","sale","special","limited","exclusive","free","bundle","combo"
]

export function MarketingContentGenerator() {
  const [ingredients, setIngredients] = useState("")
  const [tone, setTone] = useState("professional")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [marketingTopic, setMarketingTopic] = useState("")
  const [variants, setVariants] = useState<{ style: string; content: string }[]>([])
  const [isGeneratingVariants, setIsGeneratingVariants] = useState(false)

  const isMarketingInput = (input: string) => {
    const lower = input.toLowerCase()
    return marketingKeywords.some(keyword => lower.includes(keyword))
  }

  const generateContent = async () => {
    if (!ingredients.trim()) return
    if (!isMarketingInput(ingredients)) {
      setGeneratedContent("🚫 Sorry, this doesn't seem like marketing input.")
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: "marketing bot",
          tone,
          content: ingredients,
          model: "gemini"
        })
      })

      const data = await res.json()

      if (res.ok && data?.post) {
        setGeneratedContent(`${data.post}\n\n${data.hashtags}`)
      } else {
        setGeneratedContent("⚠️ Something went wrong while generating.")
      }
    } catch (error) {
      setGeneratedContent("❌ Error. Please try again later.")
    } finally {
      setIsGenerating(false)
    }
  }

  const generateVariants = async () => {
    if (!marketingTopic.trim()) return

    setIsGeneratingVariants(true)
    setVariants([])

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ab_test",
          topic: marketingTopic,
          model: "gemini"
        })
      })

      const data = await res.json()

      if (res.ok && Array.isArray(data.variants)) {
        setVariants(data.variants)
      } else {
        setVariants([{ style: "error", content: "⚠️ Could not generate variants." }])
      }
    } catch (error) {
      setVariants([{ style: "error", content: "❌ Error. Please try again." }])
    } finally {
      setIsGeneratingVariants(false)
    }
  }

  const downloadContent = () => {
    if (!generatedContent) return
    const element = document.createElement("a")
    const file = new Blob([generatedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "marketing_content.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-10 p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <Card className="shadow-lg border-none bg-white/70 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-t-lg p-6 text-white">
          <CardTitle className="text-xl flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            Marketing Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-indigo-700">Select Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-white border border-indigo-200 focus:ring-indigo-400">
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
            <label className="block mb-1 text-sm font-medium text-indigo-700">Enter content idea</label>
            <Input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. catchy slogans for summer campaign"
              className="border-indigo-300 focus:ring-indigo-500"
            />
          </div>

          <Button
            onClick={generateContent}
            disabled={!ingredients.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold transition-all"
          >
            {isGenerating ? "Generating..." : "✨ Generate Content"}
          </Button>

          {generatedContent && (
            <div className="rounded-md bg-indigo-50 border border-indigo-200 p-4 mt-4">
              <h3 className="font-medium text-indigo-700 mb-2">📢 Result</h3>
              <p className="whitespace-pre-line text-gray-800">{generatedContent}</p>
              <Button onClick={downloadContent} variant="ghost" className="mt-4 text-indigo-600 hover:underline">
                <Download className="h-4 w-4 mr-2 inline" />
                Download Text
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg border-none bg-white/70 backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-lg p-6 text-white">
          <CardTitle className="text-xl font-bold">🧪 A/B Test Variant Generator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-rose-700">Marketing Topic</label>
            <Textarea
              value={marketingTopic}
              onChange={(e) => setMarketingTopic(e.target.value)}
              placeholder="e.g. Product launch campaign for a wellness app"
              rows={3}
              className="border-rose-200 focus:ring-rose-500"
            />
          </div>

          <Button
            onClick={generateVariants}
            disabled={!marketingTopic.trim() || isGeneratingVariants}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold transition-all"
          >
            {isGeneratingVariants ? "Generating..." : "🎯 Generate Variants"}
          </Button>

          {variants.length > 0 && (
            <div className="space-y-4 mt-6">
              {variants.map((variant, index) => (
                <div key={index} className="rounded-md bg-rose-50 border border-rose-200 p-4">
                  <h4 className="font-semibold text-rose-700 mb-1">
                    {variant.style === "error" ? "Error" : `Variant ${index + 1}`}
                  </h4>
                  <p className="whitespace-pre-line text-gray-800">{variant.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MarketingContentGenerator;