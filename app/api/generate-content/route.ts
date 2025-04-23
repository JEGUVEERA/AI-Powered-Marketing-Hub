import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { contentType, topic, tone, targetAudience, keyPoints } = await req.json()

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Create a prompt based on the content type and parameters
    let prompt = `Create a ${tone} ${contentType.replace("-", " ")} about ${topic}`

    if (targetAudience) {
      prompt += ` targeted at ${targetAudience}`
    }

    if (keyPoints) {
      prompt += `. Include these key points: ${keyPoints}`
    }

    prompt += `. Format the content appropriately for a ${contentType.replace("-", " ")}.`

    // Generate content
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return new Response(JSON.stringify({ content: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error generating content",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    )
  }
}
