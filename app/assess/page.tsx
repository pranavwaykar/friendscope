// 'use client'
//
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from '@/components/ui/label'
// import { Progress } from '@/components/ui/progress'
// import { useAssessmentStore } from '@/lib/store'
// import { LoadingSpinner } from '@/components/ui/loading-spinner'
// import { useToast } from "@/hooks/use-toast"
//
// const QuestionOption = ({ value, label, id }: { value: string; label: string; id: string }) => (
//     <div className="flex-1 text-center">
//         <div className="flex flex-col items-center gap-2">
//             <RadioGroupItem value={value} id={id} className="h-6 w-6" />
//             <Label htmlFor={id} className="cursor-pointer text-sm text-muted-foreground">
//                 {label}
//             </Label>
//         </div>
//     </div>
// )
//
// export default function AssessmentPage() {
//     const router = useRouter()
//     const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion, previousQuestion, resetAssessment } = useAssessmentStore()
//     const [isLoading, setIsLoading] = useState(true)
//     const { toast } = useToast()
//     const [currentAnswer, setCurrentAnswer] = useState<string>('')
//
//     useEffect(() => {
//         resetAssessment()
//         setIsLoading(false)
//     }, [resetAssessment])
//
//     useEffect(() => {
//         // 当切换问题时，更新currentAnswer为当前问题的答案
//         const currentQuestion = questions[currentQuestionIndex]
//         setCurrentAnswer(answers[currentQuestion.id] || '')
//     }, [currentQuestionIndex, answers, questions])
//
//     const currentQuestion = questions[currentQuestionIndex]
//     const progress = ((currentQuestionIndex + 1) / questions.length) * 100
//
//     const handleAnswer = (answer: string) => {
//         setCurrentAnswer(answer)
//         setAnswer(currentQuestion.id, answer)
//     }
//
//     const handleNext = () => {
//         if (!currentAnswer) {
//             toast({
//                 title: "Please select an answer",
//                 description: "You need to choose an option before moving to the next question.",
//                 variant: "destructive",
//             })
//             return
//         }
//
//         if (currentQuestionIndex < questions.length - 1) {
//             nextQuestion()
//         } else {
//             router.push('/results')
//         }
//     }
//
//     if (isLoading) {
//         return (
//             <div className="container mx-auto px-4 py-16 flex justify-center items-center">
//                 <LoadingSpinner />
//             </div>
//         )
//     }
//
//     return (
//         <div className="container mx-auto px-4 py-8 max-w-3xl">
//             <Card className="border-0 shadow-none">
//                 <CardHeader className="text-center mb-8">
//                     <CardTitle className="text-2xl font-bold mb-2">Friendship Assessment</CardTitle>
//                     <Progress value={progress} className="w-full h-2" />
//                     <p className="text-sm text-muted-foreground mt-2">
//                         Question {currentQuestionIndex + 1} of {questions.length}
//                     </p>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="space-y-8">
//                         <h2 className="text-xl text-center mb-8">{currentQuestion.text}</h2>
//                         <RadioGroup
//                             value={currentAnswer}
//                             onValueChange={handleAnswer}
//                             className="grid grid-cols-2 gap-8 md:flex md:gap-4"
//                         >
//                             <div className="flex justify-between items-center w-full">
//                                 <div className="text-sm font-medium text-primary">Agree</div>
//                                 <div className="flex-1 flex justify-between px-4">
//                                     {currentQuestion.options.map((option, index) => (
//                                         <QuestionOption
//                                             key={index}
//                                             value={option}
//                                             label={option}
//                                             id={`option-${index}`}
//                                         />
//                                     ))}
//                                 </div>
//                                 <div className="text-sm font-medium text-primary">Disagree</div>
//                             </div>
//                         </RadioGroup>
//                     </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-between mt-8">
//                     <Button
//                         onClick={previousQuestion}
//                         disabled={currentQuestionIndex === 0}
//                         variant="outline"
//                     >
//                         Previous
//                     </Button>
//                     <Button onClick={handleNext}>
//                         {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/lib/store';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// 自定义问题选项组件
const QuestionOption = ({ value, label, id, isSelected }: {
    value: string;
    label: string;
    id: string;
    isSelected: boolean;
}) => (
    <motion.div
        className="flex-1 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="flex flex-col items-center gap-2">
            <div className="relative">
                <RadioGroupItem
                    value={value}
                    id={id}
                    className={`h-6 w-6 transition-all duration-300 ${
                        isSelected ? 'scale-110 border-primary' : ''
                    }`}
                />
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                    >
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                    </motion.div>
                )}
            </div>
            <Label
                htmlFor={id}
                className={`cursor-pointer text-sm transition-colors duration-300 ${
                    isSelected ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
            >
                {label}
            </Label>
        </div>
    </motion.div>
);

export default function AssessmentPage() {
    const router = useRouter();
    const { questions, currentQuestionIndex, answers, setAnswer, nextQuestion, resetAssessment } = useAssessmentStore();
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [showSeeResults, setShowSeeResults] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        resetAssessment();
        setIsLoading(false);
    }, [resetAssessment]);

    useEffect(() => {
        // 重置选中的答案当切换到新问题时
        setSelectedAnswer('');

        // 检查是否所有问题都已回答
        if (currentQuestionIndex === questions.length - 1) {
            const allAnswered = questions.every(q => answers[q.id]);
            if (allAnswered) {
                setShowSeeResults(true);
            }
        }
    }, [currentQuestionIndex, questions, answers]);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setAnswer(currentQuestion.id, answer);

        // 添加一个短暂的延迟以显示选择效果
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            }
        }, 500);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center mb-8">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Friendship Assessment
                        </CardTitle>
                        <div className="relative mt-4">
                            <Progress value={progress} className="h-2" />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                            >
                                <span className="text-sm text-muted-foreground">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </span>
                            </motion.div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <h2 className="text-xl text-center mb-8">
                                    {currentQuestion.text}
                                </h2>
                                <RadioGroup
                                    value={selectedAnswer}
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
                                                    isSelected={selectedAnswer === option}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-sm font-medium text-primary">Disagree</div>
                                    </div>
                                </RadioGroup>
                            </motion.div>
                        </AnimatePresence>

                        {/* See Results Button */}
                        <AnimatePresence>
                            {showSeeResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="mt-12 flex justify-center"
                                >
                                    <Button
                                        onClick={() => router.push('/results')}
                                        className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 transition-all duration-300 px-8 py-6 text-lg"
                                    >
                                        See Your Results
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
