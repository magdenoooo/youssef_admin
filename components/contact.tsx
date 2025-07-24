"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, Award, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Create email content
      const emailSubject = `New Project Inquiry from ${formData.name}`
      const emailBody = `
New project inquiry received:

Name: ${formData.name}
Email: ${formData.email}
Service: ${formData.service || "Not specified"}
Budget: ${formData.budget || "Not specified"}
Timeline: ${formData.timeline || "Not specified"}

Message:
${formData.message}

---
This message was sent from your video editor website contact form.
      `.trim()

      // Create mailto link
      const mailtoLink = `mailto:yousifalmuhamad@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

      // Open email client
      window.location.href = mailtoLink

      // Also try to send via EmailJS as backup (you'll need to set this up)
      // This provides a better user experience
      await sendEmailJS(formData)

      setSubmitStatus("success")

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
        })
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // EmailJS integration (optional - requires setup)
  const sendEmailJS = async (data: typeof formData) => {
    // You can integrate EmailJS here for better email delivery
    // For now, we'll use a simple fetch to a serverless function
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "yousifalmuhamad@gmail.com",
          subject: `New Project Inquiry from ${data.name}`,
          ...data,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      // Fallback to mailto if API fails
      console.log("Using mailto fallback")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const stats = [
    { icon: Award, number: "15+", label: "Awards Won" },
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: Clock, number: "48hr", label: "Response Time" },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 lg:mb-6">
            <span className="text-white">LET'S CREATE</span> <span className="gradient-text">TOGETHER</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Ready to bring your vision to life? Let's discuss your project and create something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl font-black text-white">GET IN TOUCH</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="p-2 lg:p-3 bg-orange-500/20 rounded-lg border border-orange-500/30 flex-shrink-0">
                    <Mail className="h-5 lg:h-6 w-5 lg:w-6 text-orange-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white text-sm lg:text-base">Email</div>
                    <div className="text-gray-400 text-sm lg:text-base break-all">yousifalmuhamad@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="p-2 lg:p-3 bg-orange-500/20 rounded-lg border border-orange-500/30 flex-shrink-0">
                    <Phone className="h-5 lg:h-6 w-5 lg:w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm lg:text-base">Phone</div>
                    <div className="text-gray-400 text-sm lg:text-base">+20 15 01140418</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="p-2 lg:p-3 bg-orange-500/20 rounded-lg border border-orange-500/30 flex-shrink-0">
                    <MapPin className="h-5 lg:h-6 w-5 lg:w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm lg:text-base">Location</div>
                    <div className="text-gray-400 text-sm lg:text-base">Egypt</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-black text-white mb-4 lg:mb-6 uppercase tracking-wider">
                  Why Choose Me?
                </h3>
                <div className="space-y-4 lg:space-y-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 lg:gap-4">
                      <div className="p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
                        <stat.icon className="h-4 lg:h-5 w-4 lg:w-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-lg lg:text-xl font-black gradient-text">{stat.number}</div>
                        <div className="text-xs lg:text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="bg-gray-900 border-gray-700 hidden lg:block">
              <CardContent className="p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-black text-white mb-4 lg:mb-6 uppercase tracking-wider">
                  My Process
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  {[
                    { step: "1", title: "Discovery", desc: "Understanding your vision" },
                    { step: "2", title: "Planning", desc: "Strategy & timeline" },
                    { step: "3", title: "Creation", desc: "Bringing it to life" },
                    { step: "4", title: "Delivery", desc: "Final masterpiece" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 lg:w-6 h-5 lg:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs lg:text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm lg:text-base">{item.title}</div>
                        <div className="text-xs lg:text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl font-black text-white">START YOUR PROJECT</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white font-semibold text-sm lg:text-base">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 h-10 lg:h-12 text-sm lg:text-base"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-semibold text-sm lg:text-base">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 h-10 lg:h-12 text-sm lg:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-white font-semibold text-sm lg:text-base">
                        Service Needed
                      </Label>
                      <Select onValueChange={(value) => handleChange("service", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-10 lg:h-12 text-sm lg:text-base">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="video-editing" className="text-white hover:bg-gray-700">
                            Cinematic Editing
                          </SelectItem>
                          <SelectItem value="color-grading" className="text-white hover:bg-gray-700">
                            Color Mastery
                          </SelectItem>
                          <SelectItem value="audio-post" className="text-white hover:bg-gray-700">
                            Audio Excellence
                          </SelectItem>
                          <SelectItem value="motion-graphics" className="text-white hover:bg-gray-700">
                            Motion Magic
                          </SelectItem>
                          <SelectItem value="custom" className="text-white hover:bg-gray-700">
                            Custom Project
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-white font-semibold text-sm lg:text-base">
                        Budget Range
                      </Label>
                      <Select onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-10 lg:h-12 text-sm lg:text-base">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="under-500" className="text-white hover:bg-gray-700">
                            Under $500
                          </SelectItem>
                          <SelectItem value="500-1000" className="text-white hover:bg-gray-700">
                            $500 - $1,000
                          </SelectItem>
                          <SelectItem value="1000-2500" className="text-white hover:bg-gray-700">
                            $1,000 - $2,500
                          </SelectItem>
                          <SelectItem value="2500-5000" className="text-white hover:bg-gray-700">
                            $2,500 - $5,000
                          </SelectItem>
                          <SelectItem value="over-5000" className="text-white hover:bg-gray-700">
                            Over $5,000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-white font-semibold text-sm lg:text-base">
                      Timeline
                    </Label>
                    <Select onValueChange={(value) => handleChange("timeline", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-10 lg:h-12 text-sm lg:text-base">
                        <SelectValue placeholder="When do you need this completed?" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="asap" className="text-white hover:bg-gray-700">
                          ASAP (Rush job)
                        </SelectItem>
                        <SelectItem value="1-week" className="text-white hover:bg-gray-700">
                          Within 1 week
                        </SelectItem>
                        <SelectItem value="2-weeks" className="text-white hover:bg-gray-700">
                          Within 2 weeks
                        </SelectItem>
                        <SelectItem value="1-month" className="text-white hover:bg-gray-700">
                          Within 1 month
                        </SelectItem>
                        <SelectItem value="flexible" className="text-white hover:bg-gray-700">
                          I'm flexible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white font-semibold text-sm lg:text-base">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, vision, target audience, and any specific requirements..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 text-sm lg:text-base resize-none"
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 lg:p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-green-400 text-sm lg:text-base">
                        Message sent successfully! I'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 lg:p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-400 text-sm lg:text-base">
                        There was an issue sending your message. Please try again or email me directly.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-base lg:text-lg py-4 lg:py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        SENDING...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 lg:h-5 w-4 lg:w-5" />
                        SEND MESSAGE
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
