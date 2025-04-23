import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, topic, model, platform, tone, content } = body;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 });
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // A/B test generation
    if (type === 'ab_test') {
      const response = await fetch(API_URL, {
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
---`,
                },
              ],
            },
          ],
        }),
      });

      const textResponse = await response.text();
      console.log('A/B Test API Response:', textResponse);

      if (!response.ok) {
        console.error('Gemini API Error:', textResponse);
        return NextResponse.json({ error: 'Failed to generate variants' }, { status: 500 });
      }

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return NextResponse.json({ error: 'Failed to parse JSON response' }, { status: 500 });
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) {
        return NextResponse.json({ error: 'No content generated for A/B test.' }, { status: 400 });
      }

      const variantTexts = text.split('---').filter(Boolean);

      const variants = variantTexts.map((variant : any) => {
        const [styleLine, contentLine] = variant.split('\n').filter(Boolean);
        return {
          style: styleLine.replace('Style:', '').trim(),
          content: contentLine.replace('Content:', '').trim(),
        };
      });

      return NextResponse.json({ variants });
    }

    // Regular content generation (not ab_test)
    const prompt = `As a ${tone} marketing assistant, create an engaging ${platform} post for: "${content}". Add relevant hashtags.`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const textResponse = await response.text();
    console.log('Regular Content API Response:', textResponse);

    if (!response.ok) {
      console.error('Gemini API Error:', textResponse);
      return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json({ error: 'Failed to parse JSON response' }, { status: 500 });
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!generatedText) {
      return NextResponse.json({ error: 'No content generated. Try another query.' }, { status: 400 });
    }

    const [post, hashtags] = generatedText.split('---').map((str : any) => str.trim());

    return NextResponse.json({
      post,
      hashtags: hashtags || generatedText.match(/#\w+/g)?.join(' ') || '',
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Server error while generating content' }, { status: 500 });
  }
}
