"use client"

import Image from "next/image"
import { useState } from "react"

type CarouselPhoto = { id: number; src: string; alt: string }

// Images from carousel-images folder, ordered so the two _puppy images aren't adjacent
const photos: CarouselPhoto[] = [
  { id: 1, src: "/carousel-images/Caramella.jpg", alt: "Caramella" },
  { id: 2, src: "/carousel-images/Ernie.jpg", alt: "Ernie" },
  { id: 3, src: "/carousel-images/Kodak_puppy.jpg", alt: "Kodak as a puppy" },
  { id: 4, src: "/carousel-images/Myla.jpg", alt: "Myla" },
  { id: 5, src: "/carousel-images/Poppie_puppy.jpg", alt: "Poppie as a puppy" },
  { id: 6, src: "/carousel-images/Kodak.jpg", alt: "Kodak" },
  { id: 7, src: "/carousel-images/winnie.jpg", alt: "Winnie" },
]

function CarouselSet({ photos: setPhotos, prefix }: { photos: CarouselPhoto[]; prefix: string }) {
  return (
    <>
      {setPhotos.map((photo) => (
        <div
          key={`${prefix}-${photo.id}`}
          className="relative flex-shrink-0 w-[300px] md:w-[400px] aspect-square rounded-xl overflow-hidden group cursor-pointer"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 300px, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </>
  )
}

export function PhotoCarousel() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex gap-6 w-max animate-scroll-left"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CarouselSet photos={photos} prefix="a" />
        <CarouselSet photos={photos} prefix="b" />
        <CarouselSet photos={photos} prefix="c" />
      </div>
    </div>
  )
}
