import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { CreativeProcess } from "@/components/creative-process"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProjectsShowcase />
        <About />
        <Services />
        <CreativeProcess />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
