import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@/components/ui/empty"
import { PawPrint } from "lucide-react"
import { PuppyCard, type PuppyCardData } from "@/components/puppy-card"

const availablePuppies: PuppyCardData[] = [
  {
    name: "Levi",
    gender: "Male",
    color: "Tricolor — black, tan & white",
    birthDate: "February 2026",
    status: "Available",
    images: [
      "/puppies/levi/levi-1.png",
      "/puppies/levi/levi-2.png",
      "/puppies/levi/levi-3.png",
      "/puppies/levi/levi-4.png",
      "/puppies/levi/levi-5.png",
      "/puppies/levi/levi-6.png",
      "/puppies/levi/levi-7.png",
    ],
  },
  {
    name: "Skylar",
    gender: "Female",
    color: "White with apricot markings",
    birthDate: "February 2026",
    status: "Available",
    images: [
      "/puppies/skylar/skylar-1.png",
      "/puppies/skylar/skylar-2.png",
      "/puppies/skylar/skylar-3.png",
      "/puppies/skylar/skylar-4.png",
      "/puppies/skylar/skylar-5.png",
      "/puppies/skylar/skylar-6.png",
      "/puppies/skylar/skylar-7.png",
    ],
  },
  {
    name: "Penny",
    gender: "Female",
    color: "Apricot with white markings",
    birthDate: "February 2026",
    status: "Available",
    images: [
      "/puppies/penny/penny-1.png",
      "/puppies/penny/penny-2.png",
      "/puppies/penny/penny-3.png",
      "/puppies/penny/penny-4.png",
      "/puppies/penny/penny-5.png",
      "/puppies/penny/penny-6.png",
      "/puppies/penny/penny-7.png",
    ],
  },
  {
    name: "Bingo",
    gender: "Female",
    color: "Apricot with white chest",
    birthDate: "February 2026",
    status: "Available",
    images: [
      "/puppies/bingo/bingo-1.png",
      "/puppies/bingo/bingo-2.png",
      "/puppies/bingo/bingo-3.png",
      "/puppies/bingo/bingo-4.png",
      "/puppies/bingo/bingo-5.png",
      "/puppies/bingo/bingo-6.png",
      "/puppies/bingo/bingo-7.png",
    ],
  },
  {
    name: "Winnie",
    gender: "Female",
    color: "Apricot with white blaze & chest",
    birthDate: "February 2026",
    status: "Available",
    images: [
      "/puppies/winnie/winnie-1.png",
      "/puppies/winnie/winnie-2.png",
      "/puppies/winnie/winnie-3.png",
      "/puppies/winnie/winnie-4.png",
      "/puppies/winnie/winnie-5.png",
      "/puppies/winnie/winnie-6.png",
      "/puppies/winnie/winnie-7.png",
    ],
  },
  {
    name: "Bluey",
    gender: "Female",
    color: "Golden apricot with white blaze & chest",
    birthDate: "February 2026",
    status: "Available",
    images: [
      "/puppies/bluey/bluey-1.png",
      "/puppies/bluey/bluey-2.png",
      "/puppies/bluey/bluey-3.png",
      "/puppies/bluey/bluey-4.png",
      "/puppies/bluey/bluey-5.png",
      "/puppies/bluey/bluey-6.png",
      "/puppies/bluey/bluey-7.png",
    ],
  },
  {
    name: "Snow White",
    gender: "Female",
    color: "White with tan markings",
    birthDate: "February 2026",
    status: "Available",
    images: [
      // "/puppies/snow-white/snow-white-1.png",
      "/puppies/snow-white/snow-white-2.png",
      "/puppies/snow-white/snow-white-3.png",
      "/puppies/snow-white/snow-white-4.png",
      "/puppies/snow-white/snow-white-5.png",
      "/puppies/snow-white/snow-white-6.png",
      "/puppies/snow-white/snow-white-7.png",
      "/puppies/snow-white/snow-white-8.png",
    ],
  },
]

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
                <PuppyCard key={puppy.name} puppy={puppy} />
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
