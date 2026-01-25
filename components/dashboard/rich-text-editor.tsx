"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  maxLength?: number
  className?: string
  required?: boolean
}

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  className,
  required = false,
}: RichTextEditorProps) {
  const characterCount = value.length
  const remaining = maxLength ? maxLength - characterCount : null

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        required={required}
        className="resize-none"
      />
      {maxLength && (
        <p
          className={cn(
            "text-xs text-right",
            remaining !== null && remaining < 50
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {characterCount} / {maxLength} characters
        </p>
      )}
    </div>
  )
}
