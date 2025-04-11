"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Info, Bot, Sparkles } from "lucide-react"

export function SentimentAnalysis() {
  const [text, setText] = useState("")
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [creativeResponse, setCreativeResponse] = useState<string | null>(null)
  const [agentTrace, setAgentTrace] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTracing, setIsTracing] = useState(false)

  // Simple sentiment analysis function
  const analyzeSentiment = (text: string) => {
    const positiveWords = ["happy", "joy", "love", "great", "amazing", "wonderful", "brilliant", "cheerful", "delightful", "ecstatic",
    "fantastic", "grateful", "harmonious", "inspiring", "jubilant", "kind", "lively", "marvelous", "optimistic",
    "peaceful", "radiant", "spectacular", "thriving", "uplifting", "victorious", "warmhearted", "zealous",
    "accomplished", "admirable", "affectionate", "authentic", "benevolent", "blessed", "bountiful", "buoyant",
    "calm", "charming", "compassionate", "confident", "courageous", "courteous", "dazzling", "dedicated",
    "determined", "dynamic", "eager", "effervescent", "elevated", "empowered", "enchanting", "energetic",
    "enthusiastic", "exceptional", "exuberant", "faithful", "flourishing", "forgiving", "friendly", "generous",
    "gentle", "genuine", "glorious", "graceful", "grounded", "hardworking", "helpful", "honest", "hopeful",
    "humble", "illustrious", "impressive", "independent", "ingenious", "innovative", "intelligent",
    "invigorating", "joyous", "jovial", "keen", "legendary", "limitless", "lovable", "magnificent",
    "mindful", "motivated", "noble", "nurturing", "open-minded", "outstanding", "passionate", "patient",
    "peace-loving", "persevering", "persistent", "philanthropic", "playful", "positive", "powerful",
    "proactive", "productive", "prosperous", "proud", "radiant", "refreshing", "reliable", "resilient",
    "resourceful", "respectful", "responsible", "rewarding", "satisfied", "selfless", "sensible",
    "sincere", "skillful", "soothing", "spirited", "spontaneous", "strong", "successful", "supportive",
    "sympathetic", "thoughtful", "tolerant", "trustworthy", "unwavering", "valiant", "vibrant", "wise",
    "witty", "youthful", "zesty", "adventurous", "affluent", "amiable", "artistic", "aspiring",
    "authentic", "balanced", "breathtaking", "bright", "captivating", "carefree", "celebratory",
    "chivalrous", "classic", "colorful", "compelling", "congenial", "content", "creative",
    "cultivated", "daring", "decisive", "dedicated", "delicate", "diligent", "distinguished",
    "divine", "effortless", "elegant", "elated", "eloquent", "empathic", "empowered",
    "enlightened", "enterprising", "expressive", "exquisite", "fascinating", "fearless",
    "fertile", "festive", "flawless", "fortunate", "free-spirited", "fun-loving", "generative",
    "genius", "glamorous", "glowing", "graceful", "groundbreaking", "handsome", "healing",
    "heartwarming", "heroic", "high-spirited", "hopeful", "hospitable", "humorous", "idealistic",
    "imaginative", "immaculate", "industrious", "influential", "insightful", "intuitive",
    "inventive", "jolly", "jubilant", "keen", "laudable", "lively", "loving", "loyal",
    "magical", "majestic", "masterful", "meditative", "mesmerizing", "meticulous",
    "mind-blowing", "miraculous", "motivational", "natural", "neat", "nurturing",
    "observant", "omniscient", "opulent", "orderly", "original", "outgoing",
    "outstanding", "passionate", "peaceful", "perceptive", "perseverant",
    "persistent", "philosophical", "playful", "poetic", "polished", "popular",
    "practical", "precious", "priceless", "profound", "progressive", "pure",
    "purposeful", "quick-witted", "radiant", "reassuring", "refined", "refreshing",
    "rejuvenating", "remarkable", "resilient", "resourceful", "respectable",
    "revered", "rewarding", "romantic", "sagacious", "sensational", "sensuous",
    "serene", "sharp", "shining", "skillful", "smart", "sociable", "soulful",
    "sparkling", "spectacular", "spontaneous", "steadfast", "stunning", "suave",
    "sublime", "successful", "sufficient", "superb", "supportive", "sweet",
    "sympathetic", "talented", "tenacious", "tender", "thrilled", "tidy",
     "transformative", "trustworthy", "truthful", "unconditional",
    "unfailing", "unique", "uplifted", "valiant", "versatile", "vibrant",
    "visionary", "vivacious", "warm", "welcoming", "wise", "witty", "wonderful",
    "worthy", "youthful", "zealous", "zesty","good"
]

    const negativeWords = ["sad", "angry", "hate", "bad", "awful", "terrible", "horrible", "miserable", "depressed", "annoyed",
    "frustrated", "disappointed", "upset", "resentful", "unhappy", "gloomy", "hopeless", "pessimistic",
    "anxious", "worried", "stressed", "fearful", "nervous", "jealous", "insecure", "guilty", "ashamed",
    "regretful", "lonely", "isolated", "betrayed", "rejected", "hurt", "humiliated", "embarrassed",
    "offended", "defensive", "irritated", "hostile", "vengeful", "rude", "arrogant", "selfish",
    "greedy", "manipulative", "deceitful", "insincere", "dishonest", "corrupt", "cruel", "cold",
    "insensitive", "callous", "apathetic", "neglectful", "inconsiderate", "ungrateful", "lazy",
    "incompetent", "careless", "reckless", "clumsy", "useless", "worthless", "pathetic",
    "pointless", "meaningless", "hopeless", "tragic", "painful", "brutal", "savage", "sinister",
    "evil", "wicked", "malicious", "vindictive", "spiteful", "destructive", "dangerous",
    "toxic", "poisonous", "contaminated", "dirty", "filthy", "polluted", "nasty", "disgusting",
    "repulsive", "rotten", "vile", "horrendous", "shameful", "unforgiving", "harsh", "unfair",
    "displeasing", "dismal", "insulting", "distasteful", "disastrous", "frightening", "dangerous",
    "painful", "grieving", "sorrowful", "unfortunate", "tragic", "mournful", "unpleasant",
    "toxic", "disorienting", "blameful", "condemning", "unjust", "mean", "difficult", "untrustworthy",
    "divisive", "angst", "struggling", "bitter", "suspicious", "hostile", "dark", "oppressive", "disturbing",
    "hateful", "alienated", "horrible", "apathetic", "ugly", "irritating", "disappointing", "low", 
    "mean-spirited", "untrustworthy", "horrific", "devastating", "vicious", "ugly", "dreadful", "abominable", 
    "unbearable", "unfortunate", "scary", "undesirable", "unwelcome", "unnecessary", "desolate", 
    "sickening", "appalling", "unreliable", "hateful", "aggressive", "tormenting", "abusive", 
    "discomforting", "dismaying", "untrusting", "paranoid", "disgusted", "haggard", "unworthy", 
    "sour", "suffocating", "discontent", "doubtful", "unmotivated", "neglected", "paralyzing", 
    "harrowing", "unjustified", "unsatisfying", "despondent", "revolting", "pitiful", "unhappy", 
    "disillusioned", "defeatist", "distressing", "hopelessness", "grievous", "apathetic", "dreary", 
    "frustrating", "dreadful", "complicated", "undeserving", "helpless", "downhearted", "suffocating", 
    "mournful", "unfavorable", "aggravating", "sickly", "damning", "reprehensible", "off-putting", 
    "counterproductive", "self-destructive", "unsympathetic", "uncooperative", "toxic", "unpredictable", 
    "unsuccessful", "opposing", "debilitating", "unattainable", "miserably", "hurtful", "demoralizing", 
    "distasteful", "ungracious", "unreceptive", "persecutory", "sabotaging", "irking", "paranoiac", 
    "pathetically", "disillusioned", "uninspiring", "unfitting", "unimpressive", "unhealthy", 
    "negative", "irritating", "broken", "regret", "unfulfilled", "degraded", "contradictory", 
    "depressing", "disconnected", "disheartening", "inferior", "intolerable", "vulgar", "morose", 
    "insufficient", "unfortunate", "oppressive", "hollow", "detrimental", "harsh", "frightening", 
    "grueling", "unwilling", "reprehensible", "unrelenting", "disturbing", "inflexible", "ruinous", 
    "deficient", "failing", "unethical", "unfulfilling", "hostile", "unjust", "destructive", 
    "disruptive", "worthless", "rejected", "downhearted", "resentful", "lacking", "resenting", 
    "oppositional", "obnoxious", "unappealing", "overbearing", "unforgiving", "pointless", 
    "insulting", "tragic", "imperfect", "wretched", "worrisome", "unfit", "discouraging", "dark", 
    "morbid", "regrettable", "rejected", "dismaying", "undesirable", "heartbreaking", "unsavory", 
    "undermining", "dejected", "despairing", "horrifying", "dread", "opposing", "unwanted", "unfocused", 
    "shocking", "grating", "unsuccessful", "compromised", "unworthy", "unpleasant", "terrifying", 
    "scornful", "intolerant", "ugly", "uncompromising", "disturbing", "discouraged", "exasperated", 
    "troublesome", "demotivating", "unapproachable", "unreliable", "distressed", "divisive", 
    "inconsiderate", "unwanted", "unsatisfactory", "destructive", "grievous", "hopeless", "shameful", 
    "pointless", "useless", "intolerable", "upsetting", "resenting", "repulsive", "bitter", "devastating",
    "discouraging", "unforgiving", "downcast", "unsuccessful", "ruining", "toxic", "draining", "stifling", 
    "conflicting", "distasteful", "unproductive", "blaming", "unsuitable", "tragically", "unfriendly",
    "infuriating", "agonizing", "unrecoverable", "unethical", "paralyzing", "unsolicited", "horrendous",
    "unsound", "unhelpful", "unresolvable", "failing", "unresolved", "lousy", "regretful"
]

    text = text.toLowerCase()
    let positiveCount = 0
    let negativeCount = 0

    positiveWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "g")
      const matches = text.match(regex)
      if (matches) positiveCount += matches.length
    })

    negativeWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "g")
      const matches = text.match(regex)
      if (matches) negativeCount += matches.length
    })

    if (positiveCount > negativeCount) {
      return "✅ The sentiment of the text is **positive**."
    } else if (negativeCount > positiveCount) {
      return "⚠️ The sentiment of the text is **negative**."
    } else {
      return "ℹ️ The sentiment of the text is **neutral**."
    }
  }

  const handleAnalyzeSentiment = () => {
    if (!text.trim()) return

    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      const result = analyzeSentiment(text)
      setSentiment(result)
      setIsAnalyzing(false)
    }, 1000)
  }

  const handleGenerateCreative = () => {
    if (!text.trim()) return

    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setCreativeResponse(
        `✨ *Creative Response*: Imagine a world where "${text}" becomes the heart of a magical story. What adventures would unfold? Perhaps a journey through emotions, where words transform into experiences and ideas bloom into reality. Your message carries the seeds of countless possibilities, waiting to be explored.`,
      )
      setIsGenerating(false)
    }, 1500)
  }

  const handleAgentTrace = () => {
    if (!text.trim()) return

    setIsTracing(true)

    // Simulate API call
    setTimeout(() => {
      const sentimentResult = analyzeSentiment(text)

      setAgentTrace(`
*Thought:* Do I need to use a tool? Yes
*Action:* AnalyzeSentiment
*Action Input:* "${text}"
*Observation:* ${sentimentResult}
*Thought:* Do I need to use a tool? Yes
*Action:* GenerateCreativeResponse
*Action Input:* "${text}"
*Observation:* ✨ *Creative Response*: Imagine a world where "${text}" becomes the heart of a magical story. What adventures would unfold?
*Thought:* I now have both a sentiment analysis and a creative response. I should provide these to the user.
*AI Final Response:* I've analyzed your text and found that ${sentimentResult.toLowerCase()} Additionally, here's a creative take: Imagine a world where "${text}" becomes the heart of a magical story. What adventures would unfold?
      `)

      // Also set the sentiment for the badge
      setSentiment(sentimentResult)

      setIsTracing(false)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>📝 Text Analysis and Creative Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter your text below:</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste text for analysis..."
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button onClick={handleAnalyzeSentiment} disabled={!text.trim() || isAnalyzing} variant="outline">
                {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
              </Button>

              <Button onClick={handleGenerateCreative} disabled={!text.trim() || isGenerating} variant="outline">
                {isGenerating ? "Generating..." : "Generate Creative Response"}
              </Button>

              <Button onClick={handleAgentTrace} disabled={!text.trim() || isTracing} variant="outline">
                {isTracing ? "Processing..." : "Agent Debug Trace"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {sentiment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {sentiment.includes("positive") ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : sentiment.includes("negative") ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Info className="h-5 w-5 text-blue-500" />
              )}
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    sentiment.includes("positive")
                      ? "success"
                      : sentiment.includes("negative")
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {sentiment.includes("positive")
                    ? "Positive"
                    : sentiment.includes("negative")
                      ? "Negative"
                      : "Neutral"}
                </Badge>
              </div>
              <p dangerouslySetInnerHTML={{ __html: sentiment.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}></p>
            </div>
          </CardContent>
        </Card>
      )}

      {creativeResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Creative Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p dangerouslySetInnerHTML={{ __html: creativeResponse.replace(/\*(.*?)\*/g, "<em>$1</em>") }}></p>
          </CardContent>
        </Card>
      )}

      {agentTrace && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Agent Debug Trace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm">{agentTrace}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

