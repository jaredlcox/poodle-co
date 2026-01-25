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

export default function UpcomingLittersEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [littersData, setLittersData] = useState(data.upcomingLitters)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("upcomingLitters")
      if (sectionData) {
        setLittersData(sectionData)
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
      await updateSiteContent("upcomingLitters", littersData)
      toast.success("Upcoming litters content saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Upcoming Litters Editor</h1>
        <p className="text-muted-foreground">Manage upcoming litters information</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={littersData.title}
            onChange={(e) => setLittersData({ ...littersData, title: e.target.value })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={littersData.description}
          onChange={(value) => setLittersData({ ...littersData, description: value })}
          rows={3}
        />
      </FormSection>

      <FormSection title="Litters">
        <ArrayEditor
          items={littersData.litters || []}
          onItemsChange={(litters) => setLittersData({ ...littersData, litters })}
          getItemKey={(item, index) => index}
          title="Upcoming Litters"
          addButtonText="Add Litter"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Mother:</strong> {item.mother}</p>
              <p><strong>Father:</strong> {item.father}</p>
              <p><strong>Expected Date:</strong> {item.expectedDate}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mother</Label>
                  <Input
                    value={item?.mother || ""}
                    onChange={(e) => onChange({ ...item!, mother: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Father</Label>
                  <Input
                    value={item?.father || ""}
                    onChange={(e) => onChange({ ...item!, father: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expected Date</Label>
                  <Input
                    type="date"
                    value={item?.expectedDate || ""}
                    onChange={(e) => onChange({ ...item!, expectedDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={item?.status || "Expected"}
                    onValueChange={(value) => onChange({ ...item!, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Expected">Expected</SelectItem>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <ImageUpload
                label="Mother Image"
                value={item?.motherImage || ""}
                onChange={(url) => onChange({ ...item!, motherImage: url })}
                folder="litters"
              />
              <ImageUpload
                label="Father Image"
                value={item?.fatherImage || ""}
                onChange={(url) => onChange({ ...item!, fatherImage: url })}
                folder="litters"
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
