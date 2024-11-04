'use client'

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, Heart, Users } from "lucide-react";
import Link from 'next/link';

export default function ResourcesPage() {
    const resources = [
        {
            title: "Professional Support",
            items: [
                {
                    name: "BetterHelp - Online Counseling",
                    description: "Connect with licensed therapists specializing in relationship counseling.",
                    link: "https://www.betterhelp.com"
                },
                {
                    name: "Psychology Today - Find a Therapist",
                    description: "Search for mental health professionals in your area.",
                    link: "https://www.psychologytoday.com/us/therapists"
                }
            ]
        },
        {
            title: "Educational Resources",
            items: [
                {
                    name: "Healthy Friendship Guide",
                    description: "Learn about the characteristics of healthy friendships.",
                    link: "https://www.mindtools.com/pages/article/good-relationships.htm"
                },
                {
                    name: "Boundary Setting Tips",
                    description: "Practical advice for setting and maintaining healthy boundaries.",
                    link: "https://www.psychologytoday.com/us/blog/boundaries-at-work"
                }
            ]
        },
        {
            title: "Support Groups",
            items: [
                {
                    name: "Meetup - Friendship Groups",
                    description: "Find local friendship and support groups.",
                    link: "https://www.meetup.com/topics/friendship/"
                },
                {
                    name: "7 Cups - Online Support",
                    description: "Free emotional support and listening services.",
                    link: "https://www.7cups.com"
                }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Support Resources</h1>
                <p className="text-muted-foreground">
                    Find help and support to improve your relationships and emotional well-being
                </p>
            </div>

            <div className="grid gap-6">
                {resources.map((section) => (
                    <Card key={section.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {section.title === "Professional Support" && <Phone className="h-5 w-5" />}
                                {section.title === "Educational Resources" && <Heart className="h-5 w-5" />}
                                {section.title === "Support Groups" && <Users className="h-5 w-5" />}
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {section.items.map((item) => (
                                    <div key={item.name} className="space-y-2">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                        <Button variant="outline" asChild>
                                            <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                                Visit Resource
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    If you&apos;re experiencing a crisis or need immediate help, please contact emergency services or crisis helplines in your area.
                </p>
                <Button asChild variant="default">
                    <Link href="/assess">
                        Return to Assessment
                    </Link>
                </Button>
            </div>
        </div>
    );
}
