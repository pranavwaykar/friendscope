// 'use client'
//
// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from '@/components/ui/label'
// import { Progress } from '@/components/ui/progress'
//
// const questions = [
//     {
//         id: 1,
//         text: "How often do you communicate with this friend?",
//         options: ["Daily", "Weekly", "Monthly", "Rarely"]
//     },
//     {
//         id: 2,
//         text: "How comfortable are you sharing personal information with them?",
//         options: ["Very comfortable", "Somewhat comfortable", "Not very comfortable", "Not at all comfortable"]
//     },
//     // Add more questions here
// ]
//
// export default function AssessmentPage() {
//     const [currentQuestion, setCurrentQuestion] = useState(0)
//     const [answers, setAnswers] = useState<Record<number, string>>({})
//
//     const handleAnswer = (answer: string) => {
//         setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }))
//     }
//
//     const handleNext = () => {
//         if (currentQuestion < questions.length - 1) {
//             setCurrentQuestion(prev => prev + 1)
//         }
//     }
//
//     const handlePrevious = () => {
//         if (currentQuestion > 0) {
//             setCurrentQuestion(prev => prev - 1)
//         }
//     }
//
//     const progress = ((currentQuestion + 1) / questions.length) * 100
//
//     return (
//         <div className="container mx-auto px-4 py-16 max-w-2xl">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Friendship Assessment</CardTitle>
//                     <Progress value={progress} className="w-full" />
//                 </CardHeader>
//                 <CardContent>
//                     <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].text}</h2>
//                     <RadioGroup onValueChange={handleAnswer} value={answers[questions[currentQuestion].id]}>
//                         {questions[currentQuestion].options.map((option, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                                 <RadioGroupItem value={option} id={`option-${index}`} />
//                                 <Label htmlFor={`option-${index}`}>{option}</Label>
//                             </div>
//                         ))}
//                     </RadioGroup>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                     <Button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</Button>
//                     <Button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
//                         {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }



// 'use client'
//
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from '@/components/ui/label'
// import { Progress } from '@/components/ui/progress'
// import { useAssessmentStore } from '@/lib/store'
//
// export default function AssessmentPage() {
//     const router = useRouter()
//     const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion, previousQuestion, resetAssessment } = useAssessmentStore()
//
//     useEffect(() => {
//         resetAssessment()
//     }, [resetAssessment])
//
//     const currentQuestion = questions[currentQuestionIndex]
//     const progress = ((currentQuestionIndex + 1) / questions.length) * 100
//
//     const handleAnswer = (answer: string) => {
//         setAnswer(currentQuestion.id, answer)
//     }
//
//     const handleNext = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             nextQuestion()
//         } else {
//             router.push('/results')
//         }
//     }
//
//     return (
//         <div className="container mx-auto px-4 py-16 max-w-2xl">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Friendship Assessment</CardTitle>
//                     <Progress value={progress} className="w-full" />
//                 </CardHeader>
//                 <CardContent>
//                     <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
//                     <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion.id]}>
//                         {currentQuestion.options.map((option, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                                 <RadioGroupItem value={option} id={`option-${index}`} />
//                                 <Label htmlFor={`option-${index}`}>{option}</Label>
//                             </div>
//                         ))}
//                     </RadioGroup>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                     <Button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
//                     <Button onClick={handleNext}>
//                         {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }



'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useAssessmentStore } from '@/lib/store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from "@/hooks/use-toast"

export default function AssessmentPage() {
    const router = useRouter()
    const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion, previousQuestion, resetAssessment } = useAssessmentStore()
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()

    useEffect(() => {
        resetAssessment()
        setIsLoading(false)
    }, [resetAssessment])

    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    const handleAnswer = (answer: string) => {
        setAnswer(currentQuestion.id, answer)
    }

    const handleNext = () => {
        if (!answers[currentQuestion.id]) {
            toast({
                title: "Please select an answer",
                description: "You need to choose an option before moving to the next question.",
                variant: "destructive",
            })
            return
        }

        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion()
        } else {
            router.push('/results')
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Friendship Assessment</CardTitle>
                    <Progress value={progress} className="w-full" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
                    <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion.id]}>
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center  space-x-2">
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`}>{option}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                    <Button onClick={handleNext}>
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
