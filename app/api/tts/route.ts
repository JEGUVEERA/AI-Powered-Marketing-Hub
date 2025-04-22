import { NextResponse } from "next/server";
import googleTTS from "google-tts-api";

export async function POST(req: Request) {
  const { text, language } = await req.json();

  if (!text || !language) {
    return NextResponse.json({ error: "Missing text or language" }, { status: 400 });
  }

  try {
    const url = googleTTS.getAudioUrl(text, {
      lang: language,
      slow: false,
      host: "https://translate.google.com",
    });

    return NextResponse.json({ audioUrl: url });

  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}
