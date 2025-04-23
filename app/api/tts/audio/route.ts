
// app/api/tts/audio/route.ts
import fs from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name")
  if (!name) return new NextResponse("Missing filename", { status: 400 })

  const filePath = path.join("/tmp", name)
  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 })
  }

  const buffer = fs.readFileSync(filePath)
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "audio/mp3",
    },
  })
}
