'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FriendInfoDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: { name: string; notes: string }) => void
}

export function FriendInfoDialog({ open, onClose, onSubmit }: FriendInfoDialogProps) {
    const [name, setName] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = () => {
        if (!name.trim()) return
        onSubmit({ name, notes })
        setName('')
        setNotes('')
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Friend Information</DialogTitle>
                    {/*<DialogDescription>*/}
                    {/*    Add some details about the friend you're assessing. This helps track multiple friendships over time.*/}
                    {/*</DialogDescription>*/}
                    <DialogDescription>
                        Add some details about the friend you&apos;re assessing. This helps track multiple friendships over time.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Friend&apos;s Name or Identifier</Label>
                        <Input
                            id="name"
                            placeholder="Enter a name or nickname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any context or notes about this friendship"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!name.trim()}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
