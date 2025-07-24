"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Calendar,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Database,
  Star,
  Eye,
  Info,
} from "lucide-react"
import { ProjectStorage } from "@/lib/project-storage"

interface Project {
  id: number
  title: string
  description: string
  year: string
  category: string
  videoUrl: string
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

interface ProjectManagerProps {
  onProjectsChange: () => void
  isLoading: boolean
}

export function ProjectManager({ onProjectsChange, isLoading }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [storageInfo, setStorageInfo] = useState<any>({})
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    category: "",
    videoUrl: "",
    featured: false,
  })

  const categories = ["Commercial", "Music Video", "Documentary", "Corporate", "Social Media", "Wedding", "Short Film"]

  // Load projects from localStorage on component mount
  useEffect(() => {
    loadProjectsFromStorage()
  }, [])

  const loadProjectsFromStorage = () => {
    const storedProjects = ProjectStorage.load()
    const info = ProjectStorage.getInfo()
    setProjects(storedProjects)
    setStorageInfo(info)
    console.log(`📦 Loaded ${storedProjects.length} projects from localStorage`)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear().toString(),
      category: "",
      videoUrl: "",
      featured: false,
    })
    setSubmitStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Check if trying to add more than 6 featured projects
      if (formData.featured && !editingProject && !ProjectStorage.canAddFeatured()) {
        alert("Maximum 6 featured projects allowed on the landing page. Please unfeature another project first.")
        setIsSubmitting(false)
        return
      }

      // If editing and changing to featured, check limit
      if (formData.featured && editingProject && !editingProject.featured && !ProjectStorage.canAddFeatured()) {
        alert("Maximum 6 featured projects allowed on the landing page. Please unfeature another project first.")
        setIsSubmitting(false)
        return
      }

      let success = false

      if (editingProject) {
        // Update existing project
        success = ProjectStorage.updateProject(editingProject.id, formData)
        console.log(`📝 Updated project ${editingProject.id}:`, success)
      } else {
        // Add new project
        success = ProjectStorage.addProject(formData)
        console.log("➕ Added new project:", success)
      }

      if (success) {
        setSubmitStatus("success")

        // Reload projects from storage
        setTimeout(() => {
          loadProjectsFromStorage()
          onProjectsChange() // Notify parent component
          setShowAddForm(false)
          setEditingProject(null)
          resetForm()
        }, 1000)
      } else {
        throw new Error("Failed to save to localStorage")
      }
    } catch (error) {
      console.error("❌ Failed to save project:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      year: project.year,
      category: project.category,
      videoUrl: project.videoUrl,
      featured: project.featured || false,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const success = ProjectStorage.deleteProject(id)

      if (success) {
        console.log(`🗑️ Deleted project ${id}`)
        loadProjectsFromStorage()
        onProjectsChange() // Notify parent component
      } else {
        alert("Failed to delete project")
      }
    } catch (error) {
      console.error("❌ Failed to delete project:", error)
      alert("Failed to delete project")
    }
  }

  const toggleFeatured = (project: Project) => {
    // If trying to feature and already at limit
    if (!project.featured && !ProjectStorage.canAddFeatured()) {
      alert("Maximum 6 featured projects allowed on the landing page. Please unfeature another project first.")
      return
    }

    const success = ProjectStorage.updateProject(project.id, {
      ...project,
      featured: !project.featured,
    })

    if (success) {
      loadProjectsFromStorage()
      onProjectsChange()
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingProject(null)
    resetForm()
  }

  const handleRefresh = () => {
    loadProjectsFromStorage()
    onProjectsChange()
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete ALL projects? This cannot be undone!")) {
      ProjectStorage.clear()
      loadProjectsFromStorage()
      onProjectsChange()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading projects...</div>
      </div>
    )
  }

  const featuredProjects = projects.filter((p) => p.featured)
  const nonFeaturedProjects = projects.filter((p) => !p.featured)

  return (
    <div className="space-y-6">
      {/* Header with Storage Info */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-white">Project Management</h2>
          <p className="text-gray-400">Add, edit, and manage your video projects</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Database className="h-4 w-4" />
              <span>{storageInfo.totalProjects} total projects</span>
            </div>
            <div className="flex items-center gap-2 text-orange-400">
              <Star className="h-4 w-4" />
              <span>{storageInfo.featuredProjects}/6 featured (landing page)</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Eye className="h-4 w-4" />
              <span>{storageInfo.nonFeaturedProjects} all projects only</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} className="border-gray-600 text-gray-200 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {projects.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="border-red-600 text-red-400 bg-transparent hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white font-semibold">Project Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white h-12"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-semibold">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-semibold">Year *</Label>
                  <Input
                    value={formData.year}
                    onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white h-12"
                    placeholder="2024"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-semibold">YouTube URL *</Label>
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white font-semibold">Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={4}
                  placeholder="Describe your project..."
                  required
                />
              </div>

              {/* Featured Toggle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-5 w-5 text-orange-500" />
                      <Label className="text-white font-semibold">Feature on Landing Page</Label>
                    </div>
                    <p className="text-sm text-gray-400">
                      Featured projects appear in the "Featured Work" section on the homepage (max 6)
                    </p>
                  </div>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                    disabled={!formData.featured && storageInfo.featuredProjects >= 6}
                  />
                </div>

                {!formData.featured && storageInfo.featuredProjects >= 6 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <Info className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <p className="text-yellow-400 text-sm">
                      Maximum featured projects reached (6/6). This project will only appear on the All Projects page.
                    </p>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-green-400">
                    ✅ Project {editingProject ? "updated" : "created"} successfully and saved to localStorage!
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-400">❌ Failed to save project to localStorage. Please try again.</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold flex-1 h-12"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Saving to localStorage...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingProject ? "Update" : "Save"} Project
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="border-gray-600 text-gray-200 bg-transparent h-12"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-orange-500" />
            <h3 className="text-xl font-bold text-white">Featured Projects (Landing Page)</h3>
            <Badge variant="outline" className="border-orange-500 text-orange-400">
              {featuredProjects.length}/6
            </Badge>
          </div>
          <div className="grid gap-4">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="bg-gray-900 border-orange-500/30">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-xl font-bold text-white">{project.title}</h4>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {project.category}
                        </Badge>
                        <Badge className="bg-orange-500 text-black">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-1">
                          Year: <span className="text-white">{project.year}</span>
                        </p>
                      </div>

                      <p className="text-gray-300 mb-4">{project.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Added: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Unknown"}
                          </span>
                        </div>
                        {project.updatedAt && (
                          <div className="flex items-center gap-1">
                            <Edit className="h-4 w-4" />
                            <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleFeatured(project)}
                        className="border-orange-500 text-orange-400 hover:bg-orange-900/20"
                        title="Remove from featured"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(project.videoUrl, "_blank")}
                        className="border-gray-600 text-gray-400 hover:text-white"
                        title="View on YouTube"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(project)}
                        className="border-gray-600 text-gray-400 hover:text-white"
                        title="Edit project"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        className="border-red-600 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Non-Featured Projects Section */}
      {nonFeaturedProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" />
            <h3 className="text-xl font-bold text-white">All Projects Page Only</h3>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              {nonFeaturedProjects.length} projects
            </Badge>
          </div>
          <div className="grid gap-4">
            {nonFeaturedProjects.map((project) => (
              <Card key={project.id} className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-xl font-bold text-white">{project.title}</h4>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          All Projects Only
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-1">
                          Year: <span className="text-white">{project.year}</span>
                        </p>
                      </div>

                      <p className="text-gray-300 mb-4">{project.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Added: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Unknown"}
                          </span>
                        </div>
                        {project.updatedAt && (
                          <div className="flex items-center gap-1">
                            <Edit className="h-4 w-4" />
                            <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleFeatured(project)}
                        className="border-gray-600 text-gray-400 hover:text-orange-400 hover:border-orange-500"
                        title="Add to featured"
                        disabled={storageInfo.featuredProjects >= 6}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(project.videoUrl, "_blank")}
                        className="border-gray-600 text-gray-400 hover:text-white"
                        title="View on YouTube"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(project)}
                        className="border-gray-600 text-gray-400 hover:text-white"
                        title="Edit project"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        className="border-red-600 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400 text-lg">No projects found in localStorage.</p>
            <p className="text-gray-500 text-sm mt-2">Add your first project to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
