import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Home, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PhotoCarousel } from "@/components/photo-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-secondary/20" />
        <Image
          src="/happy-poodle-family-in-sunny-garden.jpg"
          alt="Happy poodles"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to Poodle & Co.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Rooted in love, raised with care. We're passionate about raising healthy, happy puppies who bring joy to every home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button asChild size="lg" variant="secondary" className="rounded-full w-full sm:w-auto">
              <Link href="/contact">Reserve Now</Link>
            </Button>
            <Button asChild size="lg" className="rounded-full w-full sm:w-auto">
              <Link href="/available-puppies">Meet the Puppies</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full w-full sm:w-auto">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Our Commitment to Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ethical Breeding</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every pairing is carefully planned with health, temperament, and breed integrity as our top priorities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Health Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All of our parent dogs are health tested to ensure strong genetics and healthy, happy puppies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Family Raised</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our puppies are raised in our home with love, socialization, and daily interaction to prepare them for yours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">From Our Home to Theirs</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            See our pups thriving with their new families
          </p>
          <PhotoCarousel />
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Health First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive health testing for all parent dogs and puppies to ensure the healthiest possible start to life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Ethical Practices</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We follow strict ethical standards and always prioritize the well-being of our dogs above all else.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain open communication with families about our breeding practices, health testing, and puppy development every step of the way.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Lifetime Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're here for you and your puppy for life, offering ongoing guidance, support, and care whenever you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">What Families Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="pt-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed italic">
                  "We couldn't be happier with our puppy from Poodle & Co. The entire process was professional, caring,
                  and transparent. Our little one is healthy, happy, and has the sweetest temperament!"
                </p>
                <p className="font-semibold">— Sarah & Michael</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="pt-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed italic">
                  "The care and attention to detail is remarkable. They truly love their dogs and it shows in every
                  interaction. Our poodle is not just a pet, but a beloved family member."
                </p>
                <p className="font-semibold">— Jennifer L.</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent">
              <Link href="/reviews">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Welcome a New Family Member?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Explore our available puppies or get in touch to learn more about upcoming litters and our adoption process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full w-full sm:w-auto">
              <Link href="/available-puppies">View Available Puppies</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent w-full sm:w-auto">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
