"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectManager } from "./project-manager"
import { DashboardStats } from "./dashboard-stats"
import { LogOut, BarChart3, Settings, Video } from "lucide-react"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      }
    } catch (error) {
      console.error("Failed to load projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth_token")
    localStorage.removeItem("admin_auth_expiry")
    onLogout()
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Manage your video projects</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-gray-600 text-gray-200 hover:bg-gray-800 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-700">
            <TabsTrigger value="projects" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              <Video className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectManager projects={projects} onProjectsChange={loadProjects} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="stats">
            <DashboardStats projects={projects} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
