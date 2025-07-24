"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ProjectsHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
              <span className="text-2xl font-black gradient-text">YOUSSEF SMAIL</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <span>/</span>
              <span className="text-white font-semibold">Projects</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 border border-gray-700">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 w-48"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-600 text-gray-200 hover:bg-gray-800 bg-transparent"
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Link href="/">
              <Button variant="ghost" className="text-gray-200 hover:text-orange-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
