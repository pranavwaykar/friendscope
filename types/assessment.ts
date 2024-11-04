export interface AssessmentResult {
    id: string;
    date: string;
    friendName: string;
    notes: string;
    overallScore: number;
    categoryScores: Record<string, number>;
    assessment: {
        threshold: number;
        message: string;
        recommendation: string;
    };
}
