"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Play } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          <Link href="/" className="flex items-center gap-2 lg:gap-3">
            <div className="w-6 lg:w-8 h-6 lg:h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="h-3 lg:h-4 w-3 lg:w-4 text-white" />
            </div>
            <span className="text-lg lg:text-2xl font-black gradient-text">Youssef Ismail</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("work")}
              className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-sm"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-sm"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-sm"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-sm"
            >
              Contact
            </button>
            <Link
              href="/projects"
              className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-sm"
            >
              All Projects
            </Link>
          </nav>

          <Button
            className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm lg:text-base px-4 lg:px-6"
            onClick={() => scrollToSection("contact")}
          >
            HIRE ME
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white h-8 w-8 lg:h-10 lg:w-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 bg-black/95">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("work")}
                className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-left"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider text-left"
              >
                Contact
              </button>
              <Link
                href="/projects"
                className="text-gray-200 hover:text-orange-400 transition-colors font-medium uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                All Projects
              </Link>
              <Button
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-black font-bold"
                onClick={() => scrollToSection("contact")}
              >
                HIRE ME
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
