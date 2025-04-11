import { NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, topic, model, platform, tone, content } = body

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 })
    }

    // A/B test generation
    if (type === 'ab_test') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate 3 different marketing content variants for: "${topic}"

Requirements:
1. Each variant should have a distinct style (e.g., emotional, factual, humorous)
2. Keep each variant concise and impactful
3. Focus on unique selling points

Output format for each variant:
Style: [style name]
Content: [marketing content]
---`
                  }
                ]
              }
            ]
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.error('Gemini API Error:', data)
        return NextResponse.json({ error: 'Failed to generate variants' }, { status: 500 })
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      const variantTexts = text.split('---').filter(Boolean)

      const variants = variantTexts.map(variant => {
        const [styleLine, contentLine] = variant.split('\n').filter(Boolean)
        return {
          style: styleLine.replace('Style:', '').trim(),
          content: contentLine.replace('Content:', '').trim()
        }
      })

      return NextResponse.json({ variants })
    }

    // Regular content generation (not ab_test)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `As a marketing assistant, create a ${tone} post for ${platform} about: "${content}"

Requirements:
1. Tailor content to the ${platform} platform
2. Use emojis and persuasive language
3. Include 2-3 relevant hashtags
4. Keep it short, engaging, and on-brand

Output format:
[Post Content]
---
[Hashtags]`
                }
              ]
            }
          ]
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API Error:', data)
      return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const [post, hashtags] = text.split('---').map(str => str.trim())

    return NextResponse.json({ post, hashtags })
  } catch (error) {
    console.error('Error in generate route:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}

