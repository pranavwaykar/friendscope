import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";

interface MetricProps {
    data: {
        date: string
        value: number
    }[]
    title: string
    description?: string
}

export function LineMetric({ data, title, description }: MetricProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                activeDot={{
                                    r: 6,
                                    style: { fill: "#3b82f6", opacity: 0.8 }
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export function BarMetric({ data, title, description }: MetricProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar
                                dataKey="value"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
