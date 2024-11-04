'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'

interface ComparisonChartProps {
    data: Array<{
        date: string;
        overallScore: number;
        categoryScores: Record<string, number>;
    }>
}

export function ComparisonChart({ data }: ComparisonChartProps) {
    const chartData = data.map(assessment => ({
        date: format(new Date(assessment.date), 'MMM d'),
        score: Math.round(assessment.overallScore),
        ...Object.entries(assessment.categoryScores).reduce(
            (acc, [category, score]) => ({
                ...acc,
                [category]: Math.round(score)
            }),
            {}
        )
    }))

    const categories = Object.keys(data[0]?.categoryScores || {})
    const colors = [
        '#3b82f6',
        '#ef4444',
        '#10b981',
        '#f59e0b',
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#14b8a6',
        '#f97316',
        '#6b7280'
    ]

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="score"
                    name="Overall Score"
                    stroke="#000"
                    strokeWidth={2}
                />
                {categories.map((category, index) => (
                    <Line
                        key={category}
                        type="monotone"
                        dataKey={category}
                        name={category}
                        stroke={colors[index % colors.length]}
                        strokeDasharray="5 5"
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    )
}
