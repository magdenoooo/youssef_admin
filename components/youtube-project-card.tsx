"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Award, Eye, Clock, ExternalLink, Maximize } from "lucide-react"

interface YouTubeProjectCardProps {
  project: {
    id: number
    title: string
    category: string
    client: string
    duration: string
    views: string
    awards: number
    description: string
    tags: string[]
    youtubeId: string // YouTube video ID
    featured?: boolean
  }
  size?: "small" | "medium" | "large"
}

export function YouTubeProjectCard({ project, size = "medium" }: YouTubeProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getYouTubeThumbnail = (videoId: string, quality = "maxresdefault") => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
  }

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  }

  const cardSizes = {
    small: "aspect-video",
    medium: "aspect-video",
    large: "aspect-video lg:aspect-[16/10]",
  }

  const titleSizes = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  }

  return (
    <Card
      className={`group overflow-hidden bg-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-500 ${
        project.featured ? "ring-2 ring-orange-500/30" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${cardSizes[size]} overflow-hidden`}>
        {!isPlaying ? (
          <>
            {/* YouTube Thumbnail */}
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(${getYouTubeThumbnail(project.youtubeId)})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Play Button Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                size="icon"
                className={`${
                  size === "large" ? "h-20 w-20" : size === "medium" ? "h-16 w-16" : "h-12 w-12"
                } rounded-full bg-orange-500 hover:bg-orange-600 neon-glow`}
                onClick={() => setIsPlaying(true)}
              >
                <Play
                  className={`${size === "large" ? "h-10 w-10" : size === "medium" ? "h-8 w-8" : "h-6 w-6"} text-black ml-1`}
                />
              </Button>
            </div>

            {/* YouTube Logo */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              YouTube
            </div>
          </>
        ) : (
          <>
            {/* YouTube Embed */}
            <iframe
              src={getEmbedUrl(project.youtubeId)}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Close/Minimize Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsPlaying(false)}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Top Badges */}
        {!isPlaying && (
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-orange-500 text-black font-bold">{project.category}</Badge>
            {project.awards > 0 && (
              <Badge variant="secondary" className="bg-yellow-600 text-black font-bold">
                <Award className="w-3 h-3 mr-1" />
                {project.awards}
              </Badge>
            )}
          </div>
        )}

        {/* Bottom Info */}
        {!isPlaying && size !== "small" && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className={`${titleSizes[size]} font-black text-white mb-2`}>{project.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.views}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-6">
        {size === "small" && <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{project.title}</h3>}

        <div className="mb-4">
          <div className="text-sm text-orange-400 font-bold uppercase tracking-wider mb-2">{project.client}</div>
          {size !== "small" && <p className="text-gray-300">{project.description}</p>}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, size === "small" ? 2 : 4).map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="outline" className="border-gray-600 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="flex-1 group text-gray-200 hover:text-orange-400"
            onClick={() => setIsPlaying(true)}
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Now
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-200 hover:text-orange-400">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
