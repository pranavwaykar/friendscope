'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAssessmentStore } from '@/lib/store'
import { useHistoryStore } from '@/lib/history-store'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from 'uuid'
import { FriendInfoDialog } from '@/components/FriendInfoDialog'
import { calculateScores, getCategoryDescription } from '@/lib/assessment'
import { ArrowRight } from 'lucide-react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AssessmentResult } from '@/types/assessment'
import ShareDialog from '@/components/dialogs/ShareDialog';

interface FriendInfo {
    name: string;
    notes: string;
}

type AssessmentResultData = Omit<AssessmentResult, 'id' | 'date' | 'friendName' | 'notes'>

export default function ResultsPage() {
    const router = useRouter()
    const { answers, resetAssessment } = useAssessmentStore()
    const { addAssessment } = useHistoryStore()
    const [isLoading, setIsLoading] = useState(true)
    const [assessmentResult, setAssessmentResult] = useState<AssessmentResultData | null>(null)
    const [showFriendDialog, setShowFriendDialog] = useState(true)
    const { toast } = useToast()
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [friendName, setFriendName] = useState<string>('');

    useEffect(() => {
        if (Object.keys(answers).length === 0) {
            router.push('/assess')
            return
        }

        const results = calculateScores(answers)
        setAssessmentResult(results)
        setIsLoading(false)
    }, [answers, router])

    const handleFriendInfoSubmit = (friendInfo: FriendInfo) => {
        setShowFriendDialog(false)
        setFriendName(friendInfo.name);
        if (assessmentResult) {
            const assessment: AssessmentResult = {
                id: uuidv4(),
                date: new Date().toISOString(),
                friendName: friendInfo.name,
                notes: friendInfo.notes,
                overallScore: assessmentResult.overallScore,
                categoryScores: assessmentResult.categoryScores,
                assessment: {
                    threshold: assessmentResult.assessment.threshold,
                    message: assessmentResult.assessment.message,
                    recommendation: assessmentResult.assessment.recommendation
                }
            }
            addAssessment(assessment)
        }
    }

    const handleShare = () => {
        const shareUrl = window.location.href
        navigator.clipboard.writeText(shareUrl).then(() => {
            toast({
                title: "Link Copied!",
                description: "The link to your results has been copied to your clipboard.",
            })
        }).catch(() => {
            toast({
                title: "Failed to copy",
                description: "An error occurred while trying to copy the link.",
                variant: "destructive",
            })
        })
    }

    if (isLoading || !assessmentResult) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    const chartData = Object.entries(assessmentResult.categoryScores).map(([name, value]) => ({
        name,
        value: Math.round(value),
        description: getCategoryDescription(name, value)
    }))

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <FriendInfoDialog
                open={showFriendDialog}
                onClose={() => setShowFriendDialog(false)}
                onSubmit={handleFriendInfoSubmit}
            />

            {/* Overall Score Card */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Your Friendship Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-4">
                            {Math.round(assessmentResult.overallScore)}%
                        </div>
                        <p className="text-xl mb-8">
                            {assessmentResult.assessment.message}
                        </p>
                        <Alert className="mb-6">
                            <AlertTitle>Assessment Result</AlertTitle>
                            <AlertDescription>
                                {assessmentResult.assessment.recommendation}
                            </AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Friendship Aspects</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={chartData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <Radar
                                    name="Score"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    fill="#3B82F6"
                                    fillOpacity={0.6}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload as {
                                                name: string;
                                                value: number;
                                                description: string;
                                            }
                                            return (
                                                <div className="bg-white p-4 rounded-lg shadow-lg border">
                                                    <p className="font-bold">{data.name}</p>
                                                    <p className="text-sm text-blue-600">{data.value}%</p>
                                                    <p className="text-sm text-gray-600">{data.description}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
                {/*<Button size="lg" onClick={handleShare}>*/}
                {/*    Share Results*/}
                {/*</Button>*/}
                <Button size="lg" onClick={() => setShowShareDialog(true)}>
                    Share Results
                </Button>
                <Link href="/history">
                    <Button size="lg" variant="outline">
                        View History
                    </Button>
                </Link>
                <Link href="/">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                            resetAssessment()
                        }}
                    >
                        Start New Assessment
                    </Button>
                </Link>
                {assessmentResult.overallScore < 50 && (
                    <Link href="/resources">
                        <Button size="lg" variant="destructive">
                            Get Help
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </div>
            <ShareDialog
                open={showShareDialog}
                onOpenChange={setShowShareDialog}
                score={assessmentResult.overallScore}
                friendName={friendName || 'my friend'} // 添加默认值以防friendName为空
            />
        </div>
    )
}
