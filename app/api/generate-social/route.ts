import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { platform, topic, tone, keywords } = await req.json()

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Create a platform-specific prompt
    let prompt = `Create a ${tone} social media post for ${platform} about ${topic}.`

    if (keywords) {
      prompt += ` Include these keywords: ${keywords}.`
    }

    // Add platform-specific instructions
    switch (platform) {
      case "twitter":
        prompt += " Keep it under 280 characters and include relevant hashtags."
        break
      case "instagram":
        prompt += " Include emojis and hashtags. Format it for good readability with line breaks."
        break
      case "linkedin":
        prompt += " Keep it professional and include a call to action. Format it with paragraphs for readability."
        break
      case "facebook":
        prompt += " Make it engaging and include a question to encourage comments."
        break
      case "tiktok":
        prompt += " Make it trendy, catchy, and include relevant hashtags for discoverability."
        break
    }

    // Generate content
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return new Response(JSON.stringify({ content: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating social media content:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error generating social media content",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    )
  }
}
