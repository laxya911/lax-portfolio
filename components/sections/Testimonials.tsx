"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Linkedin, Quote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CTO",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60",
    review: "Laxman transformed our chaotic deployment process into a streamlined, one-click operation. His expertise in Kubernetes and Jenkins saved us hundreds of man-hours.",
    rating: 5,
    linkedin: "#"
  },
  {
    name: "David Chen",
    role: "Lead DevOps Engineer",
    company: "CloudScale Inc.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=60",
    review: "Incredible attention to detail. The security implementation he added to our CI/CD pipeline caught vulnerabilities we didn't even know existed. Highly recommended.",
    rating: 5,
    linkedin: "#"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "StartUp Nexus",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&q=60",
    review: "Working with Laxman was a breeze. He explains complex infrastructure concepts in plain English and delivers robust solutions that just work.",
    rating: 5,
    linkedin: "#"
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                    Client Feedback
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    What People Say
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    Trusted by engineering teams and startups to build scalable infrastructure.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((item, index) => (
                    <Card key={index} className="relative flex flex-col justify-between overflow-hidden border-none shadow-lg bg-background/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute top-4 right-4 opacity-10">
                            <Quote className="h-12 w-12 text-primary" />
                        </div>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10">
                                <Image 
                                    src={item.image} 
                                    alt={item.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold leading-none">{item.name}</h3>
                                <div className="text-xs text-muted-foreground mt-1 flex flex-col">
                                    <span className="font-medium text-primary">{item.role}</span>
                                    <span>{item.company}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 flex-1 flex flex-col justify-between gap-6">
                            <div className="flex gap-0.5">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed italic">
                                &quot;{item.review}&quot;
                            </p>
                            
                            <div className="flex items-center justify-end pt-2 border-t mt-2">
                                <Link 
                                    href={item.linkedin} 
                                    className="text-muted-foreground hover:text-[#0077b5] transition-colors"
                                    aria-label={`${item.name}'s LinkedIn`}
                                >
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  )
}
