import type React from "react"
import type { Metadata } from "next"
import { Inter, Nunito, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider, AccessibilityProvider } from "@/components/theme-provider"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Toaster } from "@/components/ui/toaster"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { AccessibilityOnboarding } from "@/components/accessibility-onboarding"
import UserProvider from "@/app/UserProvider"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Pao - Suivi de Médicaments",
  description: "Suivez vos médicaments et leurs effets facilement",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${inter.variable} ${nunito.variable} ${poppins.variable} font-nunito bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AccessibilityProvider>
            <UserProvider>
              <div className="flex flex-col min-h-screen w-full">
              <AccessibilityControls />
              <main className="flex-1 pb-20 w-full">{children}</main>
                <BottomNavigation />
              </div>
            </UserProvider>
            <AccessibilityOnboarding />
            <Toaster />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
