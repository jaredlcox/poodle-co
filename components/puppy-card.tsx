"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export type PuppyCardData = {
  name: string
  gender: string
  color: string
  birthDate: string
  status: string
  images: string[]
}

export function PuppyCard({ puppy }: { puppy: PuppyCardData }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const handleSelect = useCallback((carousel: CarouselApi | undefined) => {
    if (!carousel) return
    setCurrent(carousel.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    handleSelect(api)
    api.on("reInit", handleSelect)
    api.on("select", handleSelect)
    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api, handleSelect])

  const showGallery = puppy.images.length > 1

  return (
    <Card className="border-none shadow-sm bg-card/50 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Carousel setApi={setApi} opts={{ loop: true }} className="h-full w-full">
          <CarouselContent className="-ml-0 h-full">
            {puppy.images.map((src, i) => (
              <CarouselItem key={src} className="pl-0 basis-full">
                <div className="relative aspect-square w-full">
                  <Image
                    src={src}
                    alt={`${puppy.name} — photo ${i + 1} of ${puppy.images.length}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={i === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {showGallery && (
            <>
              <CarouselPrevious
                className="left-3 top-1/2 -translate-y-1/2 h-9 w-9 border-0 bg-background/85 shadow-md backdrop-blur-sm hover:bg-background"
                aria-label="Previous photo"
              />
              <CarouselNext
                className="right-3 top-1/2 -translate-y-1/2 h-9 w-9 border-0 bg-background/85 shadow-md backdrop-blur-sm hover:bg-background"
                aria-label="Next photo"
              />
            </>
          )}
        </Carousel>
        <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-end px-4">
          <Badge
            variant={puppy.status === "Available" ? "default" : "secondary"}
            className="pointer-events-auto shadow-lg"
          >
            {puppy.status}
          </Badge>
        </div>
        {showGallery && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5 px-4">
            {puppy.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === current}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "pointer-events-auto h-2 rounded-full transition-all duration-200",
                  i === current ? "w-7 bg-primary shadow-sm" : "w-2 bg-background/75 hover:bg-background",
                )}
              />
            ))}
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <CardTitle className="text-2xl font-serif">{puppy.name}</CardTitle>
          <Badge variant="outline" className="shrink-0">
            {puppy.gender}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>{puppy.color}</span>
          <span className="hidden sm:inline" aria-hidden>
            •
          </span>
          <span>Born {puppy.birthDate}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Button asChild className="w-full rounded-full" disabled={puppy.status === "Reserved"}>
          <Link href="/contact">
            {puppy.status === "Available" ? `Inquire About ${puppy.name}` : "Reserved"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
