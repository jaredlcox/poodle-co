"use client"

import Image from "next/image"
import { useState } from "react"
import data from "@/data/data.json"

const photos = data.home.gallery.photos

export function PhotoCarousel() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-6 animate-scroll-left"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First set of images */}
        {photos.map((photo) => (
          <div
            key={`first-${photo.id}`}
            className="relative flex-shrink-0 w-[300px] md:w-[400px] aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {photos.map((photo) => (
          <div
            key={`second-${photo.id}`}
            className="relative flex-shrink-0 w-[300px] md:w-[400px] aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}
