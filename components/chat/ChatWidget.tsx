"use client"

import * as React from "react"
import { Sparkles, X, Send } from "lucide-react"
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

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: 'user', content: input }])
    
    // Simulate reponse
    setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: "Thank you for your message! This is a demo assistant. Laxman will get back to you if you use the contact form." }])
    }, 1000)
    
    setInput("")
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4 w-[350px]"
            >
              <Card className="shadow-2xl border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 bg-primary text-primary-foreground rounded-t-xl py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <CardTitle className="text-sm font-medium">Assistant</CardTitle>
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
                <CardContent className="h-[300px] overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
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
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
            <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center shrink-0"
            >
            <Sparkles className="h-7 w-7 text-white" />
            <span className="sr-only">Open AI Assistant</span>
            </Button>
        )}
      </div>
    </>
  )
}
