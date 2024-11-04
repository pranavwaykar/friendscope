'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useHistoryStore } from '@/lib/history-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
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
import { ComparisonChart } from '@/components/ComparisonChart'

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
    // Add details for other categories...
}

export default function DetailedResultPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const { getAssessment, assessments } = useHistoryStore()
    const [assessment, setAssessment] = useState<AssessmentResult | undefined>()
    const [comparisonData, setComparisonData] = useState<any[]>([])

    useEffect(() => {
        if (params.id) {
            const result = getAssessment(params.id as string)
            if (result) {
                setAssessment(result)
                // Get previous assessments for the same friend
                const previousAssessments = assessments
                    .filter(a => a.friendName === result.friendName)
                    .slice(0, 5)
                    .reverse()
                setComparisonData(previousAssessments)
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

    const chartData = Object.entries(assessment.categoryScores).map(([name, value]) => ({
        category: name,
        score: Math.round(value)
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

                {/* Radar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={chartData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="category" />
                                    <PolarRadiusAxis domain={[0, 100]} />
                                    <Radar
                                        name="Score"
                                        dataKey="score"
                                        fill="#3b82f6"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Trend Analysis */}
                {comparisonData.length > 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Score Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ComparisonChart data={comparisonData} />
                            </div>
                        </CardContent>
                    </Card>
                )}

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
