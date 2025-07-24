"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Lightbulb, Film, Sparkles, ArrowRight, Play, CheckCircle, Target, Palette, Rocket } from "lucide-react"

const processSteps = [
  {
    id: 1,
    icon: Search,
    title: "DISCOVERY",
    subtitle: "Understanding Your Vision",
    description:
      "Deep dive into your project goals, target audience, and creative vision through detailed consultation.",
    details: ["Project briefing", "Vision alignment", "Reference gathering", "Timeline planning"],
    color: "from-orange-500 to-red-500",
    duration: "1-2 days",
    detailIcon: Target,
    detailDescription:
      "I start every project by thoroughly understanding your goals, target audience, and creative vision. This discovery phase ensures we're perfectly aligned before moving forward with production.",
    keyPoints: [
      "Comprehensive project briefing and goal setting",
      "Target audience analysis and creative direction",
      "Reference material gathering and mood boarding",
      "Detailed timeline and milestone planning",
    ],
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "PLANNING",
    subtitle: "Strategic Development",
    description: "Crafting the perfect strategy with storyboards, shot lists, and technical specifications.",
    details: ["Storyboard creation", "Technical planning", "Resource allocation", "Timeline finalization"],
    color: "from-yellow-500 to-orange-500",
    duration: "2-3 days",
    detailIcon: CheckCircle,
    detailDescription:
      "Strategic planning transforms your vision into actionable steps. I create detailed storyboards, technical specifications, and resource allocation plans to ensure smooth execution.",
    keyPoints: [
      "Detailed storyboard and shot list creation",
      "Technical specifications and equipment planning",
      "Resource allocation and team coordination",
      "Final timeline confirmation and milestone setting",
    ],
  },
  {
    id: 3,
    icon: Film,
    title: "CREATION",
    subtitle: "Bringing It to Life",
    description: "The magic happens here - editing, color grading, sound design, and visual effects come together.",
    details: ["Video editing", "Color grading", "Sound design", "VFX integration"],
    color: "from-purple-500 to-pink-500",
    duration: "5-10 days",
    detailIcon: Palette,
    detailDescription:
      "This is where the magic happens. Using industry-leading tools and techniques, I craft your story through precise editing, stunning color grading, immersive sound design, and seamless visual effects.",
    keyPoints: [
      "Precision video editing with perfect pacing",
      "Professional color grading and visual enhancement",
      "Custom sound design and audio mixing",
      "Seamless visual effects and motion graphics integration",
    ],
  },
  {
    id: 4,
    icon: Sparkles,
    title: "DELIVERY",
    subtitle: "Final Masterpiece",
    description: "Quality control, final revisions, and delivery in all required formats for maximum impact.",
    details: ["Quality review", "Client feedback", "Final revisions", "Format delivery"],
    color: "from-green-500 to-blue-500",
    duration: "1-2 days",
    detailIcon: Rocket,
    detailDescription:
      "The final phase ensures your project meets the highest standards. After thorough quality control and client feedback integration, I deliver your masterpiece in all required formats.",
    keyPoints: [
      "Comprehensive quality control and review process",
      "Client feedback integration and revisions",
      "Final polish and optimization",
      "Multi-format delivery for all platforms",
    ],
  },
]

export function CreativeProcess() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 film-grain opacity-30" />
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-16 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-orange-500 to-transparent opacity-60" />
      <div className="absolute bottom-24 sm:bottom-32 right-8 sm:right-16 w-0.5 sm:w-1 h-16 sm:h-32 bg-gradient-to-b from-purple-500 to-transparent opacity-40" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
            <span className="text-white">MY CREATIVE</span> <span className="gradient-text">PROCESS</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            From initial concept to final delivery, here's how I transform your vision into cinematic reality
          </p>
        </div>

        {/* Mobile Timeline Navigation */}
        <div className="block sm:hidden mb-8">
          <div className="flex overflow-x-auto gap-2 pb-4 px-4">
            {processSteps.map((step) => (
              <Button
                key={step.id}
                variant={activeStep === step.id ? "default" : "outline"}
                size="sm"
                className={`flex-shrink-0 ${
                  activeStep === step.id
                    ? "bg-orange-500 text-black hover:bg-orange-600"
                    : "text-gray-400 hover:text-white border-gray-600"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <step.icon className="h-3 w-3 mr-1" />
                <span className="text-xs">{step.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Desktop Timeline Navigation */}
        <div className="hidden sm:flex justify-center mb-8 lg:mb-12">
          <div className="flex items-center gap-2 lg:gap-4 bg-gray-900 rounded-full p-2 border border-gray-700 overflow-x-auto">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <Button
                  variant={activeStep === step.id ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full whitespace-nowrap ${
                    activeStep === step.id
                      ? "bg-orange-500 text-black hover:bg-orange-600"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <step.icon className="h-3 lg:h-4 w-3 lg:w-4 mr-1 lg:mr-2" />
                  <span className="text-xs lg:text-sm">{step.title}</span>
                </Button>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="h-3 lg:h-4 w-3 lg:w-4 text-gray-600 mx-1 lg:mx-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps - Mobile Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {processSteps.map((step) => (
            <Card
              key={step.id}
              className={`relative overflow-hidden transition-all duration-500 cursor-pointer ${
                activeStep === step.id
                  ? "bg-gray-800 border-orange-500 scale-105 shadow-2xl"
                  : "bg-gray-900 border-gray-700 hover:border-gray-600"
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              {/* Step Number */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <div
                  className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                    activeStep === step.id ? "bg-orange-500 text-black" : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {step.id}
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="mb-4 sm:mb-6">
                  <div
                    className={`w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-gradient-to-br ${step.color} p-3 sm:p-4 mb-3 sm:mb-4 ${
                      activeStep === step.id ? "shadow-lg" : ""
                    }`}
                  >
                    <step.icon className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-orange-400 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{step.description}</p>
                </div>

                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {step.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-orange-500 rounded-full" />
                      <span className="text-xs text-gray-400">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Duration</span>
                  <span className="text-xs sm:text-sm font-bold text-orange-400">{step.duration}</span>
                </div>
              </CardContent>

              {/* Active Step Indicator */}
              {activeStep === step.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-400" />
              )}
            </Card>
          ))}
        </div>

        {/* Active Step Details - Mobile Optimized */}
        <Card className="bg-gray-900 border-gray-700 max-w-4xl mx-auto">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div
                    className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br ${processSteps[activeStep - 1].color} p-2 sm:p-3`}
                  >
                    {(() => {
                      const IconComponent = processSteps[activeStep - 1].icon
                      return <IconComponent className="h-6 w-6 text-white" />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-white">{processSteps[activeStep - 1].title}</h3>
                    <p className="text-orange-400 font-semibold text-sm sm:text-base">
                      {processSteps[activeStep - 1].subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                  {processSteps[activeStep - 1].detailDescription}
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm sm:text-base">
                  <Play className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
                  See This Step in Action
                </Button>
              </div>

              {/* Icon Section instead of Image */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gray-800 rounded-xl border border-gray-700">
                <div
                  className={`w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full bg-gradient-to-br ${processSteps[activeStep - 1].color} p-6 sm:p-8 mb-4 sm:mb-6 shadow-2xl`}
                >
                  {(() => {
                    const DetailIcon = processSteps[activeStep - 1].detailIcon
                    return <DetailIcon className="h-full w-full text-white" />
                  })()}
                </div>

                <div className="space-y-2 sm:space-y-3 text-center">
                  {processSteps[activeStep - 1].keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2 text-left">
                      <CheckCircle className="h-3 sm:h-4 w-3 sm:w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
