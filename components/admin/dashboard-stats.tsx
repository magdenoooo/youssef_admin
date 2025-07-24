"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Video, Calendar, TrendingUp } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  year: string
  category: string
  videoUrl: string
  createdAt?: string
}

interface DashboardStatsProps {
  projects: Project[]
}

export function DashboardStats({ projects }: DashboardStatsProps) {
  const totalProjects = projects.length

  const categoryStats = projects.reduce(
    (acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const yearStats = projects.reduce(
    (acc, project) => {
      acc[project.year] = (acc[project.year] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: Video,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Categories",
      value: Object.keys(categoryStats).length,
      icon: BarChart3,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "Years Active",
      value: Object.keys(yearStats).length,
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      title: "This Year",
      value: yearStats[new Date().getFullYear().toString()] || 0,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white mb-2">Dashboard Statistics</h2>
        <p className="text-gray-400">Overview of your video portfolio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-black text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Projects by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(categoryStats).length === 0 ? (
              <p className="text-gray-400 text-center py-4">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-300">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(count / totalProjects) * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-bold text-sm w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Projects by Year</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(yearStats).length === 0 ? (
              <p className="text-gray-400 text-center py-4">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(yearStats)
                  .sort(([a], [b]) => Number.parseInt(b) - Number.parseInt(a))
                  .map(([year, count]) => (
                    <div key={year} className="flex justify-between items-center">
                      <span className="text-gray-300">{year}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(count / totalProjects) * 100}%` }}
                          />
                        </div>
                        <span className="text-white font-bold text-sm w-8">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No projects yet. Add your first project to get started!</p>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">{project.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {project.category} • {project.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 text-sm">
                      {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Unknown date"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
