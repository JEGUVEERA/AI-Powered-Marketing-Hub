// app/api/tts/route.ts (for App Router) or pages/api/tts.ts (for Pages Router)
import { NextResponse } from "next/server"
import { TextToSpeechClient } from "@google-cloud/text-to-speech"
import fs from "fs"
import path from "path"
import util from "util"

const writeFile = util.promisify(fs.writeFile)
const client = new TextToSpeechClient()

export async function POST(req: Request) {
  const { text, voice } = await req.json()

  const fileName = `tts-${Date.now()}.mp3`
  const filePath = path.join("/tmp", fileName)

  const request = {
    input: { text },
    voice: {
      languageCode: "en-US",
      ssmlGender: voice === "female" ? "FEMALE" : "MALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  }

  const [response] = await client.synthesizeSpeech(request)
  await writeFile(filePath, response.audioContent as Buffer, "binary")

  const audioUrl = `/api/tts/audio?name=${fileName}`
  return NextResponse.json({ audioUrl })
}
