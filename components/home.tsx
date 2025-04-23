import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  ImageIcon,
  BarChart2,
  Mail,
  MessageSquare,
  Mic,
  PenTool,
  History
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JSX } from "react"

type Feature = {
  icon: JSX.Element
  title: string
  description: string
  href: string
}

export function Home() {
  const features: Feature[] = [
    {
      icon: <Bot className="h-7 w-7 text-indigo-600" />,
      title: "AI Chat Bot",
      description: "Engage with our advanced AI assistant for marketing insights and ideas.",
      href: "/chatbot",
    },
    {
      icon: <MessageSquare className="h-7 w-7 text-pink-600" />,
      title: "Social Media Generator",
      description: "Create engaging posts for various social media platforms.",
      href: "/social-media-generator",
    },
    {
      icon: <PenTool className="h-7 w-7 text-yellow-600" />,
      title: "Marketing Content",
      description: "Generate professional marketing copy, slogans, and campaign ideas.",
      href: "/marketing-content-generator",
    },
    {
      icon: <Mail className="h-7 w-7 text-green-600" />,
      title: "Email Generator",
      description: "Craft compelling email marketing content with various tones.",
      href: "/email-generator",
    },
    {
      icon: <Bot className="h-7 w-7 text-red-500" />,
      title: "Sentiment Analysis",
      description: "Analyze text sentiment and get creative AI responses.",
      href: "/sentiment",
    },
    {
      icon: <ImageIcon className="h-7 w-7 text-blue-500" />,
      title: "Image Generator",
      description: "Create realistic AI-generated images for your marketing campaigns.",
      href: "/image-generator",
    },
    {
      icon: <Mic className="h-7 w-7 text-purple-500" />,
      title: "Text to Speech",
      description: "Convert your marketing text to natural-sounding speech.",
      href: "/text-to-speech",
    },
    {
      icon: <BarChart2 className="h-7 w-7 text-orange-500" />,
      title: "Data Visualization",
      description: "Visualize your marketing data with interactive charts.",
      href: "/data-visualizer",
    },
    {
      icon: <History className="h-7 w-7 text-gray-600" />,
      title: "Chat History",
      description: "Review your past interactions with our AI tools.",
      href: "/chat-history",
    },
  ]

  return (
    <div className="flex flex-col items-center px-4 pb-16 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          AI FOR MARKETING
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your all-in-one AI-powered toolset for content generation and marketing analysis
        </p>
      </div>

      <div className="relative w-full max-w-4xl mb-12 rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/images/ai-marketing-hub.png"
          alt="AI-Powered Marketing Hub"
          width={800}
          height={500}
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl rounded-lg bg-white shadow-md p-4 hover:bg-gradient-to-r hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {feature.icon}
              <CardTitle className="text-lg font-semibold text-gray-800">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 text-sm text-muted-foreground">
                {feature.description}
              </CardDescription>
              <Link href={feature.href}>
                <Button variant="secondary" className="w-full group transition-colors duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
                  Try Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
