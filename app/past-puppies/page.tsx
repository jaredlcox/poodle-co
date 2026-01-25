"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import data from "@/data/data.json"

export default function PastPuppiesPage() {
  const [activeTab, setActiveTab] = useState<"puppies" | "adults">("puppies")

  const pastPuppies = data.pastPuppies.puppies

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">{data.pastPuppies.title}</h1>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            {data.pastPuppies.description}
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
            {pastPuppies.map((puppy) => (
              <div key={puppy.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-muted/20">
                <Image
                  src={activeTab === "puppies" ? puppy.puppyImage : puppy.adultImage}
                  alt={`${puppy.name} - ${activeTab === "puppies" ? "Puppy" : "Adult"}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-3d"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="font-semibold text-sm">{puppy.name}</p>
                    <p className="text-xs">
                      {activeTab === "puppies" ? puppy.puppyAge : puppy.adultAge}
                    </p>
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
