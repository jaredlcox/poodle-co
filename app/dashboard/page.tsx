"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Home, Heart, Baby, Star, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const quickLinks = [
  {
    title: "Home Page",
    description: "Edit hero section, values, gallery, and testimonials",
    href: "/dashboard/home",
    icon: Home,
    color: "text-blue-600",
  },
  {
    title: "Our Dogs",
    description: "Manage breeding dogs information",
    href: "/dashboard/our-dogs",
    icon: Heart,
    color: "text-red-600",
  },
  {
    title: "Available Puppies",
    description: "Add, edit, or remove available puppies",
    href: "/dashboard/available-puppies",
    icon: Baby,
    color: "text-pink-600",
  },
  {
    title: "Reviews",
    description: "Manage customer reviews and testimonials",
    href: "/dashboard/reviews",
    icon: Star,
    color: "text-yellow-600",
  },
  {
    title: "Contact",
    description: "Update contact information and social links",
    href: "/dashboard/contact",
    icon: Mail,
    color: "text-green-600",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your website content and settings
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Card key={link.href} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <link.icon className={`h-6 w-6 ${link.color}`} />
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </div>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={link.href}>Edit</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Quick guide to managing your website content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Navigate to a section</h3>
            <p className="text-sm text-muted-foreground">
              Use the sidebar to navigate to any section you want to edit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">2. Make your changes</h3>
            <p className="text-sm text-muted-foreground">
              Edit text, upload images, add or remove items from lists.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">3. Save your changes</h3>
            <p className="text-sm text-muted-foreground">
              Click the Save button to update your website. Changes will be reflected immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
