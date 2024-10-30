import { create } from 'zustand'

interface Question {
    id: number
    text: string
    options: string[]
    category: string
}

interface AssessmentState {
    questions: Question[]
    currentQuestionIndex: number
    answers: Record<number, string>
    setAnswer: (questionId: number, answer: string) => void
    nextQuestion: () => void
    previousQuestion: () => void
    resetAssessment: () => void
}

const questions: Question[] = [
    { id: 1, text: "How often do you communicate with this friend?", options: ["Daily", "Weekly", "Monthly", "Rarely"], category: "Communication" },
    { id: 2, text: "How comfortable are you sharing personal information with them?", options: ["Very comfortable", "Somewhat comfortable", "Not very comfortable", "Not at all comfortable"], category: "Trust" },
    { id: 3, text: "How often do you support each other during difficult times?", options: ["Always", "Often", "Sometimes", "Rarely"], category: "Support" },
    { id: 4, text: "How well do you know this friend's family and close friends?", options: ["Very well", "Somewhat", "Not very well", "Not at all"], category: "Intimacy" },
    { id: 5, text: "How often do you engage in activities or hobbies together?", options: ["Very often", "Sometimes", "Rarely", "Never"], category: "Shared Experiences" },
    { id: 6, text: "How well does this friend respect your boundaries?", options: ["Always", "Usually", "Sometimes", "Rarely"], category: "Respect" },
    { id: 7, text: "How often do you have disagreements or conflicts?", options: ["Rarely", "Sometimes", "Often", "Very often"], category: "Conflict Resolution" },
    { id: 8, text: "How likely are you to ask this friend for advice on important decisions?", options: ["Very likely", "Somewhat likely", "Not very likely", "Not at all likely"], category: "Trust" },
    { id: 9, text: "How well does this friend understand your emotional needs?", options: ["Very well", "Somewhat", "Not very well", "Not at all"], category: "Emotional Intelligence" },
    { id: 10, text: "How often do you feel appreciated by this friend?", options: ["Always", "Often", "Sometimes", "Rarely"], category: "Appreciation" },
]

export const useAssessmentStore = create<AssessmentState>((set) => ({
    questions,
    currentQuestionIndex: 0,
    answers: {},
    setAnswer: (questionId, answer) => set((state) => ({
        answers: { ...state.answers, [questionId]: answer }
    })),
    nextQuestion: () => set((state) => ({
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
    })),
    previousQuestion: () => set((state) => ({
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
    })),
    resetAssessment: () => set({ currentQuestionIndex: 0, answers: {} }),
}))
