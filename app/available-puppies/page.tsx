import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const availablePuppies = [
  {
    name: "Daisy",
    gender: "Female",
    color: "Apricot",
    birthDate: "2025-09-15",
    personality: "Sweet and playful, loves cuddles",
    status: "Available",
    image: "/apricot-poodle-puppy-female.jpg",
  },
  {
    name: "Charlie",
    gender: "Male",
    color: "Black",
    birthDate: "2025-09-15",
    personality: "Confident and energetic, great with kids",
    status: "Reserved",
    image: "/black-poodle-puppy-male.jpg",
  },
  {
    name: "Rosie",
    gender: "Female",
    color: "Cream",
    birthDate: "2025-09-20",
    personality: "Gentle and calm, perfect lap dog",
    status: "Available",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    name: "Oliver",
    gender: "Male",
    color: "Red",
    birthDate: "2025-09-20",
    personality: "Smart and curious, loves to explore",
    status: "Available",
    image: "/placeholder.svg?height=600&width=600",
  },
]

export default function AvailablePuppiesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Available Puppies</h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Meet our adorable puppies looking for their forever homes. Each one is raised with love and ready to bring
            joy to your family.
          </p>

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
        </div>
      </div>

      <Footer />
    </div>
  )
}
