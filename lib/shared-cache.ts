// Simple in-memory cache that persists across API calls
class ProjectCache {
  private static instance: ProjectCache
  private projects: any[] = []

  private constructor() {}

  public static getInstance(): ProjectCache {
    if (!ProjectCache.instance) {
      ProjectCache.instance = new ProjectCache()
    }
    return ProjectCache.instance
  }

  public getProjects(): any[] {
    return [...this.projects]
  }

  public setProjects(projects: any[]): void {
    this.projects = [...projects]
    console.log(`Cache updated with ${projects.length} projects`)
  }

  public addProject(project: any): void {
    this.projects.push(project)
    console.log(`Project added to cache. Total: ${this.projects.length}`)
  }

  public updateProject(id: number, updatedProject: any): boolean {
    const index = this.projects.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.projects[index] = updatedProject
      console.log(`Project ${id} updated in cache`)
      return true
    }
    return false
  }

  public deleteProject(id: number): boolean {
    const initialLength = this.projects.length
    this.projects = this.projects.filter((p) => p.id !== id)
    const deleted = this.projects.length < initialLength
    if (deleted) {
      console.log(`Project ${id} deleted from cache. Remaining: ${this.projects.length}`)
    }
    return deleted
  }

  public clear(): void {
    this.projects = []
    console.log("Cache cleared")
  }
}

export const projectCache = ProjectCache.getInstance()
