import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const progressVariants = cva("progress-bar", {
  variants: {
    size: {
      xs: "h-1",
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const progressFillVariants = cva("progress-bar-fill", {
  variants: {
    color: {
      primary: "bg-gradient-primary",
      secondary: "bg-gradient-secondary",
      accent: "bg-gradient-accent",
      success: "bg-gradient-success",
      warning: "bg-gradient-warning",
      destructive: "bg-gradient-destructive",
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number
  max: number
  color?: VariantProps<typeof progressFillVariants>["color"]
  showValue?: boolean
  animate?: boolean
}

export function ProgressIndicator({
  className,
  size,
  value,
  max,
  color,
  showValue = false,
  animate = true,
  ...props
}: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className="space-y-1">
      <div className={cn(progressVariants({ size, className }))} {...props}>
        <div
          className={cn(progressFillVariants({ color }), animate && "transition-all duration-500 ease-out")}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {showValue && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {value} / {max}
          </span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}
