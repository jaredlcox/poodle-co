"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PastPuppiesPage() {
  const [activeTab, setActiveTab] = useState<"puppies" | "adults">("puppies")

  const puppyImages = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Past Puppies</h1>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            See our beautiful puppies from previous litters, both as adorable babies and grown into stunning adults
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={activeTab === "puppies" ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveTab("puppies")}
              className="rounded-full"
            >
              As Puppies
            </Button>
            <Button
              variant={activeTab === "adults" ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveTab("adults")}
              className="rounded-full"
            >
              As Adults
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {puppyImages.map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={`/.jpg?height=400&width=400&query=${
                    activeTab === "puppies" ? "cute poodle puppy" : "adult poodle"
                  } ${i}`}
                  alt={`${activeTab === "puppies" ? "Puppy" : "Adult"} ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium text-sm">
                    {activeTab === "puppies" ? "8 weeks old" : "2 years old"}
                  </p>
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
