import { create } from 'zustand'
import { questions } from './assessment'

interface AssessmentState {
    questions: typeof questions;
    currentQuestionIndex: number;
    answers: Record<number, string>;
    setAnswer: (questionId: number, answer: string) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    resetAssessment: () => void;
}

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
