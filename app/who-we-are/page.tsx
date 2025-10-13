import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center">Who We Are</h1>
          <p className="text-xl text-muted-foreground text-center mb-16 leading-relaxed">
            A family dedicated to ethical breeding and the love of poodles
          </p>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-16">
            <Image src="/family-with-poodles-in-beautiful-home-setting.jpg" alt="Our family" fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Poodle & Co. began over a decade ago with a simple love for these intelligent, affectionate, and beautiful
              dogs. What started as a passion has grown into a commitment to ethical breeding practices and finding
              perfect matches between puppies and families.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe that breeding should prioritize health, temperament, and the overall well-being of our dogs.
              Every puppy born at Poodle & Co. is raised in our home, surrounded by love and socialization from day one.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to continue the legacy of responsible breeding while building lasting relationships with
              the families who welcome our puppies into their homes.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Health First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Comprehensive health testing for all breeding dogs and puppies to ensure the healthiest possible
                    start to life.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Ethical Practices</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We follow strict ethical guidelines and never prioritize profit over the well-being of our dogs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Open communication with families about our breeding practices, health records, and puppy
                    development.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Lifetime Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're here for you and your puppy throughout their entire life with guidance, support, and care.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src="/breeder-with-poodle-puppies.jpg" alt="Our team member" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src="/poodles-playing-in-garden.jpg" alt="Our facility" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
