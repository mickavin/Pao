"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Pill, PlusCircle, Award, User, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"

export function BottomNavigation() {
  const pathname = usePathname()
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  const links = [
    {
      href: "/",
      icon: Home,
      label: "Accueil",
    },
    {
      href: "/medications",
      icon: Pill,
      label: "Médicaments",
    },
    {
      href: "/checkin",
      icon: PlusCircle,
      label: "Check-in",
      primary: true,
    },
    {
      href: "/achievements",
      icon: Award,
      label: "Récompenses",
    },
    {
      href: "/profile",
      icon: User,
      label: "Profil",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t">
      <div className="absolute left-4 -top-16 z-50">
        <Link
          href="/chat"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Link>
      </div>
      <div className="max-w-md  flex items-center justify-around mx-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center py-2  transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                link.primary && "absolute",
                link.label === "Médicaments" && "mr-4",
                link.label === "Récompenses" && "ml-4",
              )}
              style={{top: '-30px'}}
            >
              {link.primary ? (
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-primary opacity-70 blur-sm"></div>
                  <div className="relative p-2 rounded-full bg-gradient-primary text-white">
                    <link.icon className="h-5 w-5" />
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "p-2 rounded-full",
                    isActive ? "bg-primary/10" : "bg-transparent",
                    simplifiedLayout && "p-2.5",
                  )}
                >
                  <link.icon className={cn("h-5 w-5", simplifiedLayout && "h-6 w-6")} />
                </div>
              )}
              <span
                className={cn(
                  "text-xs mt-1",
                  isActive ? "font-medium" : "font-normal",
                  simplifiedLayout && "text-sm mt-1.5",
                )}
              >
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
