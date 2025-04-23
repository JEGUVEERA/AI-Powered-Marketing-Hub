// utils/sentimentUtils.ts

export const emotion: Record<string, string[]> = {
  joy: ["happy", "joy", "delighted", "cheerful", "smile", "grateful", "optimistic", "excited","happy", "joy", "delighted", "cheerful", "content", "smile", "grateful", "excited", "lively", "radiant","optimistic", "laugh", "gleeful", "blissful", "ecstatic", "jubilant", "elated", "satisfied", "thrilled","merry", "sunny", "glowing", "lighthearted", "playful", "uplifted", "thankful", "euphoric", "chipper","bubbly", "rejoicing", "exhilarated", "tickled", "overjoyed", "buoyant", "contented", "heartwarming","vivacious", "sparkling", "beaming", "giddy", "cheery", "zestful", "upbeat", "blithe", "perky", "radiating","joyous", "elation", "glee", "mirth", "jovial", "sunshine", "gratified", "serene", "peaceful", "fulfilled","enthusiastic", "eager", "spirited", "animated", "effervescent", "breezy", "carefree", "light-hearted","exultant", "gladsome", "jocund", "jolly", "jubilance", "merriment", "over the moon", "on cloud nine","walking on air", "in high spirits", "tickled pink", "chuffed", "blessed", "smiling", "laughing", "grinning","beaming", "radiating happiness", "cheerfulness", "good spirits", "high-spirited", "sunny disposition","positive vibes", "inner peace", "contentment", "satisfaction", "delight", "pleasure", "enjoyment","amusement", "rejoice", "celebration", "festive", "gladness", "happiness", "ecstasy", "euphoria","rapture", "bliss", "nirvana", "utopia", "heavenly", "paradise", "tranquility", "serenity", "calmness","composure", "relaxation", "ease", "comfort", "well-being", "balance", "harmony", "equanimity","gratitude", "appreciation", "thankfulness", "acknowledgment", "recognition", "praise", "admiration","respect", "esteem", "affection", "love", "fondness", "devotion", "adoration", "passion", "infatuation","romance", "tenderness", "warmth", "caring", "compassion", "empathy", "sympathy", "kindness","generosity", "altruism", "benevolence", "philanthropy", "humanity", "goodness", "virtue", "morality","ethics", "integrity", "honesty", "sincerity", "authenticity", "genuineness", "truthfulness", "openness","transparency", "clarity", "insight", "wisdom", "knowledge", "understanding", "awareness", "consciousness","mindfulness", "presence", "focus", "attention", "concentration", "engagement", "involvement", "participation","interaction", "communication", "connection", "relationship", "bond", "friendship", "companionship","partnership", "collaboration", "cooperation", "teamwork", "unity", "solidarity", "community", "society","culture", "tradition", "heritage", "history", "legacy", "memory", "nostalgia", "sentiment", "emotion","feeling", "sensation", "perception", "experience", "expression", "creativity", "imagination", "innovation","inspiration", "motivation", "aspiration", "ambition", "goal", "dream", "vision", "purpose", "meaning","significance", "value", "belief", "faith", "hope", "trust", "confidence", "courage", "bravery", "strength","resilience", "perseverance", "determination", "willpower", "discipline", "commitment", "dedication","loyalty", "devotion", "service", "duty", "responsibility", "accountability", "reliability", "dependability","consistency", "stability", "security", "safety", "protection", "support", "assistance", "help", "aid","relief", "comfort", "solace", "consolation", "encouragement", "reassurance", "hopefulness", "optimism","positivity", "cheerfulness", "joyfulness", "happiness", "delightfulness", "pleasure", "enjoyment","amusement", "entertainment", "fun", "laughter", "humor", "comedy", "joke", "wit", "banter", "jest","playfulness", "mischief", "prank", "trick", "surprise", "wonder", "awe", "amazement", "astonishment","marvel", "miracle", "magic", "fantasy", "dream", "imagination", "creativity", "art", "music", "dance","theater", "performance", "expression", "emotion", "feeling", "sensation", "perception", "experience","awareness", "consciousness", "mindfulness", "presence", "focus", "attention", "concentration","engagement", "involvement", "participation", "interaction", "communication", "connection", "relationship","bond", "friendship", "companionship", "partnership", "collaboration", "cooperation", "teamwork", "unity","solidarity", "community", "society", "culture", "tradition", "heritage", "history", "legacy", "memory","nostalgia", "sentiment", "emotion", "feeling", "sensation", "perception", "experience", "expression","creativity", "imagination", "innovation", "inspiration", "motivation", "aspiration", "ambition", "goal","dream", "vision", "purpose", "meaning", "significance", "value", "belief", "faith", "hope", "trust","confidence", "courage", "bravery", "strength", "resilience", "perseverance", "determination", "willpower","discipline", "commitment", "dedication", "loyalty", "devotion", "service", "duty", "responsibility","accountability", "reliability", "dependability", "consistency", "stability", "security", "safety",
  "protection", "support","assistance", "help", "aid", "relief", "comfort", "solace", "consolation", "encouragement","reassurance", "hopefulness", "optimism", "positivity", "cheerfulness", "joyfulness", "happiness","delightfulness", "pleasure", "enjoyment", "amusement", "entertainment", "fun", "laughter", "humor","comedy", "joke", "wit", "banter", "jest", "playfulness", "mischief", "prank", "trick", "surprise","wonder", "awe", "amazement", "astonishment", "marvel", "miracle", "magic", "fantasy", "dream","imagination", "creativity", "art", "music", "dance", "theater", "performance", "expression"
  ],
  love: ["love", "affection", "adoration", "devotion", "fondness", "passion", "romance", "intimacy","attachment", "endearment", "cherish", "care", "tenderness", "warmth", "caring", "compassion","empathy", "kindness", "generosity", "altruism", "benevolence", "philanthropy", "humanity","goodness","virtue" ],

  compassion: ["compassion", "empathy", "kindness", "generosity", "altruism", "benevolence", "philanthropy","humanity", "goodness", "virtue", "morality", "ethics", "integrity", "honesty", "sincerity","authenticity", "genuineness", "truthfulness", "openness", "transparency", "clarity", "insight","wisdom", "knowledge", "understanding", "awareness", "consciousness"],

  gratitude: ["thankful", "appreciative", "grateful", "obliged", "indebted", "recognition","acknowledgment", "praise", "admiration", "respect", "esteem", "affection", "love","fondness","devotion","adoration","passion","infatuation"],

  optimism: ["optimistic", "hopeful", "positive", "confident", "upbeat", "cheerful", "bright","promising", "encouraging", "supportive", "uplifting", "inspiring", "motivating", "reassuring","assuring", "trusting", "faithful", "believing", "expectant", "anticipating"],

  hope: ["hope", "optimism", "aspiration", "dream", "belief", "faith", "trust", "confidence","expectation","anticipation", "positivity", "encouragement", "support", "upliftment", "inspiration","motivation"],

  excitement: ["excited", "enthusiastic", "eager", "animated", "exhilarated", "thrilled", "pumped","energized", "buzzing", "electrified", "stimulated", "fired up", "jazzed up", "on fire","on cloud nine"],

  frustration: ["frustrated", "annoyed", "irritated", "upset", "discouraged", "fed up","frustrated", "annoyed", "irritated", "fed up", "disappointed", "exasperated", "upset", "stuck", "blocked",
    "bothered", "overwhelmed", "displeased", "discouraged", "aggravated", "tired", "burned out", "defeated",
    "powerless", "sigh", "ugh", "exhausted", "helpless", "inconvenienced", "unfulfilled", "restless",
    "miffed", "infuriated", "vexed", "pissed off", "grumpy", "disgruntled", "angsty", "bitter", "irate",
    "resentful", "fuming", "flustered", "short-tempered", "snappy", "moody", "cranky", "sour", "testy",
    "on edge", "tense", "uptight", "edgy", "troubled", "worn out", "mentally drained", "done with it",
    "ticked off", "enraged", "out of patience", "had enough", "about to snap", "on the verge", "choking on it",
    "boiling inside", "can’t take it anymore", "in turmoil", "emotionally drained", "in a bad mood",
    "blowing a fuse", "pulling my hair out", "in a rut", "feeling stuck", "backed into a corner", "clenched",
    "fed to the teeth", "wound up", "losing my cool", "losing patience", "irritated beyond belief",
    "emotionally blocked", "mentally blocked", "brain fog", "clouded mind", "out of sorts", "faintly enraged",
    "boiling over", "reaching my limit", "unsatisfied", "under pressure", "in a bind", "trapped", "stifled",
    "not in control", "feeling useless", "ignored", "not heard", "left behind", "pushed aside", "marginalized",
    "invisible", "torn", "conflicted", "unsure", "dissatisfied", "cynical", "jaded", "apathetic",
    "low motivation", "no energy", "dragging myself", "not again", "numb", "disheartened", "lethargic",
    "strained", "anxious", "twitchy", "itchy", "raw nerves", "high strung", "internally screaming",
    "screaming inside", "rage bubbling", "gritting teeth", "white-knuckling it", "barely holding on",
    "done dealing", "hitting a wall", "slammed", "frayed", "emotionally frayed", "overcapacity",
    "reached threshold", "meltdown mode", "temper rising", "no bandwidth", "saturated", "emotionally overloaded",
    "brain meltdown", "shutdown mode", "storming inside", "tornado in my head", "emotional clutter",
    "wired but tired", "mental gridlock", "jammed", "irritable", "whiny", "complaining", "nagged", "nagging feeling",
    "drained", "crushed under pressure", "blown gasket", "flicked off", "mad", "rattled", "snapped", "rageful",
    "in denial", "can't focus", "lost interest", "checked out", "tuned out", "coiled", "on the brink",
    "emotionally constipated", "banging my head", "run down", "out of gas", "emotionally stuck", "feeling useless",
    "repeating problems", "no resolution", "pointless", "hopeless", "circling thoughts", "looped in anger",
    "emotionally explosive", "silently suffering", "mental fatigue", "on my last nerve", "irritably impatient"],

  confidence: ["confident", "bold", "capable", "assured", "certain", "secure","confident", "assured", "secure", "positive", "certain", "self-assured", "empowered", "bold", "capable", "unshakable", 
        "determined", "self-reliant", "assertive", "strong", "self-confident", "unwavering", "resolute", "brave", "daring", 
        "undaunted", "fearless", "unfaltering", "steady", "unperturbed", "self-sufficient", "self-belief", "decisive", 
        "composed", "unflappable", "optimistic", "reliable", "independent", "unmovable", "surefooted", "in control", 
        "stoic", "unrattled", "uncompromising", "unshaken", "persistent", "relentless", "intrepid", "assuredly", 
        "unhesitant", "firm", "dominant", "cool-headed", "self-reliant", "unwavering", "steady-handed", "proven", "proficient", 
        "successful", "commanding", "unconstrained", "trustworthy", "focused", "accomplished", "competent", "composed", 
        "unflinching", "audacious", "resilient", "goal-oriented", "fearless leader", "driven", "undeterred", "unshaken", 
        "accomplished", "capable", "empowered", "infallible", "masterful", "reliable", "steady", "positive-thinking", 
        "unrelenting", "decisive", "bold", "dominant", "self-assured", "at ease", "unintimidated", "self-reliant", 
        "unafraid", "in charge", "self-sustained", "unstoppable", "mentally strong", "forceful", "unbroken", "gutsy", 
        "stable", "mastermind", "in control", "determined", "motivated", "unbothered", "determined", "assertive"],

  fear: ["fear", "afraid", "scared", "terrified", "frightened", "petrified", "alarmed", "panicked","worried", "nervous", "anxious", "uneasy", "restless", "jumpy", "spooked", "startled","shocked", "apprehensive", "dreadful", "horrified", "distressed", "shaken up","overwhelmed", "freaked out"],

  sadness: ["sad", "depressed", "unhappy", "heartbroken", "miserable", "gloomy","sad", "sorrow", "grief", "depressed", "unhappy", "heartbroken", "disappointed", "melancholy", "mournful","despairing", "gloomy", "downcast", "dismal", "woeful", "distressed", "anguished", "despondent","disheartened", "regretful", "lonely", "isolated", "betrayed", "hurt", "humiliated", "embarrassed","offended", "defensive", "irritated", "hostile", "vengeful","sad", "unhappy", "gloomy", "depressed", "sorrow", "cry", "tears", "melancholy", "blue", "heartbroken","miserable", "grief", "lonely", "downcast", "despair", "dismal", "forlorn", "woeful", "disheartened","hopeless", "bitter", "troubled", "crushed", "wailing", "mournful", "wistful", "regretful", "choked up","aching", "morose", "dejected", "low-spirited", "tearful", "dreary", "somber","sad", "unhappy", "gloomy", "depressed", "sorrow", "cry", "tears", "melancholy", "blue", "heartbroken","miserable", "grief", "lonely", "downcast", "despair", "dismal", "forlorn", "woeful", "disheartened","hopeless", "bitter", "troubled", "crushed", "wailing", "mournful", "wistful", "regretful", "choked up","aching", "morose", "dejected", "low-spirited", "tearful", "dreary", "somber", "sunken", "weeping","brokenhearted", "desolate", "bereft", "grieving", "lost", "pained", "withdrawn", "misery", "downhearted","hurting", "inconsolable", "lamenting", "distraught", "shattered", "pensive", "downbeat", "resigned","bleak", "dispirited", "heartsick", "meltdown", "afflicted", "isolated", "devastated", "longing","yearning", "tragic", "abandoned", "unloved", "pain-stricken", "anguish", "overwhelmed", "fragile","misunderstood", "neglected", "bruised", "aching heart", "emptiness", "unfulfilled", "hopelessness","cold", "silent tears", "lost hope", "aching soul", "guilt-ridden", "remorseful", "misfortune","shadowed", "suffering", "gone", "dull", "meltdown", "drowning", "numb", "ignored", "weary", "darkness","aching inside", "sighing", "depressing", "haunted", "suffocated", "anhedonia", "mourning", "hurt","downhill", "vanishing", "painful", "grief-stricken", "outcast", "confined", "abandoned", "let down",],

  disappointment: ["disappointed", "let down", "displeased", "dissatisfied", "disheartened","frustrated", "unfulfilled", "discontented", "disillusioned", "disgruntled","unimpressed", "unsatisfied", "unhappy", "discontent", "disparaged", "disparaging","ungrateful", "resentful"],

  anxiety: ["nervous", "anxious", "worried", "uneasy", "restless", "panicked","nervous", "anxious", "worried", "uneasy", "tense", "scared", "panicked", "restless", "afraid", "nervy",
        "jittery", "sweating", "dizzy", "shaky", "apprehensive", "freaked out", "timid", "dread", "paranoid",
        "racing heart", "clammy", "numb", "insecure", "uneasiness", "phobic", "hypervigilant", "tight chest",
        "startled", "fearful", "jumpy", "trembling", "pacing", "choked up", "on edge", "worried sick",
        "panic attack", "suffocating", "shallow breathing", "inner turmoil", "overthinking", "mind racing",
        "rattled", "flighty", "churning stomach", "twitchy", "preoccupied", "sleepless", "doubtful",
        "overstimulated", "fidgety", "paralyzed", "excessive worry", "fear of the worst", "tight throat",
        "avoiding", "withdrawn", "blank mind", "worrywart", "obsessive thoughts", "breathless", "impending doom",
        "can’t focus", "can’t breathe", "inner chaos", "high strung", "jumping at sounds", "checking constantly",
        "edge of breakdown", "mental fog", "tension headache", "nagging fear", "inward collapse",
        "self-doubting", "dry mouth", "racing thoughts", "helpless", "tightness", "self-conscious", "pale", "sinking feeling",
        "mentally frozen", "stiff muscles", "avoidance", "overalert", "tight jaw", "grinding teeth", "ruminating",
        "frozen with fear", "muscle cramps", "internal panic", "drenched in sweat", "no appetite", "butterflies in stomach"],

  anger: ["angry", "furious", "rage", "mad", "irritated", "hostile","angry", "furious", "rage", "mad", "irritated", "outraged", "annoyed", "fuming", "resentful", "agitated","enraged", "livid", "hostile", "bitter", "wrathful", "indignant", "cross", "infuriated", "seething","provoked", "irate", "disgusted", "boiling", "gritted teeth", "stormed", "snapped", "yelled", "barked","glared", "grumpy", "temper", "short-tempered", "pissed", "blazing", "vengeful", "bristling", "raging","slammed", "exploded", "kicked off", "boiling over", "red-faced", "gritting teeth", "hands clenched","raised voice", "overheated", "bursting", "spat", "hissed", "screamed", "howled", "temper tantrum","banged", "cussed", "cursed", "foul-mouthed", "irascible", "hot-headed", "snarled", "growled", "flared","retaliated", "lash out", "blurted", "snapped back", "stomped", "slammed door", "went off", "on edge","miffed", "peeved", "incensed", "fierce", "boiled", "uncontrollable", "displeased", "tantrum", "punching","threw fit", "sulking", "blow up", "ticked off", "blasted", "burning with anger", "cutting", "caustic","bitter tone", "ice cold", "snippy", "venomous", "sharp-tongued", "acidic", "sarcastic fury", "grumbling","frowned", "accusatory", "belligerent", "hostility", "verbal attack", "temperamental", "losing it","flipping out", "unhinged", "intolerant", "disrespected", "holding a grudge", "retorted", "revengeful","cold rage", "staring daggers", "puffed up", "heated", "prickly", "combative", "simmering", "mean","glowering", "spiteful", "cutting words", "feeling disrespected", "volatile", "boiling point", "snapping","retaliation", "mocking", "fighting words", "flustered", "quarrelsome", "sarcastic", "criticizing harshly","threatening", "punchy", "vengeance", "ranting", "flipped", "cracked", "temper spike", "testy", "grudgeful","pouting", "burning", "trembling with rage", "steaming", "snorting", "backbiting", "bashing", "judgmental","offended", "stiff tone", "sassy", "combustive", "screeching", "nagging", "disdainful", "sneering", "roared","grievance", "lecturing", "berating", "torqued", "scolding", "biting tone", "fury", "tantruming", "venom","explosive", "kicked things", "threw phone", "destroyed", "broke things", "flailing", "ruthless", "pushy","triggered", "militant", "retorted", "smacked", "shoved", "recoiled", "hit back", "defensive", "offensive","argumentative", "stubborn", "inflicted", "slapped", "grunted", "harrumphed", "rolled eyes", "mocked","destructive", "clenched jaw", "yanked", "snubbed", "slurred", "tensed", "pounded", "charged", "bashing","devastated (in fury)", "jeering", "accused", "boiling inside", "stinging words", "insulted", "cuss words","thundered", "grimaced", "soured", "bitter remarks", "violent", "stormed off", "threw hands", "clashed","clenched fists", "fuming silence", "biting sarcasm", "verbal abuse", "menacing", "scowling", "snide","brutal honesty", "retaliating", "punch lines", "criticized", "disrupted", "argued", "battling", "warring","tension", "belligerence", "hypercritical", "hot-tempered", "intense glare", "deep frown", "mouth tight","jaw locked", "vengeful stare", "fire in eyes", "angsty", "mean-spirited", "cold tone", "ice in voice","furious", "rage", "fury", "irritated", "hostile", "aggressive", "annoyed", "enraged", "outraged", "infuriated",
        "wrath", "irate", "livid", "incensed", "fuming", "seething", "heated", "mad", "exasperated", "offended", 
        "displeased", "provoked", "bitter", "vengeful", "spiteful", "disgusted", "scornful", "resentful", "agitated", 
        "unsettled", "volatile", "upset", "sulking", "incensed", "indignant", "unforgiving", "irritating", "disgruntled", 
        "cross", "in a huff", "infuriating", "on edge", "heated", "short-tempered", "ticked off", "mad as hell", "fury", 
        "boiling", "wrathful", "exasperating", "frustrating", "vexed", "blazing", "cranky", "ranting", "huffy", "stormy", 
        "angst", "spitting mad", "teed off", "snappy", "sore", "outrageous", "combative", "irritation", "stewing", "perturbed",
        "angry", "outraged", "tempestuous", "fiery", "displeasure", "perturbed", "wrathful", "abominable", "madder", 
        "unhappy", "impatient", "fiendish", "lacerating", "scalding", "turbulent", "malicious", "scathing", "bitterly", 
        "aggressive", "wrathfully", "agitated", "boiling over", "incensed", "savage", "revolting", "overcome with anger", 
        "hostility", "irritated beyond belief", "foul-mouthed", "vindictive", "caustic", "passionate", "irritable", 
        "vengeful", "irascible", "wrathful", "furiously", "snarling", "rage-fueled", "stirred up", "incendiary", "impeachable",
        "upset beyond words", "outraged", "fuming", "insulted", "tempestuous", "seething", "spiteful", "disrespected", 
        "reviled", "furiously", "full of rage", "burning", "intolerable", "infuriated beyond measure", "reckless", "unforgiving",
        "unrelenting", "unforgiving", "unpleasantly", "unruly", "unsettled", "untrusting", "untrustworthy",],

  sarcasm: ["yeah right", "totally", "sure", "as if", "good luck with that","yeah, right", "sure, whatever", "oh, really?", "that’s just great", "totally", "as if", "seriously?", "sure thing", 
        "yeah, like that’s going to happen", "great idea", "just wonderful", "you don't say", "wow, amazing", "oh fantastic", 
        "oh joy", "sure, go ahead", "good luck with that", "right, I believe that", "unbelievable", "that's hilarious", 
        "you've got to be kidding", "very clever", "oh, how original", "who would’ve thought?", "good one", "totally believable", 
        "please, tell me more", "that’s cute", "that’s rich", "oh, how exciting", "big surprise", "very impressive", 
        "what a genius", "such a great idea", "right, okay", "yeah, I can see that", "oh, that’s going to be fun", 
        "couldn't agree more", "no, really?", "sure, you’re so right", "oh, how thoughtful", "really, wow", "you must be joking", 
        "please, tell me more", "oh, how thoughtful", "you really think so?", "wow, that's some idea", "what a clever observation", 
        "you're really on top of things", "yeah, because that’s going to work", "brilliant", "good one, Einstein", 
        "no kidding", "how impressive", "so subtle", "just what I needed", "I’m so impressed", "wow, just wow", 
        "don’t make me laugh", "sure, like that’s realistic", "oh, tell me more", "sure, tell me how that works out", 
        "how original", "that’s such a brilliant idea", "that’s what I was thinking", "well, aren’t you just clever?"],
};

