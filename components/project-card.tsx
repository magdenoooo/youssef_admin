"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { YouTubeVideoPlayer } from "@/components/youtube-video-player"
import { Calendar } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  year: string
  category: string
  videoUrl: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden bg-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-500">
      {/* Video Player */}
      <div className="relative">
        <YouTubeVideoPlayer videoUrl={project.videoUrl} title={project.title} />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-orange-500 text-black font-bold text-xs">{project.category}</Badge>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.title}</h3>

        {/* Date */}
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
          <Calendar className="w-4 h-4" />
          {project.year}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{project.description}</p>
      </CardContent>
    </Card>
  )
}
