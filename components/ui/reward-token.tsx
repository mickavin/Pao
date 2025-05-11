import { cn } from "@/lib/utils"
import { Leaf } from "lucide-react"

interface RewardTokenProps {
  count: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function RewardToken({ count, size = "md", className }: RewardTokenProps) {
  const sizeClasses = {
    sm: "text-sm h-6 px-2",
    md: "text-base h-8 px-3",
    lg: "text-lg h-10 px-4",
  }

  return (
    <div
      className={cn("flex items-center gap-1 bg-primary/10 text-primary rounded-full", sizeClasses[size], className)}
    >
      <Leaf className={cn("h-4 w-4", size === "lg" && "h-5 w-5")} />
      <span className="font-medium">{count}</span>
    </div>
  )
}
