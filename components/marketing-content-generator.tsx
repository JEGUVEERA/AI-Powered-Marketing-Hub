"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Sparkles } from "lucide-react"

const marketingKeywords = [
  // Existing entries
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
  "headlines", "banners", "commercial scripts", "campaign ideas", "target audience","campaign ideas","ideas","idea","slogan"
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
      setGeneratedContent("Sorry, I can't generate it. You can get this information in the chatbot.")
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: " marketing bot ",
          tone,
          content: ingredients,
          model: "gemini"
        })
      })

      const data = await res.json()

      if (res.ok && data?.post) {
        setGeneratedContent(`${data.post}\n\n${data.hashtags}`)
      } else {
        setGeneratedContent("Sorry, I can't generate it. You can get this information in the chatbot.")
      }
    } catch (error) {
      setGeneratedContent("Something went wrong. Please try again later.")
      console.error("Error generating content:", error)
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
        setVariants([{ style: "error", content: "Sorry, I can't generate it. You can get this information in the chatbot." }])
      }
    } catch (error) {
      setVariants([{ style: "error", content: "Something went wrong. Please try again later." }])
      console.error("Error generating variants:", error)
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
    <div className="space-y-8">
      {/* Main Content Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Marketing Content Generator
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
              <label className="block text-sm font-medium mb-2">Enter ingredients for marketing content</label>
              <Input
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., marketing slogans, ad copy, campaign ideas"
              />
            </div>

            <Button onClick={generateContent} disabled={!ingredients.trim() || isGenerating} className="w-full">
              {isGenerating ? "Generating..." : "Generate Marketing Content"}
            </Button>

            {generatedContent && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">📢 Generated Content</h3>
                  <p className="whitespace-pre-line">{generatedContent}</p>
                </div>

                <Button variant="outline" onClick={downloadContent}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Content
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* A/B Test Variant Generator */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 A/B Test: Marketing Content Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter your marketing topic or idea</label>
              <Textarea
                value={marketingTopic}
                onChange={(e) => setMarketingTopic(e.target.value)}
                placeholder="e.g., Product launch campaign for a new health drink"
                rows={3}
              />
            </div>

            <Button
              onClick={generateVariants}
              disabled={!marketingTopic.trim() || isGeneratingVariants}
              className="w-full"
            >
              {isGeneratingVariants ? "Generating Variants..." : "Generate A/B Variants"}
            </Button>

            {variants.length > 0 && (
              <div className="mt-6 space-y-4">
                {variants.map((variant, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">{variant.style === "error" ? "Error" : "Variant " + (index + 1)}</h4>
                    <p className="whitespace-pre-line">{variant.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
