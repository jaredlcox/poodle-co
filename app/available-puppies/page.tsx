import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@/components/ui/empty"
import { PawPrint } from "lucide-react"

const availablePuppies: Array<{
  name: string
  gender: string
  color: string
  birthDate: string
  personality: string
  status: string
  image: string
}> = []

export default function AvailablePuppiesPage() {
  const hasPuppies = availablePuppies.length > 0

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Available Puppies</h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            {hasPuppies
              ? "Meet our adorable puppies looking for their forever homes. Each one is raised with love and ready to bring joy to your family."
              : "We don't have any puppies available right now — but new litters are always on the horizon."}
          </p>

          {hasPuppies ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {availablePuppies.map((puppy) => (
                <Card key={puppy.name} className="border-none shadow-sm bg-card/50 overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={puppy.image || "/placeholder.svg"}
                      alt={puppy.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={puppy.status === "Available" ? "default" : "secondary"} className="shadow-lg">
                        {puppy.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-2xl font-serif">{puppy.name}</CardTitle>
                      <Badge variant="outline">{puppy.gender}</Badge>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{puppy.color}</span>
                      <span>•</span>
                      <span>Born {puppy.birthDate}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{puppy.personality}</p>
                    <Button asChild className="w-full rounded-full" disabled={puppy.status === "Reserved"}>
                      <Link href="/contact">
                        {puppy.status === "Available" ? "Inquire About " + puppy.name : "Reserved"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Empty className="max-w-2xl mx-auto py-12 px-6 rounded-2xl border border-dashed bg-muted/20">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="size-20 rounded-full bg-primary/10">
                  <PawPrint className="size-10 text-primary" />
                </EmptyMedia>
                <EmptyTitle className="text-2xl font-serif">No Puppies Available Yet</EmptyTitle>
                <EmptyDescription className="text-base max-w-md">
                  Our current litter has found their forever homes. Check back soon or get in touch to hear about
                  upcoming litters — we'd love to help you find your perfect match.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-col sm:flex-row gap-4 mt-6">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/upcoming-litters">View Upcoming Litters</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
