interface Question {
    id: number;
    text: string;
    options: string[];
    category: string;
    weight: number;
}

// 标准化选项,确保一致性
const standardOptions = [
    "Strongly Agree",
    "Agree",
    "Somewhat Agree",
    "Neutral",
    "Somewhat Disagree",
    "Disagree",
    "Strongly Disagree"
]

export const questions: Question[] = [
    // Trust & Honesty (核心基础)
    {
        id: 1,
        text: "I can trust this friend with sensitive personal information without worrying about it being shared with others.",
        options: standardOptions,
        category: "Trust & Honesty",
        weight: 1.5
    },
    {
        id: 2,
        text: "This friend has been consistently honest with me, even in difficult situations.",
        options: standardOptions,
        category: "Trust & Honesty",
        weight: 1.5
    },

    // Emotional Support (情感支持)
    {
        id: 3,
        text: "When I'm going through tough times, this friend shows genuine concern and offers meaningful support.",
        options: standardOptions,
        category: "Emotional Support",
        weight: 1.2
    },
    {
        id: 4,
        text: "This friend celebrates my successes without showing signs of jealousy or competition.",
        options: standardOptions,
        category: "Emotional Support",
        weight: 1.2
    },

    // Communication (沟通质量)
    {
        id: 5,
        text: "Our conversations go beyond small talk and include meaningful exchanges about personal growth and challenges.",
        options: standardOptions,
        category: "Communication",
        weight: 1.0
    },
    {
        id: 6,
        text: "We can have respectful discussions even when we disagree on important topics.",
        options: standardOptions,
        category: "Communication",
        weight: 1.0
    },

    // Boundaries (边界感)
    {
        id: 7,
        text: "This friend respects my personal boundaries and doesn't make me feel guilty for saying 'no'.",
        options: standardOptions,
        category: "Boundaries",
        weight: 1.3
    },
    {
        id: 8,
        text: "I feel comfortable setting limits in our friendship without fear of negative consequences.",
        options: standardOptions,
        category: "Boundaries",
        weight: 1.3
    },

    // Reciprocity (互惠性)
    {
        id: 9,
        text: "Our friendship feels balanced in terms of giving and receiving support.",
        options: standardOptions,
        category: "Reciprocity",
        weight: 1.1
    },
    {
        id: 10,
        text: "This friend makes an effort to maintain our friendship, not just when they need something.",
        options: standardOptions,
        category: "Reciprocity",
        weight: 1.1
    },

    // Conflict Resolution (冲突处理)
    {
        id: 11,
        text: "When conflicts arise, this friend is willing to discuss issues calmly and work towards resolution.",
        options: standardOptions,
        category: "Conflict Resolution",
        weight: 1.2
    },
    {
        id: 12,
        text: "Past disagreements have been resolved in a way that strengthened our friendship.",
        options: standardOptions,
        category: "Conflict Resolution",
        weight: 1.2
    },

    // Growth & Development (成长空间)
    {
        id: 13,
        text: "This friendship encourages personal growth and supports my goals and aspirations.",
        options: standardOptions,
        category: "Growth & Development",
        weight: 1.0
    },
    {
        id: 14,
        text: "I feel inspired and motivated after spending time with this friend.",
        options: standardOptions,
        category: "Growth & Development",
        weight: 1.0
    },

    // Values Alignment (价值观契合)
    {
        id: 15,
        text: "Our core values and ethical principles are generally aligned.",
        options: standardOptions,
        category: "Values Alignment",
        weight: 1.4
    },
    {
        id: 16,
        text: "This friend's behavior consistently reflects the values they claim to hold.",
        options: standardOptions,
        category: "Values Alignment",
        weight: 1.4
    },

    // Respect & Recognition (尊重认可)
    {
        id: 17,
        text: "This friend shows genuine respect for my opinions and life choices, even when different from theirs.",
        options: standardOptions,
        category: "Respect & Recognition",
        weight: 1.2
    },
    {
        id: 18,
        text: "I feel valued and appreciated in this friendship, not taken for granted.",
        options: standardOptions,
        category: "Respect & Recognition",
        weight: 1.2
    },

    // Reliability (可靠性)
    {
        id: 19,
        text: "This friend follows through on commitments and keeps their promises.",
        options: standardOptions,
        category: "Reliability",
        weight: 1.3
    },
    {
        id: 20,
        text: "I can count on this friend to be there for me in times of real need.",
        options: standardOptions,
        category: "Reliability",
        weight: 1.3
    }
];

