import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AssessmentResult } from '@/types/assessment'

interface HistoryState {
    assessments: AssessmentResult[];
    addAssessment: (assessment: AssessmentResult) => void;
    removeAssessment: (id: string) => void;
    clearHistory: () => void;
    getAssessment: (id: string) => AssessmentResult | undefined;
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set, get) => ({
            assessments: [],
            addAssessment: (assessment) =>
                set((state) => ({
                    assessments: [assessment, ...state.assessments].slice(0, 50) // Keep last 50 assessments
                })),
            removeAssessment: (id) =>
                set((state) => ({
                    assessments: state.assessments.filter((a) => a.id !== id)
                })),
            clearHistory: () => set({ assessments: [] }),
            getAssessment: (id) => get().assessments.find((a) => a.id === id)
        }),
        {
            name: 'friendship-assessment-history'
        }
    )
)
