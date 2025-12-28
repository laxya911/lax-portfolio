"use client"

import { motion } from "framer-motion"
import { 
  Cloud, 
  Server, 
  Settings, 
  Code, 
  Terminal, 
  ShieldCheck 
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const services = [
  {
    title: "Cloud Infrastructure",
    description: "Designing and managing scalable cloud environments on AWS (EC2, S3, RDS, VPC) and Azure (VMs, App Services).",
    icon: Cloud,
  },
  {
    title: "CI/CD Pipeline Automation",
    description: "Building automated CI/CD pipelines using GitHub Actions and Jenkins to streamline deployment and reduce errors.",
    icon: Settings,
  },
  {
    title: "Containerization",
    description: "Dockerizing applications and managing container orchestration to ensure consistent environments across development and production.",
    icon: Server,
  },
  {
    title: "Infrastructure as Code",
    description: "Provisioning and managing infrastructure using Terraform and CloudFormation for reproducible and version-controlled setups.",
    icon: Code,
  },
  {
    title: "Linux Administration",
    description: "Advanced shell scripting, user permission management, and system performance tuning for Linux-based servers.",
    icon: Terminal,
  },
  {
    title: "Tech Support & Security",
    description: "IT infrastructure support, system troubleshooting, monitoring, logging, and implementing standard security practices.",
    icon: ShieldCheck,
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-primary">My Services</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Leveraging my background in IT support and DevOps to deliver reliable infrastructure solutions.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-primary/10">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
