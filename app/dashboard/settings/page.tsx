"use client"

import { useState, useEffect } from "react"
import { FormSection } from "@/components/dashboard/form-section"
import { SaveButton } from "@/components/dashboard/save-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrayEditor } from "@/components/dashboard/array-editor"
import { toast } from "sonner"
import { getSiteContentSection, updateSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

export default function SettingsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [siteData, setSiteData] = useState(data.site)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const sectionData = await getSiteContentSection("site")
      if (sectionData) {
        setSiteData(sectionData)
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
      await updateSiteContent("site", siteData)
      toast.success("Site settings saved successfully!")
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
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">Manage global site settings</p>
      </div>

      <FormSection title="Site Information">
        <div>
          <Label>Site Name</Label>
          <Input
            value={siteData.name}
            onChange={(e) => setSiteData({ ...siteData, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Tagline</Label>
          <Input
            value={siteData.tagline}
            onChange={(e) => setSiteData({ ...siteData, tagline: e.target.value })}
          />
        </div>
      </FormSection>

      <FormSection title="Navigation">
        <ArrayEditor
          items={siteData.navigation || []}
          onItemsChange={(navigation) => setSiteData({ ...siteData, navigation })}
          getItemKey={(item, index) => index}
          title="Navigation Links"
          addButtonText="Add Link"
          renderItem={(item) => (
            <div className="space-y-2">
              <p><strong>Label:</strong> {item.label}</p>
              <p><strong>Link:</strong> {item.href}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <div className="space-y-4">
              <div>
                <Label>Label</Label>
                <Input
                  value={item?.label || ""}
                  onChange={(e) => onChange({ ...item!, label: e.target.value })}
                />
              </div>
              <div>
                <Label>Link (href)</Label>
                <Input
                  value={item?.href || ""}
                  onChange={(e) => onChange({ ...item!, href: e.target.value })}
                  placeholder="/page"
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
