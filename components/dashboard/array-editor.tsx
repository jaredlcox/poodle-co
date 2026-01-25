"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface ArrayEditorProps<T> {
  items: T[]
  onItemsChange: (items: T[]) => void
  renderItem: (item: T, index: number) => React.ReactNode
  renderForm: (item: T | null, onChange: (item: T) => void) => React.ReactNode
  getItemKey: (item: T, index: number) => string | number
  title: string
  addButtonText?: string
  emptyMessage?: string
}

export function ArrayEditor<T extends Record<string, any>>({
  items,
  onItemsChange,
  renderItem,
  renderForm,
  getItemKey,
  title,
  addButtonText = "Add Item",
  emptyMessage = "No items yet. Click the button above to add one.",
}: ArrayEditorProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<T | null>(null)

  const handleAdd = () => {
    setFormData(null)
    setEditingIndex(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (index: number) => {
    setFormData({ ...items[index] })
    setEditingIndex(index)
    setIsDialogOpen(true)
  }

  const handleDelete = (index: number) => {
    setDeletingIndex(index)
  }

  const confirmDelete = () => {
    if (deletingIndex !== null) {
      const newItems = items.filter((_, i) => i !== deletingIndex)
      onItemsChange(newItems)
      setDeletingIndex(null)
    }
  }

  const handleSave = () => {
    if (formData) {
      if (editingIndex !== null) {
        // Update existing item
        const newItems = [...items]
        newItems[editingIndex] = formData
        onItemsChange(newItems)
      } else {
        // Add new item
        onItemsChange([...items, formData])
      }
      setIsDialogOpen(false)
      setFormData(null)
      setEditingIndex(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {addButtonText}
        </Button>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {emptyMessage}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={getItemKey(item, index)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Item {index + 1}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{renderItem(item, index)}</CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Edit Item" : "Add New Item"}
            </DialogTitle>
            <DialogDescription>
              {editingIndex !== null
                ? "Make changes to the item below."
                : "Fill in the details for the new item."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {formData && renderForm(formData, setFormData)}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deletingIndex !== null}
        onOpenChange={(open) => !open && setDeletingIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
