"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SaveButtonProps {
  onClick: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export function SaveButton({
  onClick,
  loading = false,
  disabled = false,
  className,
  children = "Save Changes",
}: SaveButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      className={cn("rounded-full", className)}
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
