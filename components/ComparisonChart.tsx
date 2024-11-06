'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ComparisonChartProps {
    data: Array<{
        date: string;
        overallScore: number;
        categoryScores: Record<string, number>;
    }>
}

export function ComparisonChart({ data }: ComparisonChartProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const categories = Object.keys(data[0]?.categoryScores || {})
    const dates = data.map(item => format(new Date(item.date), 'MMM d'))

    const series = [
        {
            name: 'Overall Score',
            data: data.map(item => Math.round(item.overallScore))
        },
        ...categories.map(category => ({
            name: category,
            data: data.map(item => Math.round(item.categoryScores[category]))
        }))
    ]

    const options = {
        chart: {
            type: 'line' as const,
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: dates
        },
        yaxis: {
            min: 0,
            max: 100
        },
        stroke: {
            width: 2,
            curve: 'smooth' as const,
            dashArray: series.map((_, index) => index === 0 ? 0 : 5)
        },
        colors: [
            '#000',
            '#3b82f6',
            '#ef4444',
            '#10b981',
            '#f59e0b',
            '#6366f1',
            '#8b5cf6',
            '#ec4899',
            '#14b8a6',
            '#f97316'
        ],
        tooltip: {
            y: {
                formatter: (value: number) => `${value}%`
            }
        },
        legend: {
            position: 'bottom' as const
        }
    }

    if (!mounted) return <div className="h-[300px] w-full bg-gray-100 animate-pulse" />

    return (
        <div className="w-full h-[300px]">
            <Chart
                options={options}
                series={series}
                type="line"
                height="100%"
            />
        </div>
    )
}
