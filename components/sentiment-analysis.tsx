"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  CheckCircle,
  Info,
  Bot,
  Sparkles,
  Flame,
  Smile,
  Frown,
  Zap,
  Meh,
  Heart,
} from "lucide-react"

export function SentimentAnalysis() {
  const [text, setText] = useState("")
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [emotion, setEmotion] = useState<string | null>(null)
  const [creativeResponse, setCreativeResponse] = useState<string | null>(null)
  const [agentTrace, setAgentTrace] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTracing, setIsTracing] = useState(false)

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
    "worthy", "youthful", "zealous", "zesty","good"]
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

  const emotionCategories = {
    Joy: [
      "happy", "joy", "cheerful", "excited", "delightful", "bliss", "content",
      "gleeful", "elated", "euphoric", "jubilant", "radiant", "thrilled", "satisfied",
      "ecstatic", "upbeat", "lively", "buoyant", "sunny", "vibrant", "grateful",
      "overjoyed", "lighthearted", "merry", "playful", "chipper", "bubbly", "vivacious",
      "glee", "euphoria", "cheer", "happiness", "rejoicing", "mirth", "blissful",
      "delighted", "rejoice", "glad", "gladness", "celebrate", "enthusiastic",
      "positivity", "positiveness", "smiling", "laughing", "silliness", "giggles",
      "serenity", "peaceful", "elation", "triumphant", "festive", "zest", "sparkle",
      "serendipity", "jovial", "charming", "winsome", "contentment", "cheerfulness",
      "good-humored", "tickled", "jocular", "joyous", "exhilarated", "gleaming",
      "carefree", "free-spirited", "sunshine", "heartwarming", "spirited", "smiley",
      "exuberant", "beatific", "peppy", "sprightly", "eager", "hopeful", "light",
      "jubilation", "radiance", "bright", "invigorated", "kindred", "amused",
      "amusement", "hilarity", "relief", "vivacity", "uplifted", "uplifting",
      "winsomeness", "heartening", "cheering", "blithesome", "enthuse", "dazzled",
      "gleamed", "beam", "spark", "shimmer", "frolic", "giddy", "heartened",
      "joyful", "lightness", "loving", "playfulness", "glowing", "snuggly",
      "enraptured", "enchantment", "ecstasy", "sweetness", "sugariness", "coziness",
      "chuffed", "jumpy", "dance", "skip", "twinkle", "dreamy", "enjoyment",
      "pleasure", "satisfaction", "radiate", "harmony", "zippy", "bouncing",
      "flourishing", "perky", "breezy", "huggable", "cuddly", "endearing",
      "affectionate", "blossoming", "fluttery", "cheesin", "tickled pink", "beaming",
      "twinkling", "laughy", "ecstatically", "sugar-high", "dreamlike", "magical",
      "effervescent", "luminous", "elevated", "cheer up", "warmed", "relaxed",
      "revived", "sparkling", "enthusiasm", "exaltation", "high-spirited",
      "in high spirits", "good vibes", "heavenly", "rejuvenated", "smiley-faced",
      "gushing", "whoopee", "woohoo", "happiness overload", "jubilee", "jubilantly",
      "cozy", "enrapture", "tickle", "comforted", "sunbeamy", "gladsome",
      "joyfulness", "glee-filled", "happy-go-lucky", "pumped", "refreshed",
      "hilarious", "amusing", "glee-inducing", "ticklish", "animated", "colorful",
      "elevating", "carefreeness", "vivid", "vivace", "fireworks", "smile-worthy",
      "life-loving", "zippy", "sunkissed", "elatedly", "jubilance", "pep",
      "cheeriness", "festivity", "sweet", "divine", "cozied", "peace", "radiating",
      "festooned", "warm fuzzies", "touched", "sunshiny", "lightbeam", "zing",
      "zany", "woozy with joy", "positiveness", "glee beam", "love burst",
      "soulful smile", "glow-up", "haloed", "exalted", "magnetized", "cheesing",
      "boisterous", "glistening", "fairy-like", "sky-high", "loving-kindness",
      "glittery", "mirthful", "swelling heart", "blessed", "bountiful",
      "heart full", "twirly", "whimsical", "jestered", "joyride", "giddy-up",
      "kicky", "wiggly", "frothy", "merry-making", "zestful", "thankful", "wowed",
      "grin", "blooming", "chocolatey", "featherlight", "tingling", "vibing",
      "delight", "soulshine", "levity", "fluffy", "cherishing", "peace-loving",
      "ecstatic burst", "glad-hearted", "squeal", "snort-laugh", "silly-face",
      "rosy", "sunbeam", "sky-dance", "skip-hop", "twirl", "giggle-fit",
      "honeyed", "rosiness", "freefall-laugh", "serenade", "uplift", "harmonious",
      "soulful", "candy-like", "cupcake-y", "bubbling", "ballooned", "fluffy-hearted",
      "giggly", "melted", "sun-kissed", "sugar-sprinkled", "kaleidoscopic",
      "storybook-like", "gleamed", "dear", "sugar-sweet", "squishy", "cuddled",
      "purring", "cheering", "emotional high", "gentle joy", "cheeky", "dandy",
      "adoring", "caring", "embraced", "radiant beam", "ecstatic tears", "bursting",
      "rainbowed", "hope-filled", "soul-dancing", "gentle spirit", "soft delight",
      "cheer bomb", "cosmic hug", "laugh bubble", "care beam", "whirlwind happy",
      "golden moment", "heart spark", "zenith joy", "uplifter", "soul kiss",
      "moment of magic", "glad giggle", "sky joy", "light-spirit", "giddy beam",
      "delight cloud", "kiss of joy", "touched heart", "cheerstorm", "tender glee",
      "overflowing heart", "bright soul", "tickleburst", "flutter joy", "laugh pop",
      "humming heart", "smile-storm", "mirthquake", "heart giggle", "soul sparkle"
    ],
    
    Sadness: [
      "sad", "depressed", "miserable", "unhappy", "sorrow", "grief", "melancholy",
      "heartbroken", "down", "blue", "gloomy", "despair", "despondent", "tearful",
      "weeping", "crying", "dismal", "mournful", "forlorn", "lonely", "hopeless",
      "anguish", "woe", "distressed", "downcast", "brokenhearted", "somber",
      "wistful", "sullen", "bereaved", "troubled", "regretful", "remorseful",
      "pensive", "hurt", "abandoned", "forsaken", "bleak", "unloved", "downhearted",
      "demoralized", "devastated", "crushed", "defeated", "pained", "miserly",
      "doleful", "afflicted", "inconsolable", "downhill", "in despair", "sunken",
      "withdrawn", "isolated", "lost", "ashamed", "miserableness", "lamenting",
      "guilt-ridden", "heavy-hearted", "morose", "discouraged", "troubled",
      "oppressed", "bitter", "cold", "mourn", "anguished", "tormented", "drowning",
      "moody", "numb", "broken", "emptiness", "hollow", "dispirited", "apathetic",
      "tired", "exhausted", "sluggish", "dejected", "joyless", "shadowed",
      "low-spirited", "low", "melancholia", "suffering", "heartache", "disheartened",
      "crybaby", "pity", "regret", "grieving", "mourning", "torment", "ache",
      "sick", "weary", "alienated", "pitiful", "misery", "saddened", "grief-stricken",
      "rainy", "gray", "solitary", "detached", "cold-hearted", "languish",
      "hopelessness", "heart-sick", "melodramatic", "somberness", "wrung",
      "grievous", "exiled", "outcast", "discarded", "resentful", "stricken",
      "devastation", "loneliness", "melting", "sagging", "sunless", "eclipsed",
      "overshadowed", "marginalized", "neglected", "shunned", "humiliated",
      "worthless", "despairing", "sadfaced", "uncheerful", "unhopeful", "crummy",
      "doomed", "downtrodden", "disconsolate", "unfulfilled", "guilt", "pain",
      "blues", "overwhelmed", "overburdened", "uncertain", "bleeding", "drenched",
      "unsettled", "wounded", "bruised", "vacant", "meaningless", "cheerless",
      "lamentation", "unmoved", "desolate", "abject", "fading", "drained",
      "lost-hearted", "dismayed", "deplorable", "somberly", "without joy",
      "discouraging", "hopelessly", "weak", "despondency", "tormenting",
      "shaky", "lonesome", "grievance", "obscured", "miser", "tragic", "pained",
      "bemoaning", "agonized", "ungrateful", "downspirit", "meltdown", "non-smiling",
      "bleed", "choked", "damaged", "unseen", "ignored", "gritty", "torn", "shattered",
      "dim", "faint", "oversensitive", "foggy", "lifeless", "listless", "numbed",
      "dysphoric", "lamented", "bleakness", "solemn", "guiltiness", "troubledness",
      "dreary", "tearjerker", "yearning", "aching", "desperation", "unresolved",
      "resentment", "gloom", "withering", "flawed", "unworthy", "regretfully",
      "rejected", "tainted", "polluted", "despairful", "deadened", "detachedness",
      "dejectedly", "coldness", "grim", "fading hope", "dimming", "dullness",
      "shadow", "chill", "grayness", "depression", "clouded", "wilted", "tiredness",
      "trauma", "affliction", "lackluster", "cold gaze", "longing", "muzzled",
      "grievingly", "battered", "forgone", "denied", "muted", "unspoken pain",
      "held back", "held in", "flooded", "trapped", "helpless", "inhibited",
      "restrained", "paralyzed", "paralyzing", "fog", "mist", "veil", "covered",
      "closed off", "repressed", "hopeless gaze", "pessimistic", "grimness",
      "sleepless", "insomniac", "deadened", "emotionless", "flattened", "abandonment",
      "forsaking", "burned out", "weakened", "drowned", "hidden tears", "disrespected",
      "unvalued", "inferior", "devoured", "unheard", "overlooked", "dismissed",
      "denial", "sacrificed", "grayed", "suffocated", "wordless", "silent cries",
      "disillusioned", "darkened", "cursed", "doom", "dread", "traumatized",
      "scorned", "cried out", "weeping heart", "crushed soul", "aching heart",
      "loveless", "absence", "dreadful", "muzzling", "undone", "undervalued",
      "irreparable", "loner", "friendless", "suffering silence", "trembling",
      "muteness", "slumped", "sunken eyes", "bleeding heart", "mellow sadness",
      "depthless", "shadowed soul", "deep ache", "bitter tears", "unwanted",
      "hiding", "hollow laugh", "empty smile", "masking pain", "buried emotion",
      "silent sorrow", "inner ache", "hurting", "internal scream", "aching soul",
      "closed heart", "sorrowful", "unseen suffering", "quiet pain", "lonely soul",
      "drifting", "uncared", "gray thoughts", "muted emotions", "dimmed soul",
      "emotionless mask", "withheld", "lifeless stare", "abandoning", "dark veil",
      "closed in", "curled up", "fading spirit", "tired soul", "hollow body",
      "internal storm", "burdened", "storm within", "uncried tears", "lost cause",
      "confined", "trapped feeling", "repressed emotion", "invisible pain",
      "sunless heart", "aching quietly", "hurt soul", "guilt-soaked", "regret-stained",
      "sinking", "emotional weight", "dragged down", "lost inside", "broken dreams",
      "shattered inside", "hopeless yearning", "muffled cries", "disoriented",
      "uncertain soul", "directionless", "joyless day", "gray mornings",
      "black nights", "sleepless nights", "empty heart", "undone feeling",
      "lonely nights", "silent rooms", "echoes of pain", "buried grief",
      "old wounds", "aching past", "long-lost joy", "tired eyes", "emotion fatigue",
      "endless ache", "hurtful silence", "stolen joy", "relentless grief",
      "exhaustion of spirit", "unbearable loss", "weight of the world"
  ],

    Anger: [
  "angry", "furious", "rage", "mad", "annoyed", "irritated", "agitated", "resentful", "hostile", "outraged",
  "enraged", "infuriated", "cross", "exasperated", "incensed", "indignant", "offended", "frustrated", "wrathful", "boiling",
  "fuming", "seething", "vengeful", "bitter", "displeased", "irate", "provoked", "disgruntled", "upset", "snappy",
  "grumpy", "snarling", "hateful", "hatred", "violence", "temper", "blazing", "stormy", "ticked-off", "burning",
  "pissed", "peeved", "sulky", "bristling", "aggravated", "miffed", "testy", "heated", "antagonistic", "menacing",
  "critical", "unpleasant", "moody", "combative", "quarrelsome", "touchy", "explosive", "contemptuous", "sarcastic", "spiteful",
  "abusive", "belligerent", "vindictive", "malicious", "irascible", "grievous", "disturbed", "insulted", "provocative", "insolent",
  "pouting", "stubborn", "wrangling", "accusatory", "biting", "scathing", "harsh", "storming", "grinding", "raging",
  "boiling-over", "threatening", "turbulent", "hostility", "abrasive", "wounded", "discontent", "irritation", "screaming", "yelling",
  "tantrum", "snapping", "gritting", "growling", "scowling", "backbiting", "nasty", "rude", "mean", "disgusted",
  "detesting", "cursing", "glowering", "resentment", "demanding", "unreasonable", "clenched", "revengeful", "venomous", "grudging",
  "pessimistic", "nervous", "loathing", "sneering", "nagging", "nitpicky", "defiant", "dissatisfied", "critical", "sabotaging",
  "alienated", "unforgiving", "cold", "grumbling", "complaining", "jealous", "envious", "accusing", "negative", "snide",
  "manipulative", "judgmental", "pugnacious", "combustible", "destructive", "oppositional", "cynical", "reproachful", "vengeance", "harboring",
  "hard-hearted", "volatile", "reactionary", "harsh-tongued", "belligerence", "belittling", "impatient", "intolerant", "uncooperative", "uptight",
  "defensive", "unsympathetic", "cold-hearted", "uncompromising", "argumentative", "temperamental", "irritable", "obsessive", "exploding", "grudge-holding",
  "hurtful", "despising", "pressuring", "controlling", "rebellious", "bossy", "aggressor", "instigating", "exacting", "persecuting",
  "unjust", "pressured", "belligerently", "snapping-back", "whining", "mocking", "shouting", "taunting", "triggered", "defensive",
  "demeaning", "sarcasm", "toxic", "disdainful", "annoyance", "short-tempered", "temperamental", "violent", "hostileness", "simmering",
  "retaliating", "demanding", "persecuted", "judging", "embittered", "reviling", "frightening", "naggingly", "yelling-at", "scoffing",
  "bashing", "domineering", "oppressive", "unsatisfied", "chafing", "pouting", "rebellion", "overreacting", "snippy", "jeering",
  "slanderous", "venom", "malice", "ruthless", "merciless", "inhuman", "oppositional", "brutal", "imposing", "disputing",
  "hypercritical", "condescending", "blaming", "demanded", "begrudging", "taunted", "cornered", "harassed", "persecutor", "sharp",
  "overwhelmed", "conflicted", "alienating", "pushy", "reproaching", "inflexible", "disrespected", "aggressiveness", "furor", "hostilities",
  "hysterical", "truculent", "spiky", "vengefully", "overbearing", "firestorm", "confrontational", "detesting", "exploded", "scolding",
  "punchy", "combusting", "clashing", "maddened", "temper-flaring", "bitterness", "slander", "hatefulness", "derisive", "violent-temper",
  "tantruming", "bickering", "eye-rolling", "stormed", "yelled", "glared", "scoffed", "swore", "fussed", "ranted",
  "railed", "muttered", "snubbed", "clashed", "fought", "quipped", "sassed", "barked", "griped", "objected",
  "protested", "smacked", "punched", "kicked", "slammed", "shoved", "scratched", "hurled", "pounded", "slapped",
  "grimaced", "sneered", "cursed", "jabbed", "taunt", "mocked", "intimidated", "cornered", "assaulted", "demand",
  "pressured", "rebelled", "interrogated", "commanded", "coerced", "threatened", "scared", "dominated", "manhandled", "bit",
  "smashed", "kicked", "thrashed", "squabbled", "pestered", "bossed", "overheated", "snarled", "banged", "clobbered",
  "tackled", "howled", "growled", "storm", "irate", "exploded", "objected", "offensive", "punishing", "cornering"
   ],  

   Fear: [
    "afraid", "scared", "terrified", "nervous", "anxious", "worried", "alarmed", "apprehensive",
    "panicked", "horrified", "frightened", "startled", "shaken", "disturbed", "uneasy", "unsettled",
    "tense", "jumpy", "timid", "shy", "spooked", "hysterical", "intimidated", "petrified", "hunted",
    "insecure", "paranoid", "alert", "defensive", "cautious", "edgy", "creeped out", "creepy",
    "on edge", "high-strung", "hesitant", "tentative", "freaked out", "skittish", "agitated",
    "dreadful", "pale", "quivering", "shivering", "trembling", "numb", "frozen", "anxious",
    "uncomfortable", "suspicious", "distrustful", "panicky", "threatened", "dazed", "phobic",
    "avoidant", "hypervigilant", "tight-chested", "gut-clenching", "goosebumps", "spine-chilling",
    "ghastly", "eerie", "haunted", "choked", "stifled", "overwhelmed", "troubled", "disoriented",
    "intense", "worried sick", "suffocating", "cornered", "pressured", "fearful", "ghastly",
    "mortified", "shocked", "uncertain", "appalled", "fainthearted", "cowed", "cringing",
    "dangerous", "shuddering", "pale-faced", "anxiety-ridden", "hair-raising", "menacing",
    "doubtful", "recoiling", "running", "fleeing", "avoiding", "dreading", "hiding", "chilled",
    "shaking", "distressed", "unstable", "nervy", "mental fog", "eyes wide", "fear-stricken",
    "freaking out", "ghostly", "lost", "powerless", "hopeless", "claustrophobic", "cowering",
    "in dread", "full of dread", "shuddery", "creeped", "danger-aware", "unnerved", "trapped",
    "shaky", "heart pounding", "breathless", "faint", "panic-stricken", "trembly", "harassed",
    "pestered", "plagued", "unready", "stammering", "blindsided", "gasping", "unconfident",
    "crushed", "mentally stuck", "vulnerable", "overstimulated", "surprised", "out of control",
    "tight-lipped", "fearful thinking", "obsessive worry", "panic attack", "shy withdrawal",
    "mistrusting", "fear-motivated", "gut feeling", "looming dread", "imminent threat",
    "not safe", "not okay", "low self-esteem", "guilt-ridden", "irrational fear", "cold sweat",
    "crawling skin", "blackout fear", "tight throat", "fight-or-flight", "white-knuckled",
    "fidgety", "mental block", "troubled mind", "spooked out", "nervous wreck", "inner turmoil",
    "stressed", "alarmed response", "fear flash", "hesitating", "lingering doubt", "doom-feeling",
    "breath short", "trapped mind", "social anxiety", "existential dread", "terrorized",
    "overthinking", "mind racing", "startle-prone", "fright mode", "alert state", "bad vibes",
    "creepy vibe", "doubt", "unsure", "dizzy", "scared stiff", "shaky voice", "loss of control",
    "mind freeze", "fight response", "flight response", "shutdown", "blank mind", "uncanny",
    "paralyzed", "cornered feeling", "creepy silence", "foreboding", "sinister", "off-balance",
    "uncertain future", "dark feeling", "evasive", "uncanny fear", "instinctual fear",
    "emergency feeling", "mental alarm", "fear-based decision", "avoiding eye contact",
    "internal panic", "sinking feeling", "storm of thoughts", "consumed by fear",
    "crippling anxiety", "gut twist", "inhibited", "mental withdrawal", "vibe check failed",
    "withdrawn", "overcautious", "shell-shocked", "afraid to move", "silent scream",
    "adrenaline rush", "stark terror", "hyperaware", "deer in headlights", "ice cold feeling",
    "ghastliness", "dreaded", "fright night", "overwhelmed mind", "panic-driven", "reeling",
    "inner chaos", "nail-biting", "mind trapped", "tunnel vision", "emotional overwhelm",
    "emotional paralysis", "pre-trauma", "post-trauma", "worried thoughts", "inner tension",
    "frozen in fear", "trauma response", "upset", "cautiously optimistic", "ultra-defensive",
    "non-verbal fear", "physical fear", "emotional shutdown", "stress-driven", "fear spike",
    "nervous tick", "dread spiral", "nightmare thought", "fear echo", "tight stomach",
    "high anxiety", "racing heart", "mental suffocation", "dreadful expectation",
    "hypersensitive", "fear-driven behavior", "psychological terror", "preoccupied",
    "shaky hands", "sweaty palms", "rushed breath", "tight muscles", "fear loop",
    "fear reflex", "mental noise", "impending doom", "horrific", "hideaway feeling",
    "inner scream", "horrified gasp", "chaotic thoughts", "tight chest", "afraid to act",
    "hyperreactive", "cowering soul", "emotionally fragile", "mind spiraling",
    "feel trapped", "terror-struck", "distraught", "mental strain", "blinking fast",
    "gripping fear", "suffocated", "silent fear", "self-doubt", "weak knees",
    "fear in silence", "internal dread", "dreadful silence", "gut scream", "timid action",
    "helpless", "dazed and confused", "silent panic", "traumatized", "tight jaw",
    "speechless fear", "invisible threat", "unshakable dread", "intimidation",
    "emotional pressure", "threat simulation", "freeze response", "fear fog",
    "creeping feeling", "restless", "struggling to breathe", "trembling hands",
    "eyes darting", "afraid to sleep", "dark thoughts", "gripping dread", "emotional freeze",
    "uncontrollable fear", "unspoken fear", "negative anticipation", "phantom threat",
    "creepy suspicion", "under threat", "choked voice", "fear perception", "inner screaming",
    "locked inside", "emotion flood", "uncertain thoughts", "afraid to speak",
    "scared silence", "no way out", "panic sensation", "resisting danger", "mental retreat",
    "flight instinct", "survival mode", "worry loop", "fearing the worst"
    ],
    
    Love: ["love", "affection", "caring", "fond", "passion", "adore", "devotion", "infatuation", "tenderness", "attachment",
    "fondness", "amour", "intimacy", "endearment", "cherish", "devotedness", "desire", "worship", "compassion", "emotion",
    "sentiment", "warmth", "yearning", "liking", "romance", "sweetheart", "darling", "crush", "beloved", "honey",
    "soulmate", "connection", "devoted", "amorousness", "adoration", "true love", "puppy love", "heartthrob", "emotionally attached",
    "devotion", "heartsick", "over the moon", "enamored", "caress", "pining", "longing", "swooning", "heartfelt",
    "ardor", "fire", "intense feeling", "strong bond", "inseparable", "emotional bond", "mutual affection", "snuggles", "embrace", "kisses",
    "trust", "respect", "admiration", "romantic bond", "flame", "love-struck", "bliss", "partner", "togetherness", "loyalty",
    "marriage", "engagement", "union", "relationship", "couple", "deep affection", "significant other", "romantic interest", "heart connection", "dating",
    "courting", "wooing", "attachment", "fiancé", "girlfriend", "boyfriend", "deeply in love", "madly in love", "true companion", "flirtation",
    "affinity", "emotional closeness", "empathy", "sympathy", "sweetness", "cuddles", "devotion", "marital bond", "companionship", "cherishing",
    "deep feelings", "sincerity", "faithfulness", "together", "enduring love", "unbreakable bond", "affectionate", "caring deeply", "romantic gestures", "being there",
    "intense connection", "affectionate bond", "emotional support", "shared dreams", "lifelong bond", "pure love", "sacred bond", "warm embrace", "romantic longing", "emotional ties",
    "emotional warmth", "loving feelings", "hearts connected", "devoted heart", "unconditional love", "boundless love", "emotional intimacy", "emotional resonance", "wholesome affection", "kind-hearted love",
    "gentle affection", "graceful love", "soft touch", "intense romance", "ecstasy", "together forever", "everlasting love", "soul-deep connection", "touching moments", "heartwarming love",
    "shared life", "meaningful love", "everlasting bond", "comforting presence", "gentle caring", "affectionate touch", "radiating love", "inner warmth", "passionate feelings", "romantic heart",
    "belonging", "comfort", "harmony", "shared affection", "heart connection", "cupid’s arrow", "sincere affection", "affectionate glance", "long-term love", "intense attraction",
    "dream partner", "adoring gaze", "passionate embrace", "lovebirds", "emotional connection", "joyful love", "heart’s desire", "romantic bliss", "mutual respect", "shared values",
    "falling in love", "infatuated", "twin flame", "spiritual love", "faithful partner", "cherished moments", "devoted couple", "gentle hug", "hand in hand", "sweet talk",
    "stolen kiss", "dreamy eyes", "caring heart", "loyal heart", "companionate love", "unspoken bond", "meaningful connection", "supportive partner", "romantic soul", "caring gaze",
    "charming smile", "heartfelt emotion", "pure heart", "radiant love", "intimate moments", "sentimental love", "shared laughter", "everyday love", "spark", "emotional fire",
    "shared memories", "relationship goals", "happily ever after", "genuine love", "mutual admiration", "emotional safety", "love without conditions", "healing love", "unwavering love", "protective love",
    "sweet romance", "cherishing bond", "nurturing love", "magnetic attraction", "soul-binding love", "enchanting love", "timeless love", "storybook romance", "unshakeable love", "harmony in love",
    "serenity of love", "emotional peace", "soul-hug", "lifetime partner", "forever love", "beyond words", "romantic silence", "infinite care", "profound affection", "constant love",
    "deep bond", "strong connection", "everyday caring", "acts of love", "simple affection", "genuine caring", "love in actions", "adoring thoughts", "devoted embrace", "emotionally available",
    "bonded hearts", "soul-touching", "heartstring connection", "tender look", "mutual closeness", "intimate love", "calming love", "passionate kiss", "intimacy", "loving kindness",
    "heartwarming care", "wholesome connection", "hearts in sync", "flourishing love", "daily devotion", "soulful love", "endless love", "nurturing partner", "tender heart", "precious love",
    "constant companion", "endearing soul", "chivalry", "romantic spark", "deep emotional tie", "unbreakable union", "forever together", "true emotional intimacy", "love-inspired", "heart-centered",
    "lovers’ touch", "gentle soul", "beloved connection", "adored soul", "soft-hearted", "compassionate love", "empathic affection", "romantic journey", "shared path", "life partner",
    "romantic partner", "partner for life", "infinite devotion", "deep trust", "lasting passion", "mutual trust", "relationship energy", "connectedness", "romantic harmony", "trusted heart",
    "tender loving care", "treasured moments", "harmonious relationship", "heartfelt attachment", "trusted companion", "lovers’ journey", "constant affection", "affectionate memories", "intimacy and trust", "soul-sharing",
    "mutual giving", "unified hearts", "soul energy", "loved one", "caring soul", "romantic magic", "gentle support", "healing connection", "shared dreams", "intertwined hearts",
    "gentle energy", "sensitive affection", "deep connection", "heartfelt devotion", "warm connection", "true connection", "love flow", "trust and love", "devoted attention", "caring gestures",
    "heartful love", "nurturing energy", "romantic destiny", "relationship warmth", "soul-level love", "bonded deeply", "passionate soul", "sweet care", "heart’s warmth", "affection flow"
  ],

    Surprise: ["surprised", "shocked", "amazed", "astonished", "startled",
    "stunned", "speechless", "dumbfounded", "flabbergasted", "gobsmacked",
    "bewildered", "baffled", "perplexed", "confounded", "aghast",
    "astounded", "taken aback", "shook", "jolted", "jarred",
    "rattled", "staggered", "bowled over", "overwhelmed", "wide-eyed",
    "open-mouthed", "incredulous", "aghast", "stymied", "caught off guard",
    "floored", "nonplussed", "knocked for a loop", "in shock", "shell-shocked",
    "stupefied", "disconcerted", "in awe", "wonderstruck", "blindsided",
    "bedazzled", "dazed", "dumbstruck", "mind-blown", "wow-ed",
    "electrified", "trembling", "anxious", "nervous", "giddy",
    "gasping", "thunderstruck", "reeling", "flustered", "spooked",
    "zoned out", "dreamy", "in a daze", "startled awake", "spun out",
    "wondering", "alerted", "jarred awake", "sudden", "spontaneous",
    "caught off-guard", "jerked", "snapped out", "jolted awake", "on edge",
    "alarmed", "tensed", "bug-eyed", "confused", "puzzled",
    "mystified", "scratching head", "caught unaware", "unexpected", "unanticipated",
    "not ready", "frozen", "halted", "dropped jaw", "blinking",
    "staggering", "side-swiped", "sucker-punched", "in disbelief", "head-spinning",
    "freaked out", "panicked", "scared stiff", "rushed", "ambushed",
    "quickened", "breathless", "pulsing", "jittery", "quivering",
    "off balance", "thrown", "swayed", "wowed", "ecstatic surprise",
    "shivering", "electrified", "tingling", "spurred", "prodded",
    "excited", "elated", "uplifted", "thrilled", "delighted",
    "eager", "stimulated", "entranced", "captivated", "enchanted",
    "mesmerized", "hypnotized", "riveted", "spellbound", "amused",
    "tickled", "jubilant", "joyful", "pleased", "gratified",
    "gleeful", "giddy with excitement", "boisterous", "bubbling", "vibrant",
    "euphoric", "hyped", "buzzing", "supercharged", "amped",
    "in a whirl", "jubilant", "festive", "uplifted", "elated",
    "overjoyed", "suddenly happy", "pleasantly surprised", "smiling wide", "bursting with energy",
    "explosive emotion", "unexpected happiness", "cheered", "whooped", "chuckled",
    "giggled", "burst into laughter", "wide-eyed grin", "glowing", "bouncing with joy",
    "head in the clouds", "on cloud nine", "heavenly surprise", "unreal joy", "dreamlike",
    "storybook moment", "once in a lifetime", "serendipitous", "miraculous", "lucky break",
    "twist of fate", "fateful", "divine surprise", "out of the blue", "all of a sudden",
    "like magic", "as if by miracle", "what just happened?", "didn't see that coming", "out of nowhere",
    "snap realization", "epiphany", "brain spark", "revelation", "eureka moment",
    "sudden clarity", "lightbulb moment", "turning point", "game-changer", "life-altering",
    "unexpected shift", "curveball", "plot twist", "flip of events", "shockwave",
    "burst of insight", "moment of truth", "true colors revealed", "masked unveiled", "hidden truth exposed",
    "secrets uncovered", "the big reveal", "grand entrance", "dramatic twist", "mind twist",
    "mental whiplash", "emotional spike", "jump scare", "sudden noise", "bang!",
    "surge", "blitz", "hurricane of emotions", "rollercoaster", "fast-paced",
    "time froze", "everything paused", "slow motion feeling", "suspended", "hesitated",
    "breathtaking", "breath caught", "speech caught", "heart skipped", "blood rushed",
    "pulse raced", "goosebumps", "shivers down spine", "tingles", "eyes widened",
    "mouth agape", "fingers tingling", "sweaty palms", "heart pounding", "adrenaline rush",
    "knee-jerk", "reflexive", "spontaneous awe", "gut reaction", "instant emotion",
    "visceral", "intense", "deeply moved", "shocked to core", "soul stirred",
    "existential jolt", "cognitive dissonance", "reality check", "disruptive", "unsettled",
    "chaotic", "out of comfort zone", "disturbed", "unmoored", "in limbo",
    "adrift", "mentally flipped", "unhinged", "derailed", "off script",
    "unwritten", "off the cuff", "improvised", "spurred by moment", "split-second",
    "gut-wrenching", "breathtakingly odd", "curiously shocking", "haunted", "paranormal",
    "eerie", "uncanny", "unfamiliar", "alien", "extraordinary",
    "beyond belief", "otherworldly", "supernatural", "mythic", "legendary",
    "unexplainable", "strange", "weird", "odd", "freaky",
    "quirky", "bizarre", "unpredictable", "offbeat", "unusual",
    "mind-bending", "mystifying", "enigmatic", "curious", "suspenseful",
    "cliffhanger", "edge-of-seat", "mind racing", "eager anticipation", "surprise ending",
    "unexpected visitor", "chance encounter", "unforeseen result", "random act", "sudden appearance",
    "unplanned", "unintentional", "accidental", "serendipity", "twist of destiny",
    "a gift", "out of character", "breaking pattern", "unprecedented", "first time ever",
    "record-breaking", "jaw-dropping", "awe-inspiring", "mind-expanding", "eye-opening",
    "life-changing", "memorable", "shocking reveal", "world turned upside down", "unexpected breakthrough"],
  }

  const analyzeSentiment = (text: string) => {
    const lowerText = text.toLowerCase()
    const positiveMatches = positiveWords.filter(word => lowerText.includes(word))
    const negativeMatches = negativeWords.filter(word => lowerText.includes(word))

    if (positiveMatches.length > negativeMatches.length) return "Positive"
    if (negativeMatches.length > positiveMatches.length) return "Negative"
    return "Neutral"
  }

  const detectEmotion = (text: string) => {
    const lowerText = text.toLowerCase()
    let matchedEmotion = "Neutral"
    let maxMatches = 0

    for (const [emotion, words] of Object.entries(emotionCategories)) {
      const matches = words.filter(word => lowerText.includes(word)).length
      if (matches > maxMatches) {
        matchedEmotion = emotion
        maxMatches = matches
      }
    }

    return matchedEmotion
  }

  const generateAgentTrace = (text: string) => {
    const lowerText = text.toLowerCase()
    let trace = "Matched Words:\n"

    for (const [emotion, words] of Object.entries(emotionCategories)) {
      const matches = words.filter(word => lowerText.includes(word))
      if (matches.length > 0) {
        trace += `- ${emotion}: ${matches.join(", ")}\n`
      }
    }

    return trace
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const sentimentResult = analyzeSentiment(text)
      const emotionResult = detectEmotion(text)
      setSentiment(sentimentResult)
      setEmotion(emotionResult)
      setIsAnalyzing(false)
    }, 1000)
  }

  const handleGenerateResponse = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setCreativeResponse(
        `✨ *Creative Response*: Imagine a world where the phrase "${text}" isn't just a sentence, but the spark of something greater — a beginning. What if those words shaped a journey through human connection, creativity, and purpose? In this imagined realm, your message becomes a compass, guiding hearts, inspiring minds, and transforming simple thoughts into powerful experiences. Every word you speak holds the potential to shift perspectives and spark change.`
      )
      setSentiment("Neutral")
      setEmotion("Neutral")
      setIsGenerating(false)
    }, 1000)
  }

  const handleTrace = () => {
    setIsTracing(true)
    setTimeout(() => {
      const trace = generateAgentTrace(text)
      setAgentTrace(`
        *Thought:* Do I need to use a tool? Yes
        *Action:* AnalyzeSentiment
        *Action Input:* "${text}"
        *Observation:* ${trace}
        *Thought:* Do I need to use a tool? Yes
        *Action:* GenerateCreativeResponse
        *Action Input:* "${text}"
        *Observation:* ✨ *Creative Response*: Imagine a world where "${text}" becomes the heart of a magical story. What adventures would unfold?
        *Thought:* I now have both a sentiment analysis and a creative response. I should provide these to the user.
        *AI Final Response:* I've analyzed your text and found that ${sentiment?.toLowerCase()} Additionally, here's a creative take: Imagine a world where "${text}" becomes the heart of a magical story. What adventures would unfold?
              `)
      setSentiment(trace)
      setCreativeResponse(trace)
      setIsTracing(false)
    }, 1000)
  }

  const emotionIcon = (emotion: string | null) => {
    switch (emotion) {
      case "Joy": return <Smile className="text-yellow-400" />
      case "Sadness": return <Frown className="text-blue-400" />
      case "Anger": return <Flame className="text-red-600" />
      case "Fear": return <Zap className="text-purple-500" />
      case "Love": return <Heart className="text-pink-500" />
      case "Surprise": return <Info className="text-orange-400" />
      default: return <Meh className="text-gray-400" />
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="text-purple-500" />
          Sentiment & Emotion Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />

        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : "Analyze Sentiment & Emotion"}
          </Button>
          <Button onClick={handleGenerateResponse} disabled={!sentiment || !emotion || isGenerating}>
            {isGenerating ? "Generating..." : "Generate Creative Response"}
          </Button>
          <Button variant="secondary" onClick={handleTrace} disabled={!sentiment || isTracing}>
            {isTracing ? "Tracing..." : "Agent Trace"}
          </Button>
        </div>

        {sentiment && (
          <div className="flex items-center gap-2">
            {sentiment === "Positive" ? (
              <CheckCircle className="text-green-500" />
            ) : sentiment === "Negative" ? (
              <AlertCircle className="text-red-500" />
            ) : (
              <Info className="text-gray-500" />
            )}
            <Badge variant="outline" className="text-sm">Sentiment: {sentiment}</Badge>
          </div>
        )}

        {emotion && (
          <div className="flex items-center gap-2">
            {emotionIcon(emotion)}
            <Badge variant="outline" className="text-sm">Emotion: {emotion}</Badge>
          </div>
        )}

        {creativeResponse && (
          <div className="flex items-start gap-2 mt-4">
            <Bot className="text-blue-500 mt-1" />
            <div className="text-muted-foreground">{creativeResponse}</div>
          </div>
        )}

        {agentTrace && (
          <pre className="text-xs text-gray-400 whitespace-pre-wrap mt-2">{agentTrace}</pre>
        )}
      </CardContent>
    </Card>
  )
}
