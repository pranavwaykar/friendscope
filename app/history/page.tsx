'use client'

import { useState } from 'react'
import { useHistoryStore } from '@/lib/history-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'
import { Heart, AlertTriangle, Shield } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function HistoryPage() {
    const router = useRouter()
    const { assessments, removeAssessment, clearHistory } = useHistoryStore()
    const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
    const [showClearDialog, setShowClearDialog] = useState(false)

    const getScoreColor = (score: number) => {
        if (score >= 85) return "text-green-500"
        if (score >= 70) return "text-blue-500"
        if (score >= 50) return "text-yellow-500"
        return "text-red-500"
    }

    const getScoreIcon = (score: number) => {
        if (score >= 70) return <Heart className="w-4 h-4 text-green-500" />
        if (score >= 50) return <Shield className="w-4 h-4 text-yellow-500" />
        return <AlertTriangle className="w-4 h-4 text-red-500" />
    }

    const trendData = assessments
        .slice()
        .reverse()
        .map(assessment => ({
            date: format(new Date(assessment.date), 'MMM d'),
            score: Math.round(assessment.overallScore)
        }))

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Assessment History</h1>
                <Button
                    variant="destructive"
                    onClick={() => setShowClearDialog(true)}
                    disabled={assessments.length === 0}
                >
                    Clear History
                </Button>
            </div>

            {/* Trend Chart */}
            {assessments.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Friendship Health Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* History Table */}
            {assessments.length > 0 ? (
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Friend</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assessments.map((assessment) => (
                                <TableRow key={assessment.id}>
                                    <TableCell>
                                        {format(new Date(assessment.date), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell>{assessment.friendName}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getScoreIcon(assessment.overallScore)}
                                            <span className={getScoreColor(assessment.overallScore)}>
                        {Math.round(assessment.overallScore)}%
                      </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{assessment.assessment.message}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    Actions
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() => router.push(`/results/${assessment.id}`)}
                                                >
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => removeAssessment(assessment.id)}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No assessment history yet.</p>
                    <Button
                        className="mt-4"
                        onClick={() => router.push('/assess')}
                    >
                        Start New Assessment
                    </Button>
                </div>
            )}

            {/* Clear History Dialog */}
            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Clear History</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to clear all assessment history? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowClearDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                clearHistory()
                                setShowClearDialog(false)
                            }}
                        >
                            Clear History
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
