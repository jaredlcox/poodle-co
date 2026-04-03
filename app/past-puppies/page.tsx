"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { pastPuppies, type PastPuppy } from "@/lib/past-puppies"

const SINGLE_IMAGE_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
const SPLIT_IMAGE_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 16vw, 12vw"

function PastPuppyCard({ entry }: { entry: PastPuppy }) {
  const puppy = entry.puppy
  const adult = entry.adult
  const hasBoth = Boolean(puppy && adult)

  const overlayLines = hasBoth
    ? [entry.puppy!.age, entry.adult!.age].join(" · ")
    : puppy
      ? puppy.age
      : adult!.age

  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${
        hasBoth ? "aspect-[1/2] sm:aspect-square flex flex-col sm:flex-row" : "aspect-square"
      }`}
    >
      {puppy && (
        <div
          className={`overflow-hidden ${
            hasBoth
              ? "relative flex-1 min-h-[50%] sm:min-h-0 sm:flex-1"
              : "absolute inset-0"
          }`}
        >
          <Image
            src={puppy.src}
            alt={`${entry.name} as a puppy`}
            fill
            sizes={hasBoth ? SPLIT_IMAGE_SIZES : SINGLE_IMAGE_SIZES}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {hasBoth && (
            <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white sm:text-xs">
              Puppy
            </span>
          )}
        </div>
      )}
      {adult && (
        <div
          className={`overflow-hidden ${
            hasBoth
              ? "relative flex-1 min-h-[50%] sm:min-h-0 sm:flex-1"
              : "absolute inset-0"
          }`}
        >
          <Image
            src={adult.src}
            alt={`${entry.name} as an adult`}
            fill
            sizes={hasBoth ? SPLIT_IMAGE_SIZES : SINGLE_IMAGE_SIZES}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {hasBoth && (
            <span className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white sm:text-xs">
              Grown up
            </span>
          )}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
        <div>
          <p className="text-white font-medium">{entry.name}</p>
          <p className="text-white/80 text-sm">{overlayLines}</p>
        </div>
      </div>
    </div>
  )
}

export default function PastPuppiesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Past Puppies</h1>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Puppies from past litters—and when families send updates, we love sharing them all grown up, too.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastPuppies.map((entry) => (
              <PastPuppyCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
