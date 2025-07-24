// Client-side storage utilities
export const ProjectStorage = {
  STORAGE_KEY: "youssef_admin_projects",

  // Save projects to localStorage
  save: (projects: any[]): boolean => {
    try {
      if (typeof window !== "undefined") {
        const dataToStore = {
          projects,
          lastUpdated: new Date().toISOString(),
          version: "1.0",
        }
        localStorage.setItem(ProjectStorage.STORAGE_KEY, JSON.stringify(dataToStore))
        console.log(`✅ Saved ${projects.length} projects to localStorage`)
        return true
      }
    } catch (error) {
      console.error("❌ Failed to save to localStorage:", error)
    }
    return false
  },

  // Load projects from localStorage
  load: (): any[] => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(ProjectStorage.STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored)
          const projects = data.projects || []
          console.log(`✅ Loaded ${projects.length} projects from localStorage`)
          return Array.isArray(projects) ? projects : []
        }
      }
    } catch (error) {
      console.error("❌ Failed to load from localStorage:", error)
    }
    return []
  },

  // Load only featured projects (for landing page)
  loadFeatured: (): any[] => {
    const allProjects = ProjectStorage.load()
    const featured = allProjects.filter((project) => project.featured === true)
    console.log(`✅ Loaded ${featured.length} featured projects`)
    return featured
  },

  // Load all projects (for All Projects page)
  loadAll: (): any[] => {
    return ProjectStorage.load()
  },

  // Add a single project
  addProject: (project: any): boolean => {
    const projects = ProjectStorage.load()
    const newId = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id || 0)) + 1 : 1

    const newProject = {
      ...project,
      id: newId,
      createdAt: new Date().toISOString(),
      featured: project.featured || false, // Default to not featured
    }

    projects.push(newProject)
    return ProjectStorage.save(projects)
  },

  // Update a project
  updateProject: (id: number, updatedProject: any): boolean => {
    const projects = ProjectStorage.load()
    const index = projects.findIndex((p: any) => p.id === id)

    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...updatedProject,
        id, // Ensure ID doesn't change
        updatedAt: new Date().toISOString(),
      }
      return ProjectStorage.save(projects)
    }
    return false
  },

  // Delete a project
  deleteProject: (id: number): boolean => {
    const projects = ProjectStorage.load()
    const filteredProjects = projects.filter((p: any) => p.id !== id)

    if (filteredProjects.length < projects.length) {
      return ProjectStorage.save(filteredProjects)
    }
    return false
  },

  // Clear all projects
  clear: (): boolean => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(ProjectStorage.STORAGE_KEY)
        console.log("✅ Cleared all projects from localStorage")
        return true
      }
    } catch (error) {
      console.error("❌ Failed to clear localStorage:", error)
    }
    return false
  },

  // Get storage info with featured/total breakdown
  getInfo: () => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(ProjectStorage.STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored)
          const projects = data.projects || []
          const featuredCount = projects.filter((p: any) => p.featured === true).length

          return {
            totalProjects: projects.length,
            featuredProjects: featuredCount,
            nonFeaturedProjects: projects.length - featuredCount,
            lastUpdated: data.lastUpdated,
            version: data.version,
          }
        }
      }
    } catch (error) {
      console.error("❌ Failed to get storage info:", error)
    }
    return {
      totalProjects: 0,
      featuredProjects: 0,
      nonFeaturedProjects: 0,
      lastUpdated: null,
      version: null,
    }
  },

  // Check if we can add more featured projects (max 6)
  canAddFeatured: (): boolean => {
    const info = ProjectStorage.getInfo()
    return info.featuredProjects < 6
  },

  // Get featured projects count
  getFeaturedCount: (): number => {
    const info = ProjectStorage.getInfo()
    return info.featuredProjects
  },
}
