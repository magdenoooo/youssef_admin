import { YouTubeProjectCard } from "@/components/youtube-project-card"

const youtubeProjects = [
  {
    id: 1,
    title: "NEON DREAMS",
    category: "Music Video",
    client: "Rising Star Records",
    duration: "3:45",
    views: "2.1M",
    awards: 3,
    description: "Cyberpunk-inspired music video with dynamic color grading and seamless VFX integration",
    tags: ["Color Grading", "VFX", "Motion Graphics"],
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    featured: true,
  },
  {
    id: 2,
    title: "TECH REVOLUTION",
    category: "Commercial",
    client: "InnovateTech",
    duration: "1:30",
    views: "850K",
    awards: 2,
    description: "High-energy commercial showcasing cutting-edge technology with cinematic storytelling",
    tags: ["Commercial", "Product Demo", "Sound Design"],
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    featured: true,
  },
  {
    id: 3,
    title: "OCEAN'S CALL",
    category: "Documentary",
    client: "Nature Films",
    duration: "52:00",
    views: "1.5M",
    awards: 5,
    description: "Award-winning environmental documentary with stunning underwater cinematography",
    tags: ["Documentary", "Color Correction", "Audio Mix"],
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    featured: false,
  },
  {
    id: 4,
    title: "BRAND STORY",
    category: "Corporate",
    client: "Global Corp",
    duration: "8:20",
    views: "320K",
    awards: 1,
    description: "Corporate brand story highlighting company values and mission",
    tags: ["Corporate", "Branding", "Interview"],
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    featured: false,
  },
]

export function YouTubePortfolio() {
  const featuredProjects = youtubeProjects.filter((project) => project.featured)
  const regularProjects = youtubeProjects.filter((project) => !project.featured)

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">FEATURED</span> <span className="gradient-text">WORK</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Watch my latest projects directly on the site - each video showcases different aspects of my editing
            expertise
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <YouTubeProjectCard key={project.id} project={project} size="large" />
          ))}
        </div>

        {/* Regular Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project) => (
            <YouTubeProjectCard key={project.id} project={project} size="medium" />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/projects" className="inline-block">
            <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-3 rounded-lg transition-colors">
              VIEW ALL PROJECTS
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
