import type React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, Medal, Star, Trophy, Award } from "lucide-react"

export interface AchievementBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "outline"
  size?: "sm" | "md" | "lg" | "xl"
  locked?: boolean
  icon?: "trophy" | "medal" | "star" | "check" | "award"
  level?: number
  customIcon?: React.ReactNode
  label?: string
  description?: string
  progress?: number
  showProgress?: boolean
}

export function AchievementBadge({
  className,
  variant = "primary",
  size = "md",
  locked = false,
  icon = "trophy",
  level,
  customIcon,
  label,
  description,
  progress,
  showProgress = false,
  ...props
}: AchievementBadgeProps) {
  // Map icon names to components
  const iconMap = {
    trophy: Trophy,
    medal: Medal,
    star: Star,
    check: CheckCircle2,
    award: Award,
  }

  // Ensure we have a valid icon by defaulting to Trophy if the requested icon isn't found
  const IconComponent = iconMap[icon] || Trophy
  const iconSize = size === "sm" ? 16 : size === "md" ? 24 : size === "lg" ? 32 : 40

  // Generate variant classes
  const variantClasses = {
    primary: "from-primary to-primary-dark text-foreground",
    secondary: "from-secondary to-secondary-dark text-foreground",
    accent: "from-accent to-accent-dark text-foreground",
    success: "from-success to-success-dark text-foreground",
    warning: "from-warning to-warning-dark text-foreground",
    outline: "bg-background border-2 border-primary text-primary",
  }[variant]

  // Generate size classes
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-24 w-24",
  }[size]

  // Generate locked classes
  const lockedClasses = locked ? "opacity-50" : ""

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full shadow-md transition-all duration-300",
          variantClasses,
          sizeClasses,
          lockedClasses,
          className,
        )}
        {...props}
      >
        <div className="achievement-badge-inner"></div>
        <div className="achievement-badge-content">
          {customIcon ? (
            customIcon
          ) : (
            <>
              <IconComponent size={iconSize} className="relative z-10" />
              {level && (
                <span className="absolute bottom-1 right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-background text-xs font-bold text-foreground shadow-sm">
                  {level}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {label && (
        <div className="mt-2 text-center">
          <p className="font-medium">{label}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}

          {showProgress && progress !== undefined && (
            <div className="mt-1 w-full">
              <div className="progress-bar">
                <div
                  className="progress-bar-fill bg-gradient-primary"
                  style={{ width: `${Math.min(100, progress)}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{progress}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
