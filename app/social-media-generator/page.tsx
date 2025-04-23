"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Twitter, Instagram, Facebook } from "lucide-react";

export function SocialMediaGenerator() {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [generatedPost, setGeneratedPost] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState("gemini");

  const platformIcons = {
    twitter: <Twitter className="h-6 w-6 text-blue-500" />,
    instagram: <Instagram className="h-6 w-6 text-pink-600" />,
    facebook: <Facebook className="h-6 w-6 text-blue-700" />,
  };

  const trendingTopics = [
    "Artificial Intelligence",
    "Sustainable Marketing",
    "Digital Transformation",
    "Content Marketing",
    "Social Media Trends",
    "Customer Experience",
    "Video Marketing",
    "Influencer Partnerships",
    "Data-Driven Marketing",
    "Voice Search Optimization",
  ];

  const generatePost = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, tone, content, model }),
      });

      if (!response.ok) throw new Error("Failed to generate post");

      const data = await response.json();
      setGeneratedPost(data.post);
      setHashtags(data.hashtags);
    } catch (error) {
      console.error("Error generating post:", error);
      setGeneratedPost("❌ Failed to generate post. Please try again.");
      setHashtags("");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPost = () => {
    if (!generatedPost) return;
    const element = document.createElement("a");
    const file = new Blob([generatedPost + "\n\n" + hashtags], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${platform}-post.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8">
      <div className="md:col-span-2">
        <Card className="shadow-xl border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-white">
              {platformIcons[platform as keyof typeof platformIcons]}
              Social Media Post Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="rounded-md border-gray-300 dark:border-gray-700 bg-indigo-50 hover:bg-indigo-100">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="rounded-md border-gray-300 dark:border-gray-700 bg-yellow-50 hover:bg-yellow-100">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="witty">Witty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="rounded-md border-gray-300 dark:border-gray-700 bg-green-50 hover:bg-green-100">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Content Idea</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe what the post should be about..."
                rows={5}
                className="rounded-md border-gray-300 dark:border-gray-700"
              />
            </div>

            <Button
              onClick={generatePost}
              disabled={!content.trim() || isGenerating}
              className="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isGenerating ? "⏳ Generating..." : "✨ Generate Post"}
            </Button>

            {generatedPost && (
              <div className="space-y-6">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border">
                  <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-2">📝 Generated Post</h3>
                  <p className="whitespace-pre-line text-gray-700 dark:text-gray-100">{generatedPost}</p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border">
                  <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-2">🏷️ Suggested Hashtags</h3>
                  <p className="text-gray-700 dark:text-gray-100">{hashtags}</p>
                </div>

                <Button variant="outline" onClick={downloadPost} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:bg-indigo-700">
                  <Download className="w-4 h-4" />
                  Download Post
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="shadow-xl border-none bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">🔥 Trending Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 bg-white dark:bg-gray-800 p-6 rounded-xl">
            {trendingTopics.map((topic, index) => (
              <div
                key={index}
                onClick={() => setContent(topic)}
                className="p-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-700 dark:text-gray-100"
              >
                {index + 1}. {topic}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default  SocialMediaGenerator;