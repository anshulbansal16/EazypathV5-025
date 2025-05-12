import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FloatingAssistant } from "@/components/floating-assistant"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Home, FileText, Activity, User } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eazypaths - Health Check-Up Recommendations",
  description: "AI-Powered Health Check-Up Recommendation Platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <header className="border-b bg-background sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto py-4 flex justify-between items-center">
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
                  >
                    Eazypaths
                  </Link>
                  <nav className="flex items-center gap-4">
                    <Link
                      href="/"
                      className="text-sm font-medium hover:text-primary transition-colors hidden md:flex items-center gap-1"
                    >
                      <Home className="h-4 w-4" /> Home
                    </Link>
                    <Link
                      href="/bmi-analysis"
                      className="text-sm font-medium hover:text-primary transition-colors hidden md:flex items-center gap-1"
                    >
                      <Activity className="h-4 w-4" /> BMI Analysis
                    </Link>
                    <Link
                      href="/ai-reports"
                      className="text-sm font-medium hover:text-primary transition-colors hidden md:flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" /> AI Reports
                    </Link>
                    <Link
                      href="/health-assistant"
                      className="text-sm font-medium hover:text-primary transition-colors hidden md:flex items-center gap-1"
                    >
                      <User className="h-4 w-4" /> Health Assistant
                    </Link>
                    <ThemeToggle />
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  </nav>
                </div>
              </header>
              <main className="flex-1 bg-background">{children}</main>
              <footer className="border-t py-6 bg-background">
                <div className="container mx-auto text-center">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                      Home
                    </Link>
                    <Link href="/bmi-analysis" className="text-sm font-medium hover:text-primary transition-colors">
                      BMI Analysis
                    </Link>
                    <Link href="/ai-reports" className="text-sm font-medium hover:text-primary transition-colors">
                      AI Reports
                    </Link>
                    <Link href="/health-assistant" className="text-sm font-medium hover:text-primary transition-colors">
                      Health Assistant
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">© 2023 Eazypaths. All rights reserved.</p>
                </div>
              </footer>
              <FloatingAssistant />
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
