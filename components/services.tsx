"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Film, Palette, Volume2, Sparkles, Clock, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Film,
    title: "CINEMATIC EDITING",
    subtitle: "Professional Video Editing",
    description:
      "Transform raw footage into compelling narratives with precision cuts, seamless transitions, and perfect pacing.",
    features: ["Multi-cam editing", "Advanced transitions", "Rhythm & pacing", "Format optimization"],
    duration: "3-7 days",
    popular: true,
  },
  {
    icon: Palette,
    title: "COLOR MASTERY",
    subtitle: "Color Grading & Correction",
    description: "Enhance your visuals with professional color grading that sets the mood and elevates your story.",
    features: ["Color correction", "Creative grading", "LUT creation", "Consistency matching"],
    duration: "2-4 days",
    popular: false,
  },
  {
    icon: Volume2,
    title: "AUDIO EXCELLENCE",
    subtitle: "Sound Design & Mixing",
    description: "Complete audio post-production including mixing, mastering, and custom sound design.",
    features: ["Audio cleanup", "Music mixing", "Sound effects", "Voice enhancement"],
    duration: "1-3 days",
    popular: false,
  },
  {
    icon: Sparkles,
    title: "MOTION MAGIC",
    subtitle: "Motion Graphics & VFX",
    description: "Custom animations, visual effects, and motion graphics that make your content unforgettable.",
    features: ["Custom animations", "Title sequences", "Logo animations", "Visual effects"],
    duration: "3-5 days",
    popular: false,
  },
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6">
            <span className="text-white">CREATIVE</span> <span className="gradient-text">SERVICES</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Comprehensive video production services that bring your vision to life with cinematic quality
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden bg-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-500 group ${
                service.popular ? "ring-2 ring-orange-500/30" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-black px-3 lg:px-4 py-1 text-xs lg:text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <CardHeader className="pb-4 p-4 lg:p-6">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div className="p-3 lg:p-4 bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-xl border border-orange-500/30">
                    <service.icon className="h-6 lg:h-8 w-6 lg:w-8 text-orange-500" />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs lg:text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.duration}
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-lg lg:text-2xl font-black text-white mb-2">{service.title}</CardTitle>
                <div className="text-orange-400 font-semibold uppercase tracking-wider text-xs lg:text-sm">
                  {service.subtitle}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 lg:space-y-6 p-4 lg:p-6 pt-0">
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{service.description}</p>

                <div>
                  <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-sm lg:text-base">
                    What's Included:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-orange-500 rounded-full flex-shrink-0" />
                        <span className="text-xs lg:text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold group text-sm lg:text-base py-3 lg:py-4"
                  onClick={() => scrollToSection("contact")}
                >
                  GET STARTED
                  <ArrowRight className="ml-2 h-3 lg:h-4 w-3 lg:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Custom Projects CTA */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 max-w-4xl mx-auto">
          <CardContent className="p-6 lg:p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                <span className="text-gray-100">CUSTOM</span> <span className="gradient-text">PROJECTS</span>
              </h3>
              <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                Have a unique vision? Let's collaborate to create something extraordinary that pushes creative
                boundaries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 lg:px-8 text-sm lg:text-base"
                onClick={() => scrollToSection("contact")}
              >
                DISCUSS PROJECT
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-6 lg:px-8 bg-transparent text-sm lg:text-base"
                onClick={() => scrollToSection("work")}
              >
                VIEW PORTFOLIO
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
