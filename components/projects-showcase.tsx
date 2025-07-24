"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { ProjectStorage } from "@/lib/project-storage"

const categories = ["All", "Commercial", "Music Video", "Documentary", "Corporate", "Social Media"]

interface Project {
  id: number
  title: string
  category: string
  client: string
  year: string
  duration: string
  views: string
  awards: number
  likes?: string
  description: string
  tags: string[]
  videoUrl: string
  featured?: boolean
}

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    try {
      // Load only featured projects for the landing page
      const featuredProjects = ProjectStorage.loadFeatured()
      console.log(`📦 Loaded ${featuredProjects.length} featured projects for showcase`)
      setProjects(featuredProjects)
    } catch (error) {
      console.error("❌ Failed to load featured projects for showcase:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  if (isLoading) {
    return (
      <section id="work" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="text-white">Loading featured projects...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="work" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6">
            <span className="text-white">FEATURED</span> <span className="gradient-text">WORK</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Watch my latest featured projects directly embedded from YouTube - each video showcases different aspects of
            my editing expertise
          </p>
        </div>

        {/* Category Filter */}
        {projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-8 lg:mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-orange-500 text-black hover:bg-orange-600"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                } font-bold uppercase tracking-wider text-xs lg:text-sm px-3 lg:px-4 py-2`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Featured Projects Grid */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* View All Projects Button */}
            <div className="text-center mt-8 lg:mt-12">
              <a href="/projects">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 lg:px-8">
                  VIEW ALL PROJECTS
                </Button>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No featured projects available yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Add projects through the admin panel and mark them as "featured" to display them here.
            </p>
            <div className="mt-6">
              <a href="/admin">
                <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">Go to Admin Panel</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
