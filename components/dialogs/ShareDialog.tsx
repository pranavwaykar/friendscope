'use client'

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Facebook, Twitter, Linkedin, Mail, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    score: number;
    friendName: string;
}

export default function ShareDialog({ open, onOpenChange, score, friendName }: ShareDialogProps) {
    const { toast } = useToast();
    const [copied, setCopied] = React.useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const shareText = `I just assessed my friendship with ${friendName} using FriendScope and got a score of ${Math.round(score)}%! Check out your friendships too!`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast({
                title: "Link copied!",
                description: "The link has been copied to your clipboard.",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (_error) { // Rename to _error to indicate intentionally unused
            toast({
                title: "Failed to copy",
                description: "Please try again",
                variant: "destructive",
            });
        }
    };

    const shareLinks = [
        {
            name: 'Copy Link',
            icon: copied ? Check : Copy,
            onClick: handleCopy,
            className: copied ? 'text-green-600' : ''
        },
        {
            name: 'Facebook',
            icon: Facebook,
            onClick: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, '_blank');
            }
        },
        {
            name: 'Twitter',
            icon: Twitter,
            onClick: () => {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, '_blank');
            }
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            onClick: () => {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            }
        },
        {
            name: 'Email',
            icon: Mail,
            onClick: () => {
                window.location.href = `mailto:?subject=FriendScope Assessment Results&body=${encodeURIComponent(shareText + '\n\n' + url)}`;
            }
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Results</DialogTitle>
                    <DialogDescription>
                        Share your friendship assessment results with others
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {shareLinks.map((link) => (
                        <Button
                            key={link.name}
                            variant="outline"
                            className={`w-full justify-start gap-2 ${link.className || ''} transition-colors`}
                            onClick={link.onClick}
                        >
                            <link.icon className={`h-4 w-4 ${copied && link.name === 'Copy Link' ? 'text-green-600' : ''}`} />
                            {link.name}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
