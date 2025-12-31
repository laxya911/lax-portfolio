"use client"

const skills = [
  {
    name: "Ansible",
    logo: (className: string) => <img src="/svg_logo/ansible.svg" className={className} alt="Ansible" />
  },
  {
    name: "AWS EC2",
    logo: (className: string) => <img src="/svg_logo/aws-ec2.svg" className={className} alt="AWS EC2" />
  },
  {
    name: "AWS S3",
    logo: (className: string) => <img src="/svg_logo/aws-s3.svg" className={className} alt="AWS S3" />
  },
  {
    name: "AWS",
    logo: (className: string) => <img src="/svg_logo/aws.svg" className={className} alt="AWS" />
  },
  {
    name: "Azure",
    logo: (className: string) => <img src="/svg_logo/azure-v2.svg" className={className} alt="Azure" />
  },
  {
    name: "Docker",
    logo: (className: string) => <img src="/svg_logo/docker.svg" className={className} alt="Docker" />
  },
  {
    name: "Git",
    logo: (className: string) => <img src="/svg_logo/git.svg" className={className} alt="Git" />
  },
  {
    name: "GitHub",
    logo: (className: string) => <img src="/svg_logo/github.svg" className={className} alt="GitHub" />
  },
  {
    name: "Grafana",
    logo: (className: string) => <img src="/svg_logo/grafana.svg" className={className} alt="Grafana" />
  },
  {
    name: "Jenkins",
    logo: (className: string) => <img src="/svg_logo/jenkins.svg" className={className} alt="Jenkins" />
  },
  {
    name: "Kubernetes",
    logo: (className: string) => <img src="/svg_logo/kubernetes.svg" className={className} alt="Kubernetes" />
  },
  {
    name: "Linux",
    logo: (className: string) => <img src="/svg_logo/linuxsvg.svg" className={className} alt="Linux" />
  },
  {
    name: "MongoDB",
    logo: (className: string) => <img src="/svg_logo/mongodb.svg" className={className} alt="MongoDB" />
  },
  {
    name: "MySQL",
    logo: (className: string) => <img src="/svg_logo/mysql.svg" className={className} alt="MySQL" />
  },
  {
    name: "Next.js",
    logo: (className: string) => <img src="/svg_logo/nextjs.svg" className={className} alt="Next.js" />
  },
  {
    name: "NextCloud",
    logo: (className: string) => <img src="/svg_logo/nextcloud.svg" className={className} alt="NextCloud" />
  },
  {
    name: "PostgreSQL",
    logo: (className: string) => <img src="/svg_logo/postgresql.svg" className={className} alt="PostgreSQL" />
  },
  {
    name: "SQL",
    logo: (className: string) => <img src="/svg_logo/sql.svg" className={className} alt="SQL" />
  },
  {
    name: "Terraform",
    logo: (className: string) => <img src="/svg_logo/terraform.svg" className={className} alt="Terraform" />
  },
  {
    name: "Vercel",
    logo: (className: string) => <img src="/svg_logo/vercel.svg" className={className} alt="Vercel" />
  },
  {
    name: "VS Code",
    logo: (className: string) => <img src="/svg_logo/vscode.svg" className={className} alt="VS Code" />
  }
]

// Duplicate skills to create seamless loop
const marqueeSkills = [...skills, ...skills, ...skills]

export function SkillsMarquee() {
  return (
    <section className="py-12 border-y bg-muted/20 overflow-hidden">
        <div className="container mx-auto space-y-4 mb-8 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Technologies & Tools I Work With
            </p>
        </div>
        
        <div className="relative flex w-full overflow-hidden mask-gradient">
            <div className="flex min-w-full shrink-0 animate-marquee gap-12 sm:gap-24 items-center">
                {marqueeSkills.map((skill, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 shrink-0 group">
                        <div className="h-12 w-12 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110">
                            {skill.logo("h-full w-full")}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground/80 group-hover:text-primary transition-colors">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
             {/* Duplicate for seamless effect if needed, but the array is already tripled above */}
             {/* We strictly need two copies if we use 100% translation, but we use map multiple times */}
        </div>
        
        {/* Helper style for gradient mask sides */}
        <style jsx global>{`
           .mask-gradient {
               mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
               -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
           }
        `}</style>
    </section>
  )
}
