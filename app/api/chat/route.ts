// E:\ai-marketing-hub\app\api\chat\route.ts
import { streamText } from "ai"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the model - using gemini-1.5-pro for better capabilities
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Format messages for Gemini
    const formattedMessages = messages.map((message: any) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    }))

    // Create a chat session with marketing-specific system prompt
    const chat = model.startChat({
      history: formattedMessages.slice(0, -1),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
      systemInstruction: `You are an expert marketing assistant with deep knowledge of digital marketing, content creation, social media, email marketing, and market analysis. 
      Provide helpful, actionable advice tailored to the user's marketing needs. 
      When suggesting strategies, include specific examples and best practices.
      For content creation, focus on compelling, audience-focused messaging.
      Always maintain a professional but friendly tone.`,
    })

    // Get the last user message
    const lastMessage = messages[messages.length - 1]

    // Stream the response
    const result = streamText({
      model: {
        doGenerate: async ({ prompt }) => {
          try {
            const result = await chat.sendMessageStream(lastMessage.content)
            let text = ""
    
            for await (const chunk of result.stream) {
              const chunkText = chunk.text()
              text += chunkText
            }
    
            return { text }
          } catch (error) {
            console.error("Error generating response:", error)
            return {
              text: "I'm sorry, I encountered an error processing your request. Please try again or contact support if the issue persists.",
            }
          }
        },
      },
      prompt: lastMessage.content,
    })
    

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "There was an error processing your request" }), { status: 500 })
  }
}
