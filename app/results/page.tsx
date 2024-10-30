// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
//
// export default function ResultsPage() {
//     // This is a placeholder. In a real application, you would calculate the score based on the user's answers.
//     const score = 75
//
//     return (
//         <div className="container mx-auto px-4 py-16 max-w-2xl">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Your Friendship Score</CardTitle>
//                     <CardDescription>Based on your responses to the assessment</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="text-center">
//                         <div className="text-6xl font-bold text-primary mb-4">{score}%</div>
//                         <p className="text-xl mb-8">Your friendship is strong with room for growth!</p>
//                         <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
//                         <ul className="list-disc list-inside text-left mb-8">
//                             <li>Communicate more frequently</li>
//                             <li>Share more personal experiences</li>
//                             <li>Plan regular activities together</li>
//                         </ul>
//                         <Link href="/">
//                             <Button>Start New Assessment</Button>
//                         </Link>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }





// 'use client'
//
// import { useEffect, useState } from 'react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { useAssessmentStore } from '@/lib/store'
// import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
// import { LoadingSpinner } from '@/components/ui/loading-spinner'
// import { useRouter } from 'next/navigation'
// import { useToast } from "@/hooks/use-toast"
//
// const calculateCategoryScore = (answers: Record<number, string>, category: string, questions: any[]) => {
//     const categoryQuestions = questions.filter(q => q.category === category)
//     const categoryAnswers = categoryQuestions.map(q => answers[q.id])
//     const score = categoryAnswers.reduce((acc, answer) => {
//         const question = categoryQuestions.find(q => q.options.includes(answer))
//         if (!question) return acc
//         const index = question.options.indexOf(answer)
//         return acc + (4 - index) / 4 * 100
//     }, 0)
//     return score / categoryQuestions.length
// }
//
// const getInsights = (scores: Record<string, number>) => {
//     const insights = []
//     if (scores['Communication'] < 60) insights.push("Try to communicate more frequently with your friend.")
//     if (scores['Trust'] < 60) insights.push("Work on building more trust in your friendship.")
//     if (scores['Support'] < 60) insights.push("Try to be more supportive during difficult times.")
//     if (scores['Intimacy'] < 60) insights.push("Consider getting to know your friend's close circle better.")
//     if (scores['Shared Experiences'] < 60) insights.push("Try to engage in more activities together.")
//     if (scores['Respect'] < 60) insights.push("Ensure you're respecting each other's boundaries.")
//     if (scores['Conflict Resolution'] < 60) insights.push("Work on resolving conflicts more effectively.")
//     if (scores['Emotional Intelligence'] < 60) insights.push("Try to understand your friend's emotional needs better.")
//     if (scores['Appreciation'] < 60) insights.push("Show more appreciation for your friend.")
//     return insights
// }
//
// export default function ResultsPage() {
//
//     const router = useRouter()
//     const { answers, questions } = useAssessmentStore()
//     const [scores, setScores] = useState<Record<string, number>>({})
//     const [isLoading, setIsLoading] = useState(true)
//     const { toast } = useToast()
//
//
//     useEffect(() => {
//
//         if (Object.keys(answers).length === 0) {
//             router.push('/assess')
//             return
//         }
//
//         const categories = Array.from(new Set(questions.map(q => q.category)))
//         const newScores = categories.reduce((acc, category) => {
//             acc[category] = calculateCategoryScore(answers, category, questions)
//             return acc
//         }, {} as Record<string, number>)
//         setScores(newScores)
//         setIsLoading(false)
//     }, [answers, questions, router])
//
//
//     const handleShare = () => {
//         const shareUrl = window.location.href
//         navigator.clipboard.writeText(shareUrl).then(() => {
//             toast({
//                 title: "Link Copied!",
//                 description: "The link to your results has been copied to your clipboard.",
//             })
//         }).catch(() => {
//             toast({
//                 title: "Failed to copy",
//                 description: "An error occurred while trying to copy the link.",
//                 variant: "destructive",
//             })
//         })
//     }
//
//
//
//     if (isLoading) {
//         return (
//             <div className="container mx-auto px-4 py-16 flex justify-center items-center">
//                 <LoadingSpinner />
//             </div>
//         )
//     }
//
//
//     const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length
//     const insights = getInsights(scores)
//
//     const data = Object.entries(scores).map(([name, value]) => ({ name, value }))
//
//
//     return (
//         <div className="container mx-auto px-4 py-16 max-w-4xl">
//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle className="text-3xl font-bold text-center">Your Friendship Score</CardTitle>
//                     <CardDescription className="text-center">Based on your responses to the assessment</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="text-center">
//                         <div className="text-6xl font-bold text-primary mb-4">{overallScore.toFixed(0)}%</div>
//                         <p className="text-xl mb-8">
//                             {overallScore >= 80 ? "Your friendship is strong and supportive!" :
//                                 overallScore >= 60 ? "Your friendship has a good foundation with room for growth." :
//                                     overallScore >= 40 ? "Your friendship could benefit from more attention and effort." :
//                                         "This friendship might need significant work to improve."}
//                         </p>
//                     </div>
//                 </CardContent>
//             </Card>
//
//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle>Friendship Aspects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="w-full h-[400px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <RadarChart data={data}>
//                                 <PolarGrid/>
//                                 <PolarAngleAxis dataKey="name"/>
//                                 <Radar name="Score" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6}/>
//                             </RadarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </CardContent>
//             </Card>
//
//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle>Insights & Recommendations</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <ul className="list-disc list-inside space-y-2">
//                         {insights.map((insight, index) => (
//                             <li key={index}>{insight}</li>
//                         ))}
//                     </ul>
//                 </CardContent>
//             </Card>
//
//             <div className="text-center">
//                 <Link href="/">
//                     <Button size="lg">Start New Assessment</Button>
//                 </Link>
//             </div>
//
//
//             <div className="text-center space-x-4">
//                 <Button size="lg" onClick={handleShare}>Share Results</Button>
//                 <Link href="/">
//                     <Button size="lg" variant="outline">Start New Assessment</Button>
//                 </Link>
//             </div>
//
//         </div>
//     )
// }