export function analyzeSentimentAndEmotion(text: string): {
  sentiment: string;
  topEmotions: string[];
  counts: Record<string, number>;
} {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const emotionCounts: Record<string, number> = {};

  for (const [label, keywords] of Object.entries(emotion)) {
    emotionCounts[label] = 0;
    for (const word of keywords) {
      const pattern = new RegExp(`\\b${word}\\b`, "gi");
      const matches = text.match(pattern);
      if (matches) emotionCounts[label] += matches.length;
    }
  }

  const positiveCount = emotionCounts["joy"] + emotionCounts["confidence"];
  const negativeCount =
    emotionCounts["sadness"] +
    emotionCounts["anger"] +
    emotionCounts["frustration"] +
    emotionCounts["anxiety"];

  let sentiment = "Neutral";
  if (positiveCount > negativeCount) sentiment = "Positive";
  else if (negativeCount > positiveCount) sentiment = "Negative";
  else if (positiveCount === negativeCount && positiveCount > 0) sentiment = "Mixed";

  const topEmotions = Object.entries(emotionCounts)
    .sort(([, a], [, b]) => b - a)
    .filter(([key, count]) => count > 0)
    .map(([key]) => key);

  return { sentiment, topEmotions, counts: emotionCounts };
}

export function generateCreativeResponse(text: string): string {
  return `✨ *Creative Response*: Imagine a world where "${text}" becomes the heart of a magical story. What adventures would unfold?`;
}
