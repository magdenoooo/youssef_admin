"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { ProjectStorage } from "@/lib/project-storage"

const categories = [
  "All",
  "Commercial",
  "Music Video",
  "Documentary",
  "Corporate",
  "Social Media",
  "Wedding",
  "Short Film",
]

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

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    try {
      // Load ALL projects for the All Projects page
      const allProjects = ProjectStorage.loadAll()
      console.log(`📦 Loaded ${allProjects.length} total projects for All Projects page`)
      setProjects(allProjects)
    } catch (error) {
      console.error("❌ Failed to load projects for All Projects page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  const featuredProjects = filteredProjects.filter((p) => p.featured)
  const nonFeaturedProjects = filteredProjects.filter((p) => !p.featured)

  if (isLoading) {
    return (
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="text-white">Loading all projects...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="container mx-auto">
        {/* Category Filter */}
        {projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-8 lg:mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-orange-500 text-black hover:bg-orange-600"
                    : "border-gray-600 text-gray-200 hover:bg-gray-800"
                } font-bold uppercase tracking-wider text-xs lg:text-sm px-3 lg:px-4 py-2`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Projects Count */}
        {projects.length > 0 && (
          <div className="text-center mb-6 lg:mb-8">
            <p className="text-gray-400 text-sm lg:text-base">
              Showing <span className="text-orange-400 font-bold">{filteredProjects.length}</span> projects
              {selectedCategory !== "All" && (
                <span>
                  {" "}
                  in <span className="text-orange-400 font-bold">{selectedCategory}</span>
                </span>
              )}
              {featuredProjects.length > 0 && (
                <span className="ml-2">
                  • <span className="text-orange-400 font-bold">{featuredProjects.length}</span> featured
                </span>
              )}
            </p>
          </div>
        )}

        {/* All Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {/* Show featured projects first */}
            {featuredProjects.map((project) => (
              <div key={project.id} className="relative">
                <ProjectCard project={project} />
                {/* Featured badge */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    FEATURED
                  </div>
                </div>
              </div>
            ))}

            {/* Then show non-featured projects */}
            {nonFeaturedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects available yet.</p>
            <p className="text-gray-500 text-sm mt-2">Projects added through the admin panel will appear here.</p>
            <div className="mt-6">
              <a href="/admin">
                <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">Go to Admin Panel</Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
