"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Film, Palette, Headphones, Zap, Award, Users, Clock } from "lucide-react"
import Image from "next/image"

const skills = [
  { name: "Adobe Premiere Pro", level: 90, icon: Film },
  { name: "After Effects", level: 85, icon: Zap },
  { name: "DaVinci Resolve", level: 80, icon: Palette },
  { name: "Lumetri Color", level: 75, icon: Camera },
  { name: "Adobe Media Encoder", level: 70, icon: Headphones },
  { name: "Essential Sound Panel", level: 65, icon: Film },
]

const achievements = [
  { icon: Award, number: "3+", label: "Industry Awards" },
  { icon: Users, number: "90+", label: "Happy Clients" },
  { icon: Clock, number: "2K+", label: "Hours Edited" },
  { icon: Film, number: "100+", label: "Projects Completed" },
]

export function About() {
  return (
    <section id="about" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6 text-center lg:text-left">
                <span className="text-gray-100">THE</span> <span className="gradient-text">ARTIST</span>
                <br />
                <span className="text-white">BEHIND THE LENS</span>
              </h2>
              <div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-gray-300 leading-relaxed">
                <p>
I'm Youssef Ismail — a passionate video editor with over 2 years of hands-on experience turning raw footage into stories that move, inspire, and connect.
                </p>
                <p className="hidden sm:block">
My journey started with a deep love for storytelling. I didn’t learn this craft in a classroom — I learned it through long nights in the editing room, experimenting, refining, and discovering how every frame can carry emotion.
                </p>
                <p className="hidden lg:block">
From dynamic ads to personal documentaries, I blend technical precision with creative instinct to shape visuals that leave a lasting impact. For me, it’s not just about cutting clips — it’s about crafting meaning, one frame at a time.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 lg:mb-3">
                    <achievement.icon className="h-6 lg:h-8 w-6 lg:w-8 text-orange-500" />
                  </div>
                  <div className="text-xl lg:text-2xl font-black gradient-text">{achievement.number}</div>
                  <div className="text-xs lg:text-sm text-gray-400 uppercase tracking-wider">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center lg:text-left">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 lg:px-8">
                DOWNLOAD RESUME
              </Button>
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-gray-900 border border-gray-700">
                <div className="relative w-full h-full">
                  <Image
                    src="/owner-portrait.jpg"
                    alt="Youssef Smail - Professional Video Editor Portrait"
                    fill
                    className="object-cover"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=500&width=500&text=Youssef+Smail"
                    }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 lg:-bottom-4 -right-3 lg:-right-4 bg-orange-500 text-black px-3 lg:px-4 py-1 lg:py-2 rounded-full font-bold text-sm lg:text-base">
                EDITOR
              </div>
            </div>

            {/* Skills */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">TECHNICAL EXPERTISE</h3>
                <div className="space-y-3 lg:space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <skill.icon className="h-4 lg:h-5 w-4 lg:w-5 text-orange-500" />
                          <span className="text-white font-medium text-sm lg:text-base">{skill.name}</span>
                        </div>
                        <span className="text-orange-400 font-bold text-sm lg:text-base">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 lg:h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-yellow-400 h-1.5 lg:h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
