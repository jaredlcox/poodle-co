"use client"

import Image from "next/image"
import { useState } from "react"

const photos = [
  { id: 1, query: "happy poodle with owner 1" },
  { id: 2, query: "happy poodle with owner 2" },
  { id: 3, query: "happy poodle with owner 3" },
  { id: 4, query: "happy poodle with owner 4" },
  { id: 5, query: "happy poodle with owner 5" },
  { id: 6, query: "happy poodle with owner 6" },
]

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
              src={`/happy-poodle-with-owner-.jpg?height=600&width=600&query=${photo.query}`}
              alt={`Happy poodle family ${photo.id}`}
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
              src={`/happy-poodle-with-owner-.jpg?height=600&width=600&query=${photo.query}`}
              alt={`Happy poodle family ${photo.id}`}
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
