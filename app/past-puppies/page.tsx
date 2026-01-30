"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const puppyImages = [
  // { src: "/past-litters/as-puppies/Amour wk3.png", name: "Amour", age: "3 weeks old" },
  // { src: "/past-litters/as-puppies/Amour wk4.png", name: "Amour", age: "4 weeks old" },
  { src: "/past-litters/as-puppies/Amour wk6.5.png", name: "Amour", age: "6.5 weeks old" },
  { src: "/past-litters/as-puppies/buddywk2.png", name: "Buddy", age: "2 weeks old" },
  // { src: "/past-litters/as-puppies/Cocoa wk1.png", name: "Cocoa", age: "1 week old" },
  { src: "/past-litters/as-puppies/cocoa wk2.png", name: "Cocoa", age: "2 weeks old" },
  { src: "/past-litters/as-puppies/crystal wk2.png", name: "Crystal", age: "2 weeks old" },
  // { src: "/past-litters/as-puppies/Cupid wk3.png", name: "Cupid", age: "3 weeks old" },
  // { src: "/past-litters/as-puppies/cupid wk4.png", name: "Cupid", age: "4 weeks old" },
  { src: "/past-litters/as-puppies/Cupid wk6.png", name: "Cupid", age: "6 weeks old" },
  { src: "/past-litters/as-puppies/Frosty wk1.png", name: "Frosty", age: "1 week old" },
  // { src: "/past-litters/as-puppies/Juliet wk 3.png", name: "Juliet", age: "3 weeks old" },
  { src: "/past-litters/as-puppies/Juliet wk4.png", name: "Juliet", age: "4 weeks old" },
  { src: "/past-litters/as-puppies/Moose wk2.png", name: "Moose", age: "2 weeks old" },
  { src: "/past-litters/as-puppies/Romeo wk3.png", name: "Romeo", age: "3 weeks old" },
  // { src: "/past-litters/as-puppies/Rose wk3.png", name: "Rose", age: "3 weeks old" },
  { src: "/past-litters/as-puppies/rose wk4.png", name: "Rose", age: "4 weeks old" },
  // { src: "/past-litters/as-puppies/Ruby wk3.png", name: "Ruby", age: "3 weeks old" },
  // { src: "/past-litters/as-puppies/Ruby wk4.png", name: "Ruby", age: "4 weeks old" },
  { src: "/past-litters/as-puppies/Ruby week 6.png", name: "Ruby", age: "6 weeks old" },
  // { src: "/past-litters/as-puppies/Scarlett wk3.png", name: "Scarlett", age: "3 weeks old" },
  { src: "/past-litters/as-puppies/Scarlett wk 4.png", name: "Scarlett", age: "4 weeks old" },
  // { src: "/past-litters/as-puppies/Velvet wk3.png", name: "Velvet", age: "3 weeks old" },
  // { src: "/past-litters/as-puppies/Velvet wk4.png", name: "Velvet", age: "4 weeks old" },
  { src: "/past-litters/as-puppies/Velvet wk6.5.png", name: "Velvet", age: "6.5 weeks old" },
  { src: "/past-litters/as-puppies/winter wk1.png", name: "Winter", age: "1 week old" },
]

const adultImages = [
  { src: "/past-litters/as-adults/caramella.jpg", name: "Caramella", age: "All grown up" },
  { src: "/past-litters/as-adults/Ernie.jpg", name: "Ernie", age: "All grown up" },
  { src: "/past-litters/as-adults/kodak.jpg", name: "Kodak", age: "All grown up" },
  { src: "/past-litters/as-adults/myla1.jpg", name: "Myla", age: "All grown up" },
  { src: "/past-litters/as-adults/penny  .jpg", name: "Penny", age: "All grown up" },
  { src: "/past-litters/as-adults/poppie.jpg", name: "Poppie", age: "All grown up" },
  { src: "/past-litters/as-adults/Winnie .jpg", name: "Winnie", age: "All grown up" },
]

export default function PastPuppiesPage() {
  const [activeTab, setActiveTab] = useState<"puppies" | "adults">("puppies")

  const images = activeTab === "puppies" ? puppyImages : adultImages

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Past Puppies</h1>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            See our beautiful puppies from previous litters, both as adorable babies and grown into stunning adults
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              variant={activeTab === "puppies" ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveTab("puppies")}
              className="rounded-full w-full sm:w-auto"
            >
              As Puppies
            </Button>
            <Button
              variant={activeTab === "adults" ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveTab("adults")}
              className="rounded-full w-full sm:w-auto"
            >
              As Adults
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-medium">{image.name}</p>
                    <p className="text-white/80 text-sm">{image.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
