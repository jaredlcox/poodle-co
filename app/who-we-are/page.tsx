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
            At Poodle & Co., we're passionate dog lovers devoted to raising well-bred, family-raised puppies with health and heart in mind.
          </p>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-16">
            <Image src="/family-with-poodles-in-beautiful-home-setting.jpg" alt="Our family" fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Poodle & Co. began with a simple love for dogs and a passion for doing things the right way. What started as a small family dream has grown into a breeding program built on care, compassion, and quality.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Poodle & Co., our mission is to raise healthy, happy, and well-socialized puppies that bring joy to the families they join. All of our parent dogs are health tested, ethically bred, and raised in a loving home environment. We focus on temperament, intelligence, and beauty, but most importantly, on building a strong foundation of trust and love from day one.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We're proud to specialize in Poodles and Mini Sheepadoodles — each known for their loyalty, intelligence, and gentle nature. Whether you're looking for a playful companion, a loyal family dog, or a therapy prospect, our puppies are raised to become lifelong best friends.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For us, this isn't just a business — it's a calling. Every litter represents our commitment to bettering the breeds we love and helping families find the perfect new member of their pack. Welcome to Poodle & Co. — where family, love, and paws meet.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Health First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Comprehensive health testing for all parent dogs and puppies to ensure the healthiest possible start to life.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Ethical Practices</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We follow strict ethical standards and always prioritize the well-being of our dogs above all else.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We maintain open communication with families about our breeding practices, health testing, and puppy development every step of the way.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Lifetime Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're here for you and your puppy for life, offering ongoing guidance, support, and care whenever you need it.
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
