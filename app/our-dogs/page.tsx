import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const breedingDogs = [
  {
    name: "Juno",
    gender: "Female",
    color: "Merle",
    weight: "45 lbs",
    traits: ["Gentle", "Intelligent", "Playful"],
    health: "OFA Excellent Hips, Clear Eyes, DNA Tested",
    image: "/Juno_4.jpg",
  },
  {
    name: "Copper",
    gender: "Male",
    color: "Red",
    weight: "15 lbs",
    traits: ["Confident", "Loyal", "Athletic"],
    health: "OFA Good Hips, Clear Eyes, DNA Tested",
    image: "/parents/Copper.jpg",
  },
  {
    name: "Nova",
    gender: "Female",
    color: "Cream",
    weight: "55 lbs",
    traits: ["Sweet", "Calm", "Affectionate"],
    health: "OFA Excellent Hips, Clear Eyes, DNA Tested",
    image: "/Nova.jpg",
  },
  {
    name: "Gema",
    gender: "Female",
    color: "—",
    weight: "—",
    traits: ["Calm", "Gentle", "Intelligent"],
    health: "Health tested",
    image: "/parents/Gema.jpg",
  }
]

export default function OurDogsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Our Breeding Dogs</h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Meet the wonderful parents behind our beautiful puppies. Each dog has been carefully selected for their
            exceptional health, temperament, and conformation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {breedingDogs.map((dog) => (
              <Card key={dog.name} className="border-none shadow-sm bg-card/50 overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={dog.image || "/placeholder.svg"}
                    alt={dog.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl font-serif">{dog.name}</CardTitle>
                    <Badge variant="secondary">{dog.gender}</Badge>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{dog.color}</span>
                    <span>•</span>
                    <span>{dog.weight}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Temperament</h4>
                    <div className="flex flex-wrap gap-2">
                      {dog.traits.map((trait) => (
                        <Badge key={trait} variant="outline">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Health Testing</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{dog.health}</p>
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
