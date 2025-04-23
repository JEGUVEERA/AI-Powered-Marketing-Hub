"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, Image } from "lucide-react"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [numImages, setNumImages] = useState(1)
  const [guidanceScale, setGuidanceScale] = useState(7.5)
  const [style, setStyle] = useState("realistic")
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const styleMap: Record<string, string> = {
    realistic: "hyper-realistic, photo-like, cinematic lighting",
    anime: "anime, cel-shading, high contrast",
    photographic: "35mm photo, DSLR, natural light, ultra detailed",
    fantasy: "fantasy, magic, ethereal glow, dramatic colors",
    digitalArt: "digital painting, concept art, stylized, vibrant colors",
    noPreference: "",
  }
  
  const generateImages = async () => {
    if (!prompt.trim()) return;
  
    setIsGenerating(true);
    setGeneratedImages([]);
  
    try {
      const enhancedPrompt = `${prompt}, ${styleMap[style]}`;
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          num_images: numImages,
          guidance_scale: guidanceScale,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${errorText}`);
      }
      
      const data = await response.json();
  
      if (data && data.images) {
        setGeneratedImages(data.images); // assuming API returns a list of image URLs
      } else {
        console.error("No images returned:", data);
      }
    } catch (err) {
      console.error("Image generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <div className="space-y-6 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-xl">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Image className="h-5 w-5 text-yellow-400" />
            Realistic AI Image Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-white">
            <div>
              <label className="block text-sm font-medium mb-2">📝 Enter your image prompt</label>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., hyper-realistic portrait of a young astronaut"
                className="rounded-md text-black"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">🖼️ Number of Images: {numImages}</label>
                <Slider
                  value={[numImages]}
                  min={1}
                  max={4}
                  step={1}
                  onValueChange={(value) => setNumImages(value[0])}
                  className="bg-indigo-400 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">🎯 Guidance Scale: {guidanceScale}</label>
                <Slider
                  value={[guidanceScale]}
                  min={1}
                  max={20}
                  step={0.5}
                  onValueChange={(value) => setGuidanceScale(value[0])}
                  className="bg-indigo-400 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">🎨 Choose a Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-indigo-400 text-white">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-indigo-500 text-white">
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="photographic">Photographic</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="digitalArt">Digital Art</SelectItem>
                  <SelectItem value="noPreference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateImages} 
              disabled={!prompt.trim() || isGenerating} 
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:scale-105 transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span>
                  Generating Images...
                </>
              ) : (
                "🚀 Generate Realistic Images"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isGenerating && (
        <div className="text-center py-8">
          <div className="inline-block animate-pulse bg-muted rounded-lg p-8">
            <Image className="h-16 w-16 mx-auto opacity-50" />
            <p className="mt-4 text-white">Creating your images...</p>
          </div>
        </div>
      )}

      {generatedImages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Generated Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((src, index) => (
              <Card key={index} className="overflow-hidden bg-gradient-to-r from-teal-400 to-lime-400 rounded-lg shadow-md">
                <div className="aspect-square relative">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Generated image ${index + 1}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <CardContent className="p-4 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Image {index + 1}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => window.open(src, "_blank")} 
                      className="bg-teal-500 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGenerator;