"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/admin-auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem("admin_auth_token")
    const authExpiry = localStorage.getItem("admin_auth_expiry")

    if (authToken && authExpiry) {
      const now = new Date().getTime()
      const expiry = Number.parseInt(authExpiry)

      if (now < expiry) {
        setIsAuthenticated(true)
      } else {
        // Token expired, clear storage
        localStorage.removeItem("admin_auth_token")
        localStorage.removeItem("admin_auth_expiry")
      }
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}
