"use client"

import { useState, useEffect } from "react"
import { FormSection } from "@/components/dashboard/form-section"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { RichTextEditor } from "@/components/dashboard/rich-text-editor"
import { SaveButton } from "@/components/dashboard/save-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrayEditor } from "@/components/dashboard/array-editor"
import { toast } from "sonner"
import { getSiteContentSection, updateSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

export default function WhoWeAreEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [whoWeAreData, setWhoWeAreData] = useState(data.whoWeAre)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("whoWeAre")
      if (sectionData) {
        setWhoWeAreData(sectionData)
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSiteContent("whoWeAre", whoWeAreData)
      toast.success("Who We Are content saved successfully!")
    } catch (error: any) {
      toast.error("Failed to save: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Who We Are Editor</h1>
        <p className="text-muted-foreground">Edit the Who We Are page content</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={whoWeAreData.title}
            onChange={(e) => setWhoWeAreData({ ...whoWeAreData, title: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            value={whoWeAreData.subtitle}
            onChange={(e) => setWhoWeAreData({ ...whoWeAreData, subtitle: e.target.value })}
          />
        </div>
        <ImageUpload
          label="Main Image"
          value={whoWeAreData.mainImage}
          onChange={(url) => setWhoWeAreData({ ...whoWeAreData, mainImage: url })}
          folder="who-we-are"
        />
      </FormSection>

      <FormSection title="Our Story">
        <div>
          <Label>Story Title</Label>
          <Input
            value={whoWeAreData.story.title}
            onChange={(e) => setWhoWeAreData({ ...whoWeAreData, story: { ...whoWeAreData.story, title: e.target.value } })}
          />
        </div>
        <ArrayEditor
          items={whoWeAreData.story.paragraphs || []}
          onItemsChange={(paragraphs) => setWhoWeAreData({ ...whoWeAreData, story: { ...whoWeAreData.story, paragraphs } })}
          getItemKey={(item, index) => index}
          title="Story Paragraphs"
          addButtonText="Add Paragraph"
          renderItem={(item, index) => <p className="text-sm">{item}</p>}
          renderForm={(item, onChange) => (
            <RichTextEditor
              label="Paragraph"
              value={item || ""}
              onChange={(value) => onChange(value)}
              rows={4}
            />
          )}
        />
      </FormSection>

      <FormSection title="Our Values">
        <div>
          <Label>Values Title</Label>
          <Input
            value={whoWeAreData.values.title}
            onChange={(e) => setWhoWeAreData({ ...whoWeAreData, values: { ...whoWeAreData.values, title: e.target.value } })}
          />
        </div>
        <ArrayEditor
          items={whoWeAreData.values.items || []}
          onItemsChange={(items) => setWhoWeAreData({ ...whoWeAreData, values: { ...whoWeAreData.values, items } })}
          getItemKey={(item, index) => index}
          title="Values"
          addButtonText="Add Value"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Title:</strong> {item.title}</p>
              <p><strong>Description:</strong> {item.description}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
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

      <FormSection title="Gallery Images">
        <ArrayEditor
          items={whoWeAreData.galleryImages || []}
          onItemsChange={(galleryImages) => setWhoWeAreData({ ...whoWeAreData, galleryImages })}
          getItemKey={(item, index) => index}
          title="Gallery Images"
          addButtonText="Add Image"
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
                folder="who-we-are"
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

      <div className="flex justify-end gap-4 pt-6 border-t">
        <SaveButton onClick={handleSave} loading={saving} />
      </div>
    </div>
  )
}
