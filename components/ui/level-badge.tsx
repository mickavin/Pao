import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const levelBadgeVariants = cva("level-badge", {
  variants: {
    variant: {
      primary: "from-primary to-primary-dark",
      secondary: "from-secondary to-secondary-dark",
      accent: "from-accent to-accent-dark",
    },
    size: {
      sm: "h-12 w-12",
      md: "h-16 w-16",
      lg: "h-20 w-20",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

export interface LevelBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof levelBadgeVariants> {
  level: number
  maxLevel?: number
  showProgress?: boolean
  progress?: number
}

export function LevelBadge({
  className,
  variant,
  size,
  level,
  maxLevel = 100,
  showProgress = false,
  progress = 0,
  ...props
}: LevelBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn(levelBadgeVariants({ variant, size, className }))} {...props}>
        <div className="level-badge-inner"></div>
        <div className="level-badge-content">
          <span className="text-xs font-medium text-muted-foreground">Niveau</span>
          <span className="text-lg font-bold text-foreground">{level}</span>
        </div>
      </div>

      {showProgress && (
        <div className="mt-2 w-full max-w-[100px]">
          <div className="level-progress">
            <div className="level-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {progress}% vers niveau {level + 1}
          </p>
        </div>
      )}
    </div>
  )
}
