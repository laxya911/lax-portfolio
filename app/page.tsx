import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}

function Footer() {
    return (
        <footer className="py-6 md:py-8 border-t bg-muted/20 pb-24 md:pb-8">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
                <p className="text-sm text-balance text-center leading-loose text-muted-foreground md:text-left">
                    Built by Laxman Aryal. Hosted on AWS EC2 Docker Container.
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">© 2025 Laxman Aryal</p>
                </div>
            </div>
        </footer>
    )
}

