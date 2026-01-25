"use client"

import { useState, useEffect } from "react"
import { FormSection } from "@/components/dashboard/form-section"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { RichTextEditor } from "@/components/dashboard/rich-text-editor"
import { SaveButton } from "@/components/dashboard/save-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrayEditor } from "@/components/dashboard/array-editor"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getSiteContentSection, updateSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"
import { EditorLoadingSkeleton } from "@/components/dashboard/loading-skeleton"

export default function HomePageEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [homeData, setHomeData] = useState(data.home)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setError(null)
      const sectionData = await getSiteContentSection("home")
      if (sectionData) {
        setHomeData(sectionData)
      }
    } catch (error: any) {
      console.error("Failed to load data:", error)
      setError("Failed to load data. Using default values.")
      toast.error("Failed to load data from Firestore")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      await updateSiteContent("home", homeData)
      toast.success("Home page content saved successfully!")
    } catch (error: any) {
      const errorMessage = error.message || "Failed to save changes"
      setError(errorMessage)
      toast.error("Failed to save: " + errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <EditorLoadingSkeleton />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Home Page Editor</h1>
        <p className="text-muted-foreground">Edit the home page content</p>
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}
      </div>

      <FormSection title="Hero Section" description="Main banner area">
        <ImageUpload
          label="Hero Image"
          value={homeData.hero.image}
          onChange={(url) => setHomeData({ ...homeData, hero: { ...homeData.hero, image: url } })}
          folder="home"
        />
        <div>
          <Label>Title</Label>
          <Input
            value={homeData.hero.title}
            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, title: e.target.value } })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={homeData.hero.description}
          onChange={(value) => setHomeData({ ...homeData, hero: { ...homeData.hero, description: value } })}
          rows={3}
        />
        <ArrayEditor
          items={homeData.hero.buttons || []}
          onItemsChange={(buttons) => setHomeData({ ...homeData, hero: { ...homeData.hero, buttons } })}
          getItemKey={(item, index) => index}
          title="Hero Buttons"
          addButtonText="Add Button"
          renderItem={(item, index) => (
            <div className="space-y-2">
              <p><strong>Text:</strong> {item.text}</p>
              <p><strong>Link:</strong> {item.href}</p>
              <p><strong>Variant:</strong> {item.variant}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div>
                <Label>Button Text</Label>
                <Input
                  value={item?.text || ""}
                  onChange={(e) => onChange({ ...item!, text: e.target.value })}
                />
              </div>
              <div>
                <Label>Link (href)</Label>
                <Input
                  value={item?.href || ""}
                  onChange={(e) => onChange({ ...item!, href: e.target.value })}
                />
              </div>
              <div>
                <Label>Variant</Label>
                <Input
                  value={item?.variant || "primary"}
                  onChange={(e) => onChange({ ...item!, variant: e.target.value })}
                />
              </div>
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Values Section">
        <div>
          <Label>Title</Label>
          <Input
            value={homeData.values.title}
            onChange={(e) => setHomeData({ ...homeData, values: { ...homeData.values, title: e.target.value } })}
          />
        </div>
        <ArrayEditor
          items={homeData.values.items || []}
          onItemsChange={(items) => setHomeData({ ...homeData, values: { ...homeData.values, items } })}
          getItemKey={(item, index) => index}
          title="Value Items"
          addButtonText="Add Value"
          renderItem={(item, index) => (
            <div className="space-y-2">
              <p><strong>Title:</strong> {item.title}</p>
              <p><strong>Icon:</strong> {item.icon}</p>
              <p><strong>Description:</strong> {item.description}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div>
                <Label>Icon Name</Label>
                <Input
                  value={item?.icon || ""}
                  onChange={(e) => onChange({ ...item!, icon: e.target.value })}
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={item?.title || ""}
                  onChange={(e) => onChange({ ...item!, title: e.target.value })}
                />
              </div>
              <RichTextEditor
                label="Description"
                value={item?.description || ""}
                onChange={(value) => onChange({ ...item!, description: value })}
                rows={3}
              />
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Gallery Section">
        <div>
          <Label>Title</Label>
          <Input
            value={homeData.gallery.title}
            onChange={(e) => setHomeData({ ...homeData, gallery: { ...homeData.gallery, title: e.target.value } })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={homeData.gallery.description}
          onChange={(value) => setHomeData({ ...homeData, gallery: { ...homeData.gallery, description: value } })}
          rows={2}
        />
        <ArrayEditor
          items={homeData.gallery.photos || []}
          onItemsChange={(photos) => setHomeData({ ...homeData, gallery: { ...homeData.gallery, photos } })}
          getItemKey={(item) => item.id}
          title="Gallery Photos"
          addButtonText="Add Photo"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Image:</strong> {item.image}</p>
              <p><strong>Alt:</strong> {item.alt}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <ImageUpload
                label="Image"
                value={item?.image || ""}
                onChange={(url) => onChange({ ...item!, image: url })}
                folder="gallery"
              />
              <div>
                <Label>Alt Text</Label>
                <Input
                  value={item?.alt || ""}
                  onChange={(e) => onChange({ ...item!, alt: e.target.value })}
                />
              </div>
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Testimonials Section">
        <div>
          <Label>Title</Label>
          <Input
            value={homeData.testimonials.title}
            onChange={(e) => setHomeData({ ...homeData, testimonials: { ...homeData.testimonials, title: e.target.value } })}
          />
        </div>
        <ArrayEditor
          items={homeData.testimonials.preview || []}
          onItemsChange={(preview) => setHomeData({ ...homeData, testimonials: { ...homeData.testimonials, preview } })}
          getItemKey={(item, index) => index}
          title="Testimonials"
          addButtonText="Add Testimonial"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Rating:</strong> {item.rating} stars</p>
              <p><strong>Text:</strong> {item.text}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={item?.name || ""}
                  onChange={(e) => onChange({ ...item!, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Rating (1-5)</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={item?.rating || 5}
                  onChange={(e) => onChange({ ...item!, rating: parseInt(e.target.value) })}
                />
              </div>
              <RichTextEditor
                label="Testimonial Text"
                value={item?.text || ""}
                onChange={(value) => onChange({ ...item!, text: value })}
                rows={4}
              />
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Call to Action Section">
        <div>
          <Label>Title</Label>
          <Input
            value={homeData.cta.title}
            onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, title: e.target.value } })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={homeData.cta.description}
          onChange={(value) => setHomeData({ ...homeData, cta: { ...homeData.cta, description: value } })}
          rows={3}
        />
        <ArrayEditor
          items={homeData.cta.buttons || []}
          onItemsChange={(buttons) => setHomeData({ ...homeData, cta: { ...homeData.cta, buttons } })}
          getItemKey={(item, index) => index}
          title="CTA Buttons"
          addButtonText="Add Button"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Text:</strong> {item.text}</p>
              <p><strong>Link:</strong> {item.href}</p>
              <p><strong>Variant:</strong> {item.variant}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div>
                <Label>Button Text</Label>
                <Input
                  value={item?.text || ""}
                  onChange={(e) => onChange({ ...item!, text: e.target.value })}
                />
              </div>
              <div>
                <Label>Link (href)</Label>
                <Input
                  value={item?.href || ""}
                  onChange={(e) => onChange({ ...item!, href: e.target.value })}
                />
              </div>
              <div>
                <Label>Variant</Label>
                <Input
                  value={item?.variant || "primary"}
                  onChange={(e) => onChange({ ...item!, variant: e.target.value })}
                />
              </div>
            </div>
          )}
        />
      </FormSection>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <SaveButton onClick={handleSave} loading={saving} />
      </div>
    </div>
  )
}
