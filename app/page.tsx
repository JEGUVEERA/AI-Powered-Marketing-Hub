import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Use named imports for components if they are exported as named
import { Home } from "@/components/home";
import { ChatBot } from "@/components/chat-bot";
import { SocialMediaGenerator } from "@/components/social-media-generator";
import { MarketingContentGenerator } from "@/components/marketing-content-generator";  // Default import
import { EmailGenerator } from "@/components/email-generator";
import { SentimentAnalysis } from "@/components/sentiment-analysis";
import { ImageGenerator } from "@/components/image-generator";
import { TextToSpeech } from "@/components/text-to-speech";
import DataVisualization from "@/components/data-visualization";  
import { ChatHistory } from "@/components/chat-history";

export default function AIMarketingHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Marketing Hub</h1>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mb-8">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="chatbot">Chat Bot</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="tts">Text to Speech</TabsTrigger>
          <TabsTrigger value="data">Data Viz</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <Home />
        </TabsContent>

        <TabsContent value="chatbot">
          <ChatBot />
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaGenerator />
        </TabsContent>

        <TabsContent value="marketing">
          <MarketingContentGenerator />
        </TabsContent>

        <TabsContent value="email">
          <EmailGenerator />
        </TabsContent>

        <TabsContent value="sentiment">
          <SentimentAnalysis />
        </TabsContent>

        <TabsContent value="image">
          <ImageGenerator />
        </TabsContent>

        <TabsContent value="tts">
          <TextToSpeech />
        </TabsContent>

        <TabsContent value="data">
          <DataVisualization />
        </TabsContent>

        <TabsContent value="history">
          <ChatHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
