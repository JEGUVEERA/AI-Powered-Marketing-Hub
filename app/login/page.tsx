import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home } from "@/components/home"
import { ChatBot } from "@/components/chat-bot"
import { SocialMediaGenerator } from "@/components/social-media-generator"
import { MarketingContentGenerator } from "@/components/marketing-content-generator"
import { EmailGenerator } from "@/components/email-generator"
import { SentimentAnalysis } from "@/components/sentiment-analysis"
import { ImageGenerator } from "@/components/image-generator"
import { TextToSpeech } from "@/components/text-to-speech"
import DataVisualization from "@/components/data-visualization"
import { ChatHistory } from "@/components/chat-history"

export default function AIMarketingHub() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-white tracking-tight drop-shadow-lg">✨ AI Marketing Hub</h1>

      <Tabs defaultValue="home" className="w-full space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 bg-white p-2 rounded-xl shadow-xl">
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:bg-gradient-to-l hover:from-teal-400 hover:to-blue-500 transition-all duration-300" value="home">Home</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-green-500 to-yellow-400 text-white hover:bg-gradient-to-l hover:from-yellow-400 hover:to-green-500 transition-all duration-300" value="chatbot">Chat Bot</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-indigo-500 to-pink-400 text-white hover:bg-gradient-to-l hover:from-pink-400 hover:to-indigo-500 transition-all duration-300" value="social">Social Media</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-teal-500 to-orange-400 text-white hover:bg-gradient-to-l hover:from-orange-400 hover:to-teal-500 transition-all duration-300" value="marketing">Marketing</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-red-500 to-yellow-400 text-white hover:bg-gradient-to-l hover:from-yellow-400 hover:to-red-500 transition-all duration-300" value="email">Email</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-purple-500 to-blue-400 text-white hover:bg-gradient-to-l hover:from-blue-400 hover:to-purple-500 transition-all duration-300" value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-pink-500 to-indigo-400 text-white hover:bg-gradient-to-l hover:from-indigo-400 hover:to-pink-500 transition-all duration-300" value="image">Image</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-yellow-500 to-green-400 text-white hover:bg-gradient-to-l hover:from-green-400 hover:to-yellow-500 transition-all duration-300" value="tts">Text to Speech</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-400 text-white hover:bg-gradient-to-l hover:from-indigo-400 hover:to-blue-500 transition-all duration-300" value="data">Data Viz</TabsTrigger>
          <TabsTrigger className="rounded-lg font-medium bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:bg-gradient-to-l hover:from-cyan-400 hover:to-teal-500 transition-all duration-300" value="history">History</TabsTrigger>
        </TabsList>

        <div className="rounded-xl border bg-white shadow-xl p-6 mt-4">
          <TabsContent value="home"><Home /></TabsContent>
          <TabsContent value="chatbot"><ChatBot /></TabsContent>
          <TabsContent value="social"><SocialMediaGenerator /></TabsContent>
          <TabsContent value="marketing"><MarketingContentGenerator /></TabsContent>
          <TabsContent value="email"><EmailGenerator /></TabsContent>
          <TabsContent value="sentiment"><SentimentAnalysis /></TabsContent>
          <TabsContent value="image"><ImageGenerator /></TabsContent>
          <TabsContent value="tts"><TextToSpeech /></TabsContent>
          <TabsContent value="data"><DataVisualization /></TabsContent>
          <TabsContent value="history"><ChatHistory /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
