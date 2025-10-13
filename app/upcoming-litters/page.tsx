"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const upcomingLitters = [
  {
    mother: "Bella",
    father: "Max",
    expectedDate: new Date("2025-12-15"),
    status: "Expected",
    motherImage: "/apricot-poodle-female.jpg",
    fatherImage: "/black-poodle-male.jpg",
  },
  {
    mother: "Luna",
    father: "Cooper",
    expectedDate: new Date("2026-01-20"),
    status: "Planned",
    motherImage: "/cream-poodle-female.jpg",
    fatherImage: "/red-poodle-male.jpg",
  },
]

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-primary/10 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{value}</div>
          </div>
          <div className="text-xs text-muted-foreground mt-1 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  )
}

export default function UpcomingLittersPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Upcoming Litters</h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Reserve your spot for our upcoming litters. Contact us early to ensure you don't miss out!
          </p>

          <div className="space-y-12">
            {upcomingLitters.map((litter, index) => (
              <Card key={index} className="border-none shadow-sm bg-card/50 overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-serif">
                      {litter.mother} × {litter.father}
                    </CardTitle>
                    <Badge variant={litter.status === "Expected" ? "default" : "secondary"}>{litter.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Expected:{" "}
                      {litter.expectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-center">Mother: {litter.mother}</h3>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src={litter.motherImage || "/placeholder.svg"}
                          alt={litter.mother}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-center">Father: {litter.father}</h3>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src={litter.fatherImage || "/placeholder.svg"}
                          alt={litter.father}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {litter.status === "Expected" && (
                    <div className="mb-6">
                      <h4 className="text-center font-semibold mb-4">Time Until Arrival</h4>
                      <CountdownTimer targetDate={litter.expectedDate} />
                    </div>
                  )}

                  <div className="text-center">
                    <Button asChild size="lg" className="rounded-full">
                      <Link href="/contact">Reserve Your Puppy</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
