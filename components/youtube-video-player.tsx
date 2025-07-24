"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Maximize2, ExternalLink } from "lucide-react"

interface YouTubeVideoPlayerProps {
  videoUrl: string
  title: string
  className?: string
  autoplay?: boolean
}

export function YouTubeVideoPlayer({ videoUrl, title, className = "", autoplay = false }: YouTubeVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  // Get YouTube thumbnail
  const getThumbnailUrl = (videoId: string, quality = "maxresdefault"): string => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
  }

  // Get YouTube embed URL
  const getEmbedUrl = (videoId: string): string => {
    const params = new URLSearchParams({
      autoplay: autoplay || isPlaying ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  const videoId = getYouTubeVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className={`aspect-video bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-400">Invalid YouTube URL</p>
      </div>
    )
  }

  return (
    <div className={`relative aspect-video rounded-lg overflow-hidden bg-black ${className}`}>
      {!isPlaying ? (
        <>
          {/* Thumbnail */}
          <img
            src={getThumbnailUrl(videoId) || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to medium quality thumbnail if maxres fails
              const target = e.target as HTMLImageElement
              target.src = getThumbnailUrl(videoId, "mqdefault")
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group hover:bg-black/60 transition-colors">
            <Button
              size="icon"
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-orange-500 hover:bg-orange-600 neon-glow group-hover:scale-110 transition-transform"
              onClick={() => setIsPlaying(true)}
            >
              <Play className="h-8 w-8 lg:h-10 lg:w-10 text-black ml-1" />
            </Button>
          </div>

          {/* YouTube Badge */}
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            YouTube
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-bold text-sm lg:text-base line-clamp-2">{title}</h3>
          </div>
        </>
      ) : (
        <>
          {/* YouTube Embed */}
          <iframe
            src={getEmbedUrl(videoId)}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Controls Overlay */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="bg-black/50 hover:bg-black/70 text-white h-8 w-8"
              onClick={() => setIsPlaying(false)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="bg-black/50 hover:bg-black/70 text-white h-8 w-8"
              onClick={() => window.open(videoUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
