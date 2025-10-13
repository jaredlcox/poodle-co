import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    name: "Sarah & Michael",
    location: "Portland, OR",
    rating: 5,
    text: "We couldn't be happier with our puppy from Poodle & Co. The entire process was professional, caring, and transparent. Our little one is healthy, happy, and has the sweetest temperament!",
    image: "/cream-poodle-female.jpg?height=400&width=400",
  },
  {
    name: "Jennifer L.",
    location: "Seattle, WA",
    rating: 5,
    text: "The care and attention to detail is remarkable. They truly love their dogs and it shows in every interaction. Our poodle is not just a pet, but a beloved family member.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "David & Emma",
    location: "San Francisco, CA",
    rating: 5,
    text: "From the first inquiry to bringing our puppy home, the experience was wonderful. The breeder was always available to answer questions and provided excellent support.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Rachel M.",
    location: "Denver, CO",
    rating: 5,
    text: "Our poodle has brought so much joy to our lives. The health guarantee and ongoing support have been invaluable. Highly recommend Poodle & Co. to anyone looking for a quality breeder.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Tom & Lisa",
    location: "Austin, TX",
    rating: 5,
    text: "We did extensive research before choosing a breeder, and Poodle & Co. exceeded all our expectations. Our puppy is smart, healthy, and perfectly socialized.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Amanda K.",
    location: "Boston, MA",
    rating: 5,
    text: "The transparency about health testing and breeding practices gave us complete confidence. Our poodle is everything we hoped for and more!",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Customer Reviews</h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Hear from the families who have welcomed our puppies into their homes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="border-none shadow-sm bg-card/50 overflow-hidden pt-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                </div>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed italic">"{review.text}"</p>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
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
