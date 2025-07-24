import { ProjectsHeader } from "@/components/projects-header"
import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectsStats } from "@/components/projects-stats"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black">
      <ProjectsHeader />
      <main>
        <ProjectsStats />
        <ProjectsGrid />
      </main>
      <Footer />
    </div>
  )
}