'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAssessmentStore } from '@/lib/store'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"

const calculateCategoryScore = (answers: Record<number, string>, category: string, questions: any[]) => {
    const categoryQuestions = questions.filter(q => q.category === category)
    const categoryAnswers = categoryQuestions.map(q => answers[q.id])
    const score = categoryAnswers.reduce((acc, answer) => {
        const question = categoryQuestions.find(q => q.options.includes(answer))
        if (!question) return acc
        const index = question.options.indexOf(answer)
        return acc + (4 - index) / 4 * 100
    }, 0)
    return score / categoryQuestions.length
}

const getInsights = (scores: Record<string, number>) => {
    const insights = []
    if (scores['Communication'] < 60) insights.push("Try to communicate more frequently with your friend.")
    if (scores['Trust'] < 60) insights.push("Work on building more trust in your friendship.")
    if (scores['Support'] < 60) insights.push("Try to be more supportive during difficult times.")
    if (scores['Intimacy'] < 60) insights.push("Consider getting to know your friend's close circle better.")
    if (scores['Shared Experiences'] < 60) insights.push("Try to engage in more activities together.")
    if (scores['Respect'] < 60) insights.push("Ensure you're respecting each other's boundaries.")
    if (scores['Conflict Resolution'] < 60) insights.push("Work on resolving conflicts more effectively.")
    if (scores['Emotional Intelligence'] < 60) insights.push("Try to understand your friend's emotional needs better.")
    if (scores['Appreciation'] < 60) insights.push("Show more appreciation for your friend.")
    return insights
}

export default function ResultsPage() {
    const router = useRouter()
    const { answers, questions } = useAssessmentStore()
    const [scores, setScores] = useState<Record<string, number>>({})
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()

    useEffect(() => {
        if (Object.keys(answers).length === 0) {
            router.push('/assess')
            return
        }

        const categories = Array.from(new Set(questions.map(q => q.category)))
        const newScores = categories.reduce((acc, category) => {
            acc[category] = calculateCategoryScore(answers, category, questions)
            return acc
        }, {} as Record<string, number>)
        setScores(newScores)
        setIsLoading(false)
    }, [answers, questions, router])

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

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length
    const insights = getInsights(scores)

    const data = Object.entries(scores).map(([name, value]) => ({ name, value: Math.round(value) }))

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Your Friendship Score</CardTitle>
                    <CardDescription className="text-center">Based on your responses to the assessment</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-4">{Math.round(overallScore)}%</div>
                        <p className="text-xl mb-8">
                            {overallScore >= 80 ? "Your friendship is strong and supportive!" :
                                overallScore >= 60 ? "Your friendship has a good foundation with room for growth." :
                                    overallScore >= 40 ? "Your friendship could benefit from more attention and effort." :
                                        "This friendship might need significant work to improve."}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Friendship Aspects</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <Radar name="Score" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                <Tooltip formatter={(value) => `${value}%`} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                        {insights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <div className="text-center space-x-4">
                <Button size="lg" onClick={handleShare}>Share Results</Button>
                <Link href="/">
                    <Button size="lg" variant="outline">Start New Assessment</Button>
                </Link>
            </div>
        </div>
    )
}
