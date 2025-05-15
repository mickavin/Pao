import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-3xl py-6">
      <Skeleton className="h-8 w-64 mb-6" />

      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-5 w-48" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>

        <Skeleton className="h-32 w-full rounded-lg" />

        <div className="flex justify-end">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  )
}
