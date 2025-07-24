"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Youtube, Instagram, Twitter, Play, Mail, Phone } from "lucide-react"

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

// Custom Facebook icon component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="h-5 w-5 text-white" />
              </div>
              <span className="text-3xl font-black gradient-text">YOUSSEF SMAIL</span>
            </div>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Professional video editor with 2+ years of experience crafting cinematic stories that captivate audiences
              and drive results. Let's bring your vision to life.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-600/20 text-red-500 hover:text-red-400 transition-all duration-300 hover:scale-110"
                onClick={() => window.open("https://www.youtube.com/@yousifalmuhamadyousifalmuhamad", "_blank")}
              >
                <Youtube className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-600/20 text-pink-500 hover:text-pink-400 transition-all duration-300 hover:scale-110"
                onClick={() => window.open("https://www.instagram.com/yousifalmuhamad/", "_blank")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                onClick={() => window.open("https://twitter.com/yousifalmuhamad", "_blank")}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-700/20 text-blue-600 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                onClick={() => window.open("https://www.facebook.com/yousifalmuhamad/", "_blank")}
              >
                <FacebookIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-white hover:text-gray-200 transition-all duration-300 hover:scale-110"
                onClick={() => window.open("https://www.tiktok.com/@yousifalmuhamad", "_blank")}
              >
                <TikTokIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Cinematic Editing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Color Grading
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Audio Post-Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Motion Graphics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Visual Effects
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection("work")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Featured Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  About Youssef
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link href="/projects" className="hover:text-orange-400 transition-colors">
                  All Projects
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              <p>&copy; 2024 Youssef Smail. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span>yousifalmuhamad@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span>+20 15 01140418</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
