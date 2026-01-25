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

export default function ReviewsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [reviewsData, setReviewsData] = useState(data.reviews)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("reviews")
      if (sectionData) {
        setReviewsData(sectionData)
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
      await updateSiteContent("reviews", reviewsData)
      toast.success("Reviews content saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Reviews Editor</h1>
        <p className="text-muted-foreground">Manage customer reviews</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={reviewsData.title}
            onChange={(e) => setReviewsData({ ...reviewsData, title: e.target.value })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={reviewsData.description}
          onChange={(value) => setReviewsData({ ...reviewsData, description: value })}
          rows={3}
        />
      </FormSection>

      <FormSection title="Reviews">
        <ArrayEditor
          items={reviewsData.reviews || []}
          onItemsChange={(reviews) => setReviewsData({ ...reviewsData, reviews })}
          getItemKey={(item, index) => index}
          title="Customer Reviews"
          addButtonText="Add Review"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Rating:</strong> {item.rating} stars</p>
              <p><strong>Text:</strong> {item.text}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={item?.name || ""}
                    onChange={(e) => onChange({ ...item!, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={item?.location || ""}
                    onChange={(e) => onChange({ ...item!, location: e.target.value })}
                  />
                </div>
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
                label="Review Text"
                value={item?.text || ""}
                onChange={(value) => onChange({ ...item!, text: value })}
                rows={4}
              />
              <ImageUpload
                label="Review Image (Optional)"
                value={item?.image || ""}
                onChange={(url) => onChange({ ...item!, image: url })}
                folder="reviews"
              />
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
