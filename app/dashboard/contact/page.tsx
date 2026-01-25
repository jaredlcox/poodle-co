"use client"

import { useState, useEffect } from "react"
import { FormSection } from "@/components/dashboard/form-section"
import { RichTextEditor } from "@/components/dashboard/rich-text-editor"
import { SaveButton } from "@/components/dashboard/save-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrayEditor } from "@/components/dashboard/array-editor"
import { toast } from "sonner"
import { getSiteContentSection, updateSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

export default function ContactEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contactData, setContactData] = useState(data.contact)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("contact")
      if (sectionData) {
        setContactData(sectionData)
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
      await updateSiteContent("contact", contactData)
      toast.success("Contact information saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Contact Editor</h1>
        <p className="text-muted-foreground">Update contact information and social links</p>
      </div>

      <FormSection title="Page Header">
        <div>
          <Label>Title</Label>
          <Input
            value={contactData.title}
            onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
          />
        </div>
        <RichTextEditor
          label="Description"
          value={contactData.description}
          onChange={(value) => setContactData({ ...contactData, description: value })}
          rows={3}
        />
      </FormSection>

      <FormSection title="Contact Information">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={contactData.email}
            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
          />
        </div>
        <div>
          <Label>Visit Note</Label>
          <Input
            value={contactData.visitNote}
            onChange={(e) => setContactData({ ...contactData, visitNote: e.target.value })}
          />
        </div>
        <div>
          <Label>Locations</Label>
          <ArrayEditor
            items={contactData.locations || []}
            onItemsChange={(locations) => setContactData({ ...contactData, locations })}
            getItemKey={(item, index) => index}
            title="Locations"
            addButtonText="Add Location"
            renderItem={(item, index) => <p>{item}</p>}
            renderForm={(item, onChange) => (
              <Input
                value={item || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="City, State"
              />
            )}
          />
        </div>
      </FormSection>

      <FormSection title="Social Media">
        <div>
          <Label>Instagram URL</Label>
          <Input
            type="url"
            value={contactData.social?.instagram || ""}
            onChange={(e) => setContactData({ 
              ...contactData, 
              social: { ...contactData.social, instagram: e.target.value } 
            })}
            placeholder="https://instagram.com/username"
          />
        </div>
        <div>
          <Label>Facebook URL</Label>
          <Input
            type="url"
            value={contactData.social?.facebook || ""}
            onChange={(e) => setContactData({ 
              ...contactData, 
              social: { ...contactData.social, facebook: e.target.value } 
            })}
            placeholder="https://facebook.com/username"
          />
        </div>
      </FormSection>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <SaveButton onClick={handleSave} loading={saving} />
      </div>
    </div>
  )
}
