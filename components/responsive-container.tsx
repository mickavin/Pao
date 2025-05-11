import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  fullWidth?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fullWidth = false,
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 sm:px-6",
        !fullWidth && "max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export function ResponsiveGrid({
  children,
  className,
  columns = 1,
  gap = "default",
}: {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: "small" | "default" | "large"
}) {
  const gapClasses = {
    small: "gap-2 sm:gap-3",
    default: "gap-4 sm:gap-6",
    large: "gap-6 sm:gap-8",
  }

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)}>{children}</div>
}

export function ResponsiveFlex({
  children,
  className,
  direction = "row",
  wrap = true,
  gap = "default",
  justify = "start",
  align = "start",
}: {
  children: React.ReactNode
  className?: string
  direction?: "row" | "col" | "row-reverse" | "col-reverse" | "responsive"
  wrap?: boolean
  gap?: "small" | "default" | "large"
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  align?: "start" | "end" | "center" | "baseline" | "stretch"
}) {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse",
    responsive: "flex-col sm:flex-row",
  }

  const gapClasses = {
    small: "gap-2 sm:gap-3",
    default: "gap-4 sm:gap-6",
    large: "gap-6 sm:gap-8",
  }

  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  }

  return (
    <div
      className={cn(
        "flex",
        directionClasses[direction],
        wrap && "flex-wrap",
        gapClasses[gap],
        justifyClasses[justify],
        alignClasses[align],
        className,
      )}
    >
      {children}
    </div>
  )
}
