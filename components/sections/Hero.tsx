"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail, Infinity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[80vh] md:min-h-screen items-center justify-center pt-16 md:pt-16 overflow-hidden">
        {/* Background Pattern - DevOps/Infinite Loop Theme */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 dark:opacity-5 pointer-events-none overflow-hidden pt-28 md:pt-40">
             {/* Huge Infinity Symbol representing DevOps */}
             <Infinity strokeWidth={0.5} className="w-[150vw] h-[150vw] md:w-[70vw] md:h-[70vw] text-primary transform -rotate-12" />
        </div>
        
        {/* Abstract Glow - Kept for aesthetics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="container px-4 md:px-6 relative z-10"> 
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-2 mt-[-2rem] md:mt-0" // Pull up slightly on mobile
          >
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Hi, I&apos;m <span className="text-primary">Laxman Aryal</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-700 dark:text-zinc-300 text-lg md:text-xl font-medium">
              DevOps Engineer | AWS & Azure Cloud | Linux System Administration | Infrastructure Automation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-foreground/80 md:text-lg"
          >
            <p className="mb-0 leading-relaxed hidden md:block">
              I specialize in containerization (Docker), infrastructure-as-code (Terraform), and CI/CD pipeline automation. Passionate about automating deployment processes and optimizing system reliability.
            </p>
             {/* Shortened for mobile */}
            <p className="mb-0 leading-relaxed md:hidden">
              Specializing in Docker, Terraform, and CI/CD automation to optimize system reliability and cloud infrastructure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="#contact">
              <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-primary/20 transition-all">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-8 shadow-sm">
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.6 }}
             className="flex items-center space-x-6 mt-4"
          >
             <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                <Github className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
             </Link>
             <Link href="https://www.linkedin.com/in/laxman-aryal" target="_blank" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                <Linkedin className="h-7 w-7" />
                <span className="sr-only">LinkedIn</span>
             </Link>
             <Link href="mailto:laxuaryal@gmail.com" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                <Mail className="h-7 w-7" />
                <span className="sr-only">Email</span>
             </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
