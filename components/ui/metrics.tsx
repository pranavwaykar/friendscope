// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";
//
// interface MetricProps {
//     data: {
//         date: string
//         value: number
//     }[]
//     title: string
//     description?: string
// }
//
// export function LineMetric({ data, title, description }: MetricProps) {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>{title}</CardTitle>
//                 {description && <CardDescription>{description}</CardDescription>}
//             </CardHeader>
//             <CardContent>
//                 <div className="h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={data}>
//                             <Line
//                                 type="monotone"
//                                 dataKey="value"
//                                 stroke="#3b82f6"
//                                 strokeWidth={2}
//                                 activeDot={{
//                                     r: 6,
//                                     style: { fill: "#3b82f6", opacity: 0.8 }
//                                 }}
//                             />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }
//
// export function BarMetric({ data, title, description }: MetricProps) {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>{title}</CardTitle>
//                 {description && <CardDescription>{description}</CardDescription>}
//             </CardHeader>
//             <CardContent>
//                 <div className="h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={data}>
//                             <Bar
//                                 dataKey="value"
//                                 fill="#3b82f6"
//                                 radius={[4, 4, 0, 0]}
//                             />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

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
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                label={{
                                    value: 'Categories',
                                    position: 'insideBottom',
                                    offset: -5
                                }}
                            />
                            <YAxis
                                label={{
                                    value: 'Score (%)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: 10
                                }}
                                domain={[0, 100]}
                            />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                name="Score"
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
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border">
                    <p className="font-bold">{label}</p>
                    <p className="text-blue-600">{`Score: ${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full">
            <CardHeader className="px-2 sm:px-6">
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            {/* 移除 CardContent 的默认内边距 */}
            <CardContent className="p-0">
                {/* 使用外部容器控制整体布局 */}
                <div className="w-full px-2 sm:px-6 pb-2">
                    {/* 图表容器 */}
                    <div className="h-[500px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 65,
                                    bottom: 90
                                }}
                                barSize={40}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal={true}
                                    vertical={true}
                                />
                                <XAxis
                                    dataKey="date"
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                    height={90}
                                    tick={{
                                        fontSize: 12,
                                        fill: '#666',
                                        fontWeight: '500'
                                    }}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    label={{
                                        value: 'Score (%)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -5,
                                        fill: '#666'
                                    }}
                                    tick={{
                                        fontSize: 12,
                                        fill: '#666'
                                    }}
                                    width={60}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: '20px'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    name="Category Score"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    animationBegin={0}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
