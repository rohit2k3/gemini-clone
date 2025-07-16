"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface MessageSkeletonProps {
  isUser?: boolean
}

export default function MessageSkeleton({ isUser = false }: MessageSkeletonProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />}

      <div className={`flex flex-col max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`p-4 rounded-lg ${isUser ? "bg-primary/10" : "bg-muted"}`}>
          <Skeleton className="h-4 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-3 w-16 mt-1" />
      </div>

      {isUser && <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />}
    </div>
  )
}
