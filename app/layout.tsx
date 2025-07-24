import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Youssef Smail - Professional Video Editor | Cinematic Storytelling",
  description:
    "Professional video editor with 2+ years of experience crafting cinematic stories that captivate audiences. Specializing in commercial editing, color grading, and motion graphics.",
  keywords:
    "video editor, cinematic editing, color grading, motion graphics, commercial video, documentary editing, Youssef Smail",
  authors: [{ name: "Youssef Smail" }],
  creator: "Youssef Smail",
  metadataBase: new URL("https://your-domain.vercel.app"),
  openGraph: {
    title: "Youssef Smail - Professional Video Editor",
    description:
      "Professional video editor with 2+ years of experience crafting cinematic stories that captivate audiences.",
    url: "https://your-domain.vercel.app",
    siteName: "Youssef Smail Video Editor",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=Youssef+Smail+Video+Editor",
        width: 1200,
        height: 630,
        alt: "Youssef Smail - Professional Video Editor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Smail - Professional Video Editor",
    description:
      "Professional video editor with 2+ years of experience crafting cinematic stories that captivate audiences.",
    images: ["/placeholder.svg?height=630&width=1200&text=Youssef+Smail+Video+Editor"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
