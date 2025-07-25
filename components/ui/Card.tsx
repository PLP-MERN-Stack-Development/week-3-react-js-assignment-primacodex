"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  padding?: "sm" | "md" | "lg"
  hover?: boolean
}

export default function Card({ children, className, padding = "md", hover = false }: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200",
        paddingClasses[padding],
        hover && "hover:shadow-md transition-shadow",
        className,
      )}
    >
      {children}
    </div>
  )
}
