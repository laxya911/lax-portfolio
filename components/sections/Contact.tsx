"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Allowed TLDs for validation
const allowedTlds = ['com', 'dev', 'net', 'io', 'ai', 'org', 'edu', 'gov', 'in', 'us', 'uk', 'ca', 'au', 'de', 'jp', 'fr', 'br', 'sg'];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).refine((email) => {
    const tld = email.split('.').pop()?.toLowerCase();
    return tld && allowedTlds.includes(tld);
  }, {
    message: "Please use a valid top-level domain (e.g., .com, .net, .io, .in).",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus('submitting')
    setErrorMessage("")
    
    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error: any) {
      console.error(error);
      setStatus('error')
      setErrorMessage(error.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">Get in Touch</h2>
          <p className="text-muted-foreground mt-4">
            Available for freelance opportunities and full-time roles.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">laxuaryal@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">9967398611</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Linkedin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <Link 
                  href="https://www.linkedin.com/in/laxman-aryal" 
                  target="_blank" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  linkedin.com/in/laxman-aryal
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6 rounded-xl border shadow-sm">
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can I help you?" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {status === 'error' && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {status === 'success' && (
                  <Alert className="border-green-500 text-green-600 bg-green-50">
                    <CheckCircle className="h-4 w-4 stroke-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Message sent successfully! I'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={status === 'submitting' || status === 'success'}>
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : status === 'success' ? (
                     "Message Sent"
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
