"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Award, Eye, Clock } from "lucide-react"

const categories = ["All", "Commercial", "Music Video", "Documentary", "Corporate", "Social Media"]

const portfolioItems = [
  {
    title: "NEON DREAMS",
    category: "Music Video",
    client: "Rising Star Records",
    duration: "3:45",
    views: "2.1M",
    awards: 3,
    description: "Cyberpunk-inspired music video with dynamic color grading and seamless VFX integration",
    tags: ["Color Grading", "VFX", "Motion Graphics"],
    featured: true,
  },
  {
    title: "TECH REVOLUTION",
    category: "Commercial",
    client: "InnovateTech",
    duration: "1:30",
    views: "850K",
    awards: 2,
    description: "High-energy commercial showcasing cutting-edge technology with cinematic storytelling",
    tags: ["Commercial", "Product Demo", "Sound Design"],
    featured: true,
  },
  {
    title: "OCEAN'S CALL",
    category: "Documentary",
    client: "Nature Films",
    duration: "52:00",
    views: "1.5M",
    awards: 5,
    description: "Award-winning environmental documentary with stunning underwater cinematography",
    tags: ["Documentary", "Color Correction", "Audio Mix"],
    featured: false,
  },
  {
    title: "BRAND STORY",
    category: "Corporate",
    client: "Global Corp",
    duration: "8:20",
    views: "320K",
    awards: 1,
    description: "Corporate brand story highlighting company values and mission",
    tags: ["Corporate", "Branding", "Interview"],
    featured: false,
  },
  {
    title: "VIRAL MOMENT",
    category: "Social Media",
    client: "Influencer Co",
    duration: "0:45",
    views: "5.2M",
    awards: 0,
    description: "Viral social media content with trending effects and perfect timing",
    tags: ["Social Media", "Trending", "Quick Edit"],
    featured: false,
  },
  {
    title: "LOVE ETERNAL",
    category: "Music Video",
    client: "Indie Artist",
    duration: "4:12",
    views: "680K",
    awards: 1,
    description: "Emotional ballad with cinematic storytelling and beautiful color palette",
    tags: ["Emotional", "Cinematic", "Color Grade"],
    featured: false,
  },
]

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const filteredItems = portfolioItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory,
  )

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">FEATURED</span> <span className="gradient-text">WORK</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated selection of my most impactful projects across various industries and formats
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category
                  ? "bg-orange-500 text-black hover:bg-orange-600"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              } font-bold uppercase tracking-wider`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredItems
            .filter((item) => item.featured)
            .map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-500"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=300&width=500&query=${encodeURIComponent(item.category + " " + item.title + " thumbnail")})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Overlay Content */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredItem === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Button size="icon" className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600 neon-glow">
                      <Play className="h-8 w-8 text-black ml-1" />
                    </Button>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-orange-500 text-black font-bold">{item.category}</Badge>
                    {item.awards > 0 && (
                      <Badge variant="secondary" className="bg-yellow-600 text-black font-bold">
                        <Award className="w-3 h-3 mr-1" />
                        {item.awards}
                      </Badge>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-orange-400 font-bold uppercase tracking-wider mb-2">{item.client}</div>
                    <p className="text-gray-300">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-gray-600 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems
            .filter((item) => !item.featured)
            .map((item, index) => (
              <Card
                key={index + 100}
                className="group overflow-hidden bg-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=200&width=350&query=${encodeURIComponent(item.category + " " + item.title + " thumbnail")})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600">
                      <Play className="h-6 w-6 text-black ml-0.5" />
                    </Button>
                  </div>

                  <Badge className="absolute top-3 left-3 bg-orange-500 text-black font-bold">{item.category}</Badge>

                  <div className="absolute bottom-3 right-3 flex gap-2">
                    {item.awards > 0 && (
                      <Badge variant="secondary" className="bg-yellow-600 text-black">
                        <Award className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <div className="text-sm text-orange-400 font-semibold mb-2">{item.client}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span>{item.views} views</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8">
            VIEW FULL PORTFOLIO
          </Button>
        </div>
      </div>
    </section>
  )
}
