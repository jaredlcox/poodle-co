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

export default function PastPuppiesEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pastPuppiesData, setPastPuppiesData] = useState(data.pastPuppies)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("pastPuppies")
      if (sectionData) {
        setPastPuppiesData(sectionData)
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
      await updateSiteContent("pastPuppies", pastPuppiesData)
      toast.success("Past puppies content saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Past Puppies Editor</h1>
        <p className="text-muted-foreground">Manage past puppies gallery</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={pastPuppiesData.title}
            onChange={(e) => setPastPuppiesData({ ...pastPuppiesData, title: e.target.value })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={pastPuppiesData.description}
          onChange={(value) => setPastPuppiesData({ ...pastPuppiesData, description: value })}
          rows={3}
        />
      </FormSection>

      <FormSection title="Past Puppies">
        <ArrayEditor
          items={pastPuppiesData.puppies || []}
          onItemsChange={(puppies) => setPastPuppiesData({ ...pastPuppiesData, puppies })}
          getItemKey={(item) => item.id}
          title="Past Puppies"
          addButtonText="Add Puppy"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Puppy Age:</strong> {item.puppyAge}</p>
              <p><strong>Adult Age:</strong> {item.adultAge}</p>
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
              <ImageUpload
                label="Puppy Image"
                value={item?.puppyImage || ""}
                onChange={(url) => onChange({ ...item!, puppyImage: url })}
                folder="puppies"
              />
              <ImageUpload
                label="Adult Image"
                value={item?.adultImage || ""}
                onChange={(url) => onChange({ ...item!, adultImage: url })}
                folder="adults"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Puppy Age</Label>
                  <Input
                    value={item?.puppyAge || ""}
                    onChange={(e) => onChange({ ...item!, puppyAge: e.target.value })}
                    placeholder="8 weeks old"
                  />
                </div>
                <div>
                  <Label>Adult Age</Label>
                  <Input
                    value={item?.adultAge || ""}
                    onChange={(e) => onChange({ ...item!, adultAge: e.target.value })}
                    placeholder="2 years old"
                  />
                </div>
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
