"use client"

import * as React from "react"
import { Headset, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I am Laxman's virtual assistant. How can I help you regarding his services or experience?" }
  ])
  const [input, setInput] = React.useState("")

  // Chat logic
  const [isTyping, setIsTyping] = React.useState(false)

  // Knowledge base for the bot
  const knowledgeBase = [
    {
      keywords: ["hello", "hi", "hey", "greetings"],
      response: "Hello! How can I help you today? You can ask me about my skills, projects, or how to contact me."
    },
    {
       keywords: ["skill", "stack", "technology", "tech"],
       response: "I am proficient in Next.js, React, TypeScript, Node.js, and DevOps tools like AWS, Docker, Kubernetes, Ansible, and Terraform."
    },
    {
      keywords: ["project", "work", "portfolio"],
      response: "You can view my projects in the 'Projects' section of this portfolio. I have worked on various web applications and infrastructure automation projects."
    },
    {
      keywords: ["contact", "email", "hire", "reach"],
      response: "You can reach me via the contact form on this page, or email me directly at laxuaryal@gmail.com."
    },
    {
      keywords: ["experience", "background", "job"],
      response: "I have experience in both Full Stack Development and DevOps. I love building scalable applications and automating infrastructure."
    },
    {
      keywords: ["service", "offer"],
      response: "I offer services in Web Development (Next.js/React), Backend (Node.js/Python), and DevOps (AWS/CICD/IaC)."
    }
  ]

  const getResponse = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    // Find matching intent
    const match = knowledgeBase.find(item => 
      item.keywords.some(keyword => lowerInput.includes(keyword))
    )

    if (match) return match.response
    
    return "I'm not sure about that. Please try asking about my skills, projects, or contact info. You can also use the contact form for specific inquiries."
  }

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage = input
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput("")
    setIsTyping(true)
    
    // Simulate thinking and response time
    setTimeout(() => {
        const response = getResponse(userMessage)
        setMessages(prev => [...prev, { role: 'assistant', content: response }])
        setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[50] flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-2 w-[350px] sm:w-[380px]"
            >
              <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 bg-primary text-primary-foreground rounded-t-xl py-3">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/10 rounded-full">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-medium">Virtual Assistant</CardTitle>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] text-primary-foreground/90">Online</span>
                        </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="h-[350px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-muted rounded-bl-none'
                    }`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2 text-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                    </div>
                </div>
            )}
                </CardContent>
                <CardFooter className="p-3 pt-0">
                    <form 
                        className="flex w-full items-center space-x-2"
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    >
                        <Input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..." 
                            className="flex-1 focus-visible:ring-primary/50"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim()} className="shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={isOpen ? "destructive" : "default"}
            size="icon"
            className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
            >
            {isOpen ? (
                 <X className="h-6 w-6" />
            ) : (
                <Headset className="h-7 w-7" />
            )}
            <span className="sr-only">Toggle Support Chat</span>
            </Button>
        </motion.div>
      </div>
    </>
  )
}