export const calculateScores = (answers: Record<number, string>) => {
    const categoryScores: Record<string, number[]> = {
        "Trust & Honesty": [],
        "Emotional Support": [],
        "Communication": [],
        "Boundaries": [],
        "Reciprocity": [],
        "Conflict Resolution": [],
        "Growth & Development": [],
        "Values Alignment": [],
        "Respect & Recognition": [],
        "Reliability": []
    }

    // 计算每个类别的分数
    questions.forEach(question => {
        if (answers[question.id]) {
            const optionIndex = question.options.indexOf(answers[question.id])
            const score = ((question.options.length - 1 - optionIndex) / (question.options.length - 1)) * 100 * question.weight
            if (categoryScores[question.category]) {
                categoryScores[question.category].push(score)
            }
        }
    })

    // 计算每个类别的平均分
    const categoryAverages = Object.entries(categoryScores).reduce((acc, [category, scores]) => {
        if (scores.length > 0) {
            acc[category] = scores.reduce((sum, score) => sum + score, 0) / scores.length
        } else {
            acc[category] = 0
        }
        return acc
    }, {} as Record<string, number>)

    // 计算总分
    const overallScore = Object.values(categoryAverages).reduce((sum, score) => sum + score, 0) /
        Object.keys(categoryAverages).length

    return {
        categoryScores: categoryAverages,
        overallScore,
        assessment: getHealthAssessment(overallScore)
    }
}

export const healthAssessment = {
    excellent: {
        threshold: 85,
        message: "This is a highly healthy and valuable friendship.",
        recommendation: "Continue nurturing this meaningful connection."
    },
    good: {
        threshold: 70,
        message: "This is a generally healthy friendship with room for improvement.",
        recommendation: "Address specific concerns while appreciating the positive aspects."
    },
    concerning: {
        threshold: 50,
        message: "There are significant concerns in this friendship.",
        recommendation: "Consider having an honest discussion about your concerns."
    },
    unhealthy: {
        threshold: 30,
        message: "This friendship shows signs of being unhealthy.",
        recommendation: "Consider whether this friendship is beneficial to your well-being."
    },
    toxic: {
        threshold: 0,
        message: "This relationship shows signs of being toxic.",
        recommendation: "For your well-being, consider ending this friendship."
    }
}

export const getHealthAssessment = (score: number) => {
    if (score >= healthAssessment.excellent.threshold) return healthAssessment.excellent
    if (score >= healthAssessment.good.threshold) return healthAssessment.good
    if (score >= healthAssessment.concerning.threshold) return healthAssessment.concerning
    if (score >= healthAssessment.unhealthy.threshold) return healthAssessment.unhealthy
    return healthAssessment.toxic
}

export const getCategoryDescription = (category: string, score: number) => {
    const descriptions: Record<string, { good: string; bad: string }> = {
        "Trust & Honesty": {
            good: "Strong foundation of trust and honesty",
            bad: "Significant trust issues need attention"
        },
        "Emotional Support": {
            good: "Excellent emotional support and understanding",
            bad: "Lacks emotional depth and support"
        },
        "Communication": {
            good: "Open and effective communication",
            bad: "Communication barriers present"
        },
        "Boundaries": {
            good: "Healthy boundaries are maintained",
            bad: "Boundary issues need addressing"
        },
        "Reciprocity": {
            good: "Well-balanced give and take",
            bad: "Imbalanced relationship dynamic"
        },
        "Conflict Resolution": {
            good: "Constructive conflict management",
            bad: "Poor conflict resolution patterns"
        },
        "Growth & Development": {
            good: "Promotes personal growth",
            bad: "Limited growth opportunity"
        },
        "Values Alignment": {
            good: "Strong alignment of core values",
            bad: "Significant value misalignment"
        },
        "Respect & Recognition": {
            good: "High level of mutual respect",
            bad: "Lack of respect or recognition"
        },
        "Reliability": {
            good: "Consistently reliable and dependable",
            bad: "Unreliable behavior patterns"
        }
    }

    return score >= 70 ? descriptions[category]?.good : descriptions[category]?.bad
}
