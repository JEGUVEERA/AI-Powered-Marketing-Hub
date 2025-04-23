"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X, MessageSquare, FileText, Mail, ImageIcon, Mic, BarChart3 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const tools = [
  { icon: MessageSquare, label: "Chat", href: "/chatbot" },
  { icon: FileText, label: "Content", href: "/marketing-content-generator" },
  { icon: Mail, label: "Email", href: "/email-generator" },
  { icon: ImageIcon, label: "Image", href: "/image-generator" },
  { icon: Mic, label: "Speech", href: "/text-to-speech" },
  { icon: BarChart3, label: "Data", href: "/data-visualizer" },
]

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col-reverse gap-2 mb-2"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                <Button asChild variant="secondary" size="icon" className="h-12 w-12 rounded-full shadow-lg">
                  <Link href={tool.href}>
                    <tool.icon className="h-5 w-5" />
                    <span className="sr-only">{tool.label}</span>
                  </Link>
                </Button>
                <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-secondary px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {tool.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        <span className="sr-only">Toggle tools menu</span>
      </Button>
    </div>
  )
}
