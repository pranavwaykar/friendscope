'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useAssessmentStore } from '@/lib/store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from "@/hooks/use-toast"

const QuestionOption = ({ value, label, id }: { value: string; label: string; id: string }) => (
    <div className="flex-1 text-center">
        <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value={value} id={id} className="h-6 w-6" />
            <Label htmlFor={id} className="cursor-pointer text-sm text-muted-foreground">
                {label}
            </Label>
        </div>
    </div>
)

export default function AssessmentPage() {
    const router = useRouter()
    const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion, previousQuestion, resetAssessment } = useAssessmentStore()
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
    const [currentAnswer, setCurrentAnswer] = useState<string>('')

    useEffect(() => {
        resetAssessment()
        setIsLoading(false)
    }, [resetAssessment])

    useEffect(() => {
        // 当切换问题时，更新currentAnswer为当前问题的答案
        const currentQuestion = questions[currentQuestionIndex]
        setCurrentAnswer(answers[currentQuestion.id] || '')
    }, [currentQuestionIndex, answers, questions])

    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    const handleAnswer = (answer: string) => {
        setCurrentAnswer(answer)
        setAnswer(currentQuestion.id, answer)
    }

    const handleNext = () => {
        if (!currentAnswer) {
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
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Card className="border-0 shadow-none">
                <CardHeader className="text-center mb-8">
                    <CardTitle className="text-2xl font-bold mb-2">Friendship Assessment</CardTitle>
                    <Progress value={progress} className="w-full h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        <h2 className="text-xl text-center mb-8">{currentQuestion.text}</h2>
                        <RadioGroup
                            value={currentAnswer}
                            onValueChange={handleAnswer}
                            className="grid grid-cols-2 gap-8 md:flex md:gap-4"
                        >
                            <div className="flex justify-between items-center w-full">
                                <div className="text-sm font-medium text-primary">Agree</div>
                                <div className="flex-1 flex justify-between px-4">
                                    {currentQuestion.options.map((option, index) => (
                                        <QuestionOption
                                            key={index}
                                            value={option}
                                            label={option}
                                            id={`option-${index}`}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm font-medium text-primary">Disagree</div>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between mt-8">
                    <Button
                        onClick={previousQuestion}
                        disabled={currentQuestionIndex === 0}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <Button onClick={handleNext}>
                        {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
