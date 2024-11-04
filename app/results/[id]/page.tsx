'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useHistoryStore } from '@/lib/history-store'
import { BarMetric, LineMetric } from '@/components/ui/metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'
import { Download, Share2, ArrowLeft, Printer } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { AssessmentResult } from '@/types/assessment'

const CATEGORY_DETAILS = {
    "Trust & Honesty": {
        description: "Measures the level of trust and honesty in your friendship",
        recommendations: {
            low: [
                "Have an honest conversation about trust issues",
                "Start with small trust-building exercises",
                "Be consistent in keeping your word"
            ],
            medium: [
                "Continue building trust through open communication",
                "Share more personal experiences",
                "Acknowledge and appreciate honest moments"
            ],
            high: [
                "Maintain the strong foundation of trust",
                "Continue being reliable and honest",
                "Help others build trust in their relationships"
            ]
        }
    },
    "Emotional Support": {
        description: "Evaluates the quality of emotional connection and support",
        recommendations: {
            low: [
                "Practice active listening without judgment",
                "Show more empathy during difficult times",
                "Reach out more frequently to check on their well-being"
            ],
            medium: [
                "Deepen emotional conversations",
                "Share your own vulnerabilities",
                "Celebrate their successes more actively"
            ],
            high: [
                "Continue being emotionally available",
                "Help others learn from your supportive friendship",
                "Maintain the balance of giving and receiving support"
            ]
        }
    },
    "Communication": {
        description: "Assesses the effectiveness and depth of communication",
        recommendations: {
            low: [
                "Practice more active listening",
                "Schedule regular check-ins",
                "Work on expressing feelings more clearly"
            ],
            medium: [
                "Explore deeper conversation topics",
                "Practice giving and receiving feedback",
                "Create safe spaces for difficult discussions"
            ],
            high: [
                "Maintain open communication channels",
                "Share communication strategies that work",
                "Continue fostering meaningful dialogue"
            ]
        }
    },
    "Boundaries": {
        description: "Examines respect for personal limits and space",
        recommendations: {
            low: [
                "Clearly communicate your personal boundaries",
                "Learn to say 'no' when necessary",
                "Respect others' time and space"
            ],
            medium: [
                "Review and adjust boundaries as needed",
                "Practice healthy boundary-setting",
                "Discuss expectations openly"
            ],
            high: [
                "Continue respecting established boundaries",
                "Model healthy boundary-setting for others",
                "Help others understand the importance of boundaries"
            ]
        }
    },
    "Reciprocity": {
        description: "Measures the balance of give and take in the friendship",
        recommendations: {
            low: [
                "Track the balance of giving and receiving",
                "Communicate your needs more clearly",
                "Look for opportunities to reciprocate"
            ],
            medium: [
                "Find new ways to contribute to the friendship",
                "Express appreciation more often",
                "Balance asking for and offering help"
            ],
            high: [
                "Maintain the healthy balance",
                "Share strategies for maintaining reciprocity",
                "Continue mutual support patterns"
            ]
        }
    },
    "Conflict Resolution": {
        description: "Evaluates how conflicts and disagreements are handled",
        recommendations: {
            low: [
                "Address conflicts promptly and calmly",
                "Practice active listening during disagreements",
                "Focus on solutions rather than blame"
            ],
            medium: [
                "Develop better conflict resolution skills",
                "Practice compromise and understanding",
                "Learn from past conflicts"
            ],
            high: [
                "Continue using effective resolution strategies",
                "Share conflict resolution techniques",
                "Help others learn from your approach"
            ]
        }
    },
    "Growth & Development": {
        description: "Assesses how the friendship supports personal growth",
        recommendations: {
            low: [
                "Share goals and aspirations",
                "Encourage each other's personal development",
                "Create opportunities for mutual learning"
            ],
            medium: [
                "Set mutual growth goals",
                "Share resources and opportunities",
                "Celebrate personal achievements together"
            ],
            high: [
                "Continue supporting each other's growth",
                "Share success stories and lessons learned",
                "Inspire others through your example"
            ]
        }
    },
    "Values Alignment": {
        description: "Examines the compatibility of core values and principles",
        recommendations: {
            low: [
                "Discuss core values openly",
                "Identify areas of common ground",
                "Respect differences in perspectives"
            ],
            medium: [
                "Explore shared values more deeply",
                "Build on common principles",
                "Address value conflicts constructively"
            ],
            high: [
                "Continue living shared values",
                "Strengthen value-based decisions",
                "Help others understand value alignment"
            ]
        }
    },
    "Respect & Recognition": {
        description: "Measures mutual respect and appreciation",
        recommendations: {
            low: [
                "Show more appreciation for differences",
                "Acknowledge contributions more often",
                "Practice active recognition"
            ],
            medium: [
                "Find new ways to show respect",
                "Express gratitude regularly",
                "Celebrate unique qualities"
            ],
            high: [
                "Maintain high levels of mutual respect",
                "Continue showing appreciation",
                "Model respectful behavior for others"
            ]
        }
    },
    "Reliability": {
        description: "Evaluates consistency and dependability in the friendship",
        recommendations: {
            low: [
                "Follow through on commitments",
                "Communicate when unable to meet obligations",
                "Be more consistent in response times"
            ],
            medium: [
                "Strengthen reliability patterns",
                "Build better accountability",
                "Plan and coordinate more effectively"
            ],
            high: [
                "Maintain consistent reliability",
                "Share strategies for being dependable",
                "Help others develop reliability"
            ]
        }
    }
}

