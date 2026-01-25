"use client"

import { useState, useEffect } from "react"
import { FormSection } from "@/components/dashboard/form-section"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { RichTextEditor } from "@/components/dashboard/rich-text-editor"
import { SaveButton } from "@/components/dashboard/save-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrayEditor } from "@/components/dashboard/array-editor"
import { toast } from "sonner"
import { getSiteContentSection, updateSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

export default function AvailablePuppiesEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [puppiesData, setPuppiesData] = useState(data.availablePuppies)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("availablePuppies")
      if (sectionData) {
        setPuppiesData(sectionData)
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
      await updateSiteContent("availablePuppies", puppiesData)
      toast.success("Available puppies content saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Available Puppies Editor</h1>
        <p className="text-muted-foreground">Manage available puppies</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={puppiesData.title}
            onChange={(e) => setPuppiesData({ ...puppiesData, title: e.target.value })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={puppiesData.description}
          onChange={(value) => setPuppiesData({ ...puppiesData, description: value })}
          rows={3}
        />
      </FormSection>

      <FormSection title="Puppies">
        <ArrayEditor
          items={puppiesData.puppies || []}
          onItemsChange={(puppies) => setPuppiesData({ ...puppiesData, puppies })}
          getItemKey={(item) => item.name}
          title="Available Puppies"
          addButtonText="Add Puppy"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Birth Date:</strong> {item.birthDate}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Personality:</strong> {item.personality}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <ImageUpload
                label="Puppy Image"
                value={item?.image || ""}
                onChange={(url) => onChange({ ...item!, image: url })}
                folder="puppies"
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
                  <Select
                    value={item?.gender || "Male"}
                    onValueChange={(value) => onChange({ ...item!, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label>Birth Date</Label>
                  <Input
                    type="date"
                    value={item?.birthDate || ""}
                    onChange={(e) => onChange({ ...item!, birthDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={item?.status || "Available"}
                  onValueChange={(value) => onChange({ ...item!, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <RichTextEditor
                label="Personality"
                value={item?.personality || ""}
                onChange={(value) => onChange({ ...item!, personality: value })}
                rows={3}
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
