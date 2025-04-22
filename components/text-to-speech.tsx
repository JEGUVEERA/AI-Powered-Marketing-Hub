"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Volume2, Download } from "lucide-react";

export function TextToSpeech() {
  const [text, setText] = useState("");
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const convertToSpeech = () => {
    if (!text.trim()) return;

    setIsConverting(true);
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = voices[voiceIndex];
    speech.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(speech);
    setIsPlaying(true);
    setIsConverting(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const generateDownloadableAudio = async () => {
    if (!text.trim()) return;

    try {
      const language = voices[voiceIndex]?.lang || "en";
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      const data = await response.json();
      if (data.audioUrl) {
        const audioResponse = await fetch(data.audioUrl);
        const blob = await audioResponse.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error("Failed to fetch audio:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Text to Speech Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
            rows={6}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Select Voice</label>
            <Select value={voiceIndex.toString()} onValueChange={(value) => setVoiceIndex(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={convertToSpeech} disabled={!text.trim() || isConverting} className="w-full">
            {isConverting ? "Converting..." : "Convert to Speech"}
          </Button>

          <Button onClick={togglePlayPause} disabled={!text.trim()} variant="outline" className="w-full mt-2">
            {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>

          <Button onClick={generateDownloadableAudio} disabled={!text.trim()} className="w-full mt-2">
            Generate MP3
          </Button>

          {audioUrl && (
            <div className="mt-4">
              <a
                href={audioUrl}
                download="speech.mp3"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download MP3
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
