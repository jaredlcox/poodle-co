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

export default function OurDogsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [ourDogsData, setOurDogsData] = useState(data.ourDogs)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("ourDogs")
      if (sectionData) {
        setOurDogsData(sectionData)
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
      await updateSiteContent("ourDogs", ourDogsData)
      toast.success("Our Dogs content saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Our Dogs Editor</h1>
        <p className="text-muted-foreground">Manage breeding dogs information</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={ourDogsData.title}
            onChange={(e) => setOurDogsData({ ...ourDogsData, title: e.target.value })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={ourDogsData.description}
          onChange={(value) => setOurDogsData({ ...ourDogsData, description: value })}
          rows={3}
        />
      </FormSection>

      <FormSection title="Breeding Dogs">
        <ArrayEditor
          items={ourDogsData.dogs || []}
          onItemsChange={(dogs) => setOurDogsData({ ...ourDogsData, dogs })}
          getItemKey={(item) => item.name}
          title="Dogs"
          addButtonText="Add Dog"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Weight:</strong> {item.weight}</p>
              <p><strong>Traits:</strong> {item.traits?.join(", ")}</p>
              <p><strong>Health:</strong> {item.health}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <ImageUpload
                label="Dog Image"
                value={item?.image || ""}
                onChange={(url) => onChange({ ...item!, image: url })}
                folder="dogs"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={item?.name || ""}
                    onChange={(e) => onChange({ ...item!, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Input
                    value={item?.gender || ""}
                    onChange={(e) => onChange({ ...item!, gender: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Color</Label>
                  <Input
                    value={item?.color || ""}
                    onChange={(e) => onChange({ ...item!, color: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Weight</Label>
                  <Input
                    value={item?.weight || ""}
                    onChange={(e) => onChange({ ...item!, weight: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Traits (comma-separated)</Label>
                <Input
                  value={item?.traits?.join(", ") || ""}
                  onChange={(e) => onChange({ ...item!, traits: e.target.value.split(",").map(t => t.trim()) })}
                  placeholder="Gentle, Intelligent, Playful"
                />
              </div>
              <RichTextEditor
                label="Health Information"
                value={item?.health || ""}
                onChange={(value) => onChange({ ...item!, health: value })}
                rows={2}
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
