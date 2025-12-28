"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const projects = [
  {
    title: "AWS Cloud Infrastructure",
    description: "Automated provisioning of a highly available VPC with scalable EC2 instances using Terraform.",
    tags: ["AWS", "Terraform", "VPC"],
    image: "/project-1.jpg", // Placeholder
    github: "https://github.com",
    demo: "#",
  },
  {
    title: "K8s Microservices Deployment",
    description: "Deployed a microservices application on Kubernetes with Helm charts and ArgoCD for GitOps.",
    tags: ["Kubernetes", "Docker", "Helm", "ArgoCD"],
    image: "/project-2.jpg", // Placeholder
    github: "https://github.com",
    demo: "#",
  },
  {
    title: "CI/CD Pipeline for Next.js",
    description: "Built a robust CI/CD pipeline using GitHub Actions to build, test, and deploy a Next.js app to Vercel.",
    tags: ["GitHub Actions", "Next.js", "CI/CD"],
    image: "/project-3.jpg", // Placeholder
    github: "https://github.com",
    demo: "#",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6"> 
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">Featured Projects</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
             A showcase of my recent work in DevOps, Cloud, and Automation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 flex flex-col">
                <div className="relative h-48 w-full bg-secondary/50 overflow-hidden group">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                    <span className="text-sm font-medium">Project Preview</span>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <Link href={project.github} target="_blank">
                        <Button size="icon" variant="secondary" className="rounded-full">
                           <Github className="h-5 w-5" />
                        </Button>
                     </Link>
                     <Link href={project.demo} target="_blank">
                        <Button size="icon" variant="secondary" className="rounded-full">
                           <ExternalLink className="h-5 w-5" />
                        </Button>
                     </Link>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
