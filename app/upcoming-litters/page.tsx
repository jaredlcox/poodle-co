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
    mother: "Gema",
    father: "Copper",
    expectedDate: new Date("2026-02-09"),
    status: "Expected",
    motherImage: "/parents/Gema.jpg",
    fatherImage: "/parents/Copper.jpg",
  },
]

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    const calculateDaysLeft = () => {
      const startOfTarget = new Date(targetDate)
      startOfTarget.setHours(0, 0, 0, 0)
      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)
      const difference = startOfTarget.getTime() - startOfToday.getTime()
      if (difference >= 0) {
        setDaysLeft(Math.floor(difference / (1000 * 60 * 60 * 24)))
      }
    }

    calculateDaysLeft()
    const timer = setInterval(calculateDaysLeft, 60000) // update once per minute
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="inline-flex items-baseline gap-2 rounded-lg bg-primary/10 px-5 py-3">
      <span className="text-2xl font-bold tabular-nums">{daysLeft}</span>
      <span className="text-muted-foreground">
        {daysLeft === 1 ? "day" : "days"} to go
      </span>
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

          <div className="space-y-10">
            {upcomingLitters.map((litter, index) => (
              <Card key={index} className="border-none shadow-sm bg-card/50 overflow-hidden">
                <CardHeader className="px-6 md:px-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-serif tracking-tight">
                        {litter.mother} & {litter.father}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span>
                          Expected {litter.expectedDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge variant={litter.status === "Expected" ? "default" : "secondary"} className="w-fit shrink-0">
                      {litter.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pt-6 pb-8 md:px-8 md:pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-center">Mother: {litter.mother}</h3>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src={litter.motherImage || "/placeholder.svg"}
                          alt={litter.mother}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-center">Father: {litter.father}</h3>
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
                    <div className="flex flex-col items-center gap-3 mb-8">
                      <span className="text-sm font-medium text-muted-foreground">Time until arrival</span>
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