export default function DetailedResultPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const { getAssessment, assessments } = useHistoryStore()
    const [assessment, setAssessment] = useState<AssessmentResult | undefined>()

    useEffect(() => {
        if (params.id) {
            const result = getAssessment(params.id as string)
            if (result) {
                setAssessment(result)
            } else {
                router.push('/history')
            }
        }
    }, [params.id, getAssessment, router])

    if (!assessment) return null

    const handleDownloadPDF = () => {
        // PDF generation logic will be implemented later
        toast({
            title: "Coming Soon",
            description: "PDF download feature will be available soon!"
        })
    }

    const handleShare = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        toast({
            title: "Link Copied",
            description: "Assessment link has been copied to clipboard"
        })
    }

    const handlePrint = () => {
        window.print()
    }

    const getRecommendations = (category: string, score: number) => {
        const details = CATEGORY_DETAILS[category as keyof typeof CATEGORY_DETAILS]
        if (!details) return []
        if (score >= 80) return details.recommendations.high
        if (score >= 60) return details.recommendations.medium
        return details.recommendations.low
    }

    const categoryData = Object.entries(assessment.categoryScores).map(([name, value]) => ({
        date: name,
        value: Math.round(value)
    }))

    const trendData = assessments
        .filter(a => a.friendName === assessment.friendName)
        .slice(0, 5)
        .reverse()
        .map(a => ({
            date: format(new Date(a.date), 'MMM d'),
            value: Math.round(a.overallScore)
        }))

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2" /> Back
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="mr-2" /> Share
                    </Button>
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="mr-2" /> Print
                    </Button>
                    <Button onClick={handleDownloadPDF}>
                        <Download className="mr-2" /> Download PDF
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
                {/* Overview Card */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-2xl">Friendship Assessment Details</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(assessment.date), 'MMMM d, yyyy')}
                                </p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-3xl font-bold text-primary">
                                    {Math.round(assessment.overallScore)}%
                                </h3>
                                <p className="text-sm text-muted-foreground">Overall Score</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Friend Name</h4>
                                <p>{assessment.friendName}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Assessment</h4>
                                <p>{assessment.assessment.message}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Recommendation</h4>
                                <p>{assessment.assessment.recommendation}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <BarMetric
                        data={categoryData}
                        title="Category Scores"
                        description="Breakdown of friendship aspects"
                    />
                    {trendData.length > 1 && (
                        <LineMetric
                            data={trendData}
                            title="Score Trend"
                            description="Score history with this friend"
                        />
                    )}
                </div>

                {/* Detailed Recommendations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Analysis & Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Recommendations</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(assessment.categoryScores).map(([category, score]) => (
                                    <TableRow key={category}>
                                        <TableCell className="font-medium">{category}</TableCell>
                                        <TableCell>{Math.round(score)}%</TableCell>
                                        <TableCell>
                                            <ul className="list-disc list-inside space-y-1">
                                                {getRecommendations(category, score).map((rec, index) => (
                                                    <li key={index}>{rec}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
