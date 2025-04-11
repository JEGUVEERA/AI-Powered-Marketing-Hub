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

type Feature = {
  icon: JSX.Element
  title: string
  description: string
  href: string
}

export function Home() {
  const features: Feature[] = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI Chat Bot",
      description: "Engage with our advanced AI assistant for marketing insights and ideas.",
      href: "?tab=chatbot",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Social Media Generator",
      description: "Create engaging posts for various social media platforms.",
      href: "?tab=social",
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: "Marketing Content",
      description: "Generate professional marketing copy, slogans, and campaign ideas.",
      href: "?tab=marketing",
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Email Generator",
      description: "Craft compelling email marketing content with various tones.",
      href: "?tab=email",
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Sentiment Analysis",
      description: "Analyze text sentiment and get creative AI responses.",
      href: "?tab=sentiment",
    },
    {
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
      title: "Image Generator",
      description: "Create realistic AI-generated images for your marketing campaigns.",
      href: "?tab=image",
    },
    {
      icon: <Mic className="h-8 w-8 text-primary" />,
      title: "Text to Speech",
      description: "Convert your marketing text to natural-sounding speech.",
      href: "?tab=tts",
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Data Visualization",
      description: "Visualize your marketing data with interactive charts.",
      href: "?tab=data",
    },
    {
      icon: <History className="h-8 w-8 text-primary" />,
      title: "Chat History",
      description: "Review your past interactions with our AI tools.",
      href: "?tab=history",
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">WELCOME TO AI FOR MARKETING</h1>
        <p className="text-xl text-muted-foreground">
          A powerful AI toolset for content generation and analysis
        </p>
      </div>

      <div className="relative w-full max-w-3xl mb-16">
        <Image
          src="/images/ai-marketing-hub.png"
          alt="AI-Powered Marketing Hub"
          width={800}
          height={500}
          className="rounded-lg shadow-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              {feature.icon}
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{feature.description}</CardDescription>
              <Link href={feature.href}>
                <Button variant="outline" className="w-full">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
