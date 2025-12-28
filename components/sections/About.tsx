"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-8"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">About Me</h2>
            <p className="text-muted-foreground md:text-lg">
              My journey from IT Support to DevOps Engineering.
            </p>
          </div>
          
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am a passionate DevOps professional with over 3 years of hands-on experience building and maintaining robust cloud infrastructure. 
              I specialize in containerization (Docker), infrastructure-as-code (Terraform), and CI/CD pipeline automation.
            </p>
            <p>
              <strong>CAREER TRANSITION:</strong> My journey began in IT infrastructure support and system troubleshooting, which gave me deep insights into real-world operational challenges. 
              This foundation led me to embrace DevOps practices, where I now focus on automating infrastructure, implementing cloud solutions, and optimizing system reliability.
            </p>
            <p>
              I am committed to continuous learning and staying updated with the latest DevOps trends. I actively work on automating deployment processes, reducing infrastructure costs, and improving system reliability.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
