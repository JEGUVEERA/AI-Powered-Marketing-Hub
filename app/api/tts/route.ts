
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { readFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import os from "os";

export async function POST(req: NextRequest) {
  const { text, language } = await req.json();
  const id = uuidv4();
  const filename = `${id}.mp3`;
  const filepath = path.join(os.tmpdir(), filename);

  try {
    console.log("Generating TTS via Python script...");

    await new Promise((resolve, reject) => {
      const py = spawn("python", ["tts.py", text, language || "en", filepath]);

      py.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      py.on("close", (code) => {
        if (code === 0) resolve(true);
        else reject(new Error("Python TTS script failed"));
      });
    });

    const audioBuffer = await readFile(filepath);
    await unlink(filepath);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="speech.mp3"`,
      },
    });
  } catch (err) {
    console.error("TTS generation failed:", err);
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}
