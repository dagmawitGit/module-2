// models/assessment.model.ts



export interface Quiz {
    readonly id: string;
    kind: "quiz";
    title: string;
    correctAnswers: number;
    totalQuestions: number;
}

export interface LabAssignment {
    readonly id: string;
    kind: "lab";
    title: string;
    functionalityScore: number;
    codeQualityScore: number;
}

export type AssessmentItem = Quiz | LabAssignment;


// Calculate grade based on assessment type
export function calculateGrade(item: AssessmentItem): number {

    switch (item.kind) {

        case "quiz":

            // Prevent division by zero
            if (item.totalQuestions === 0) {
                return 0;
            }

            return Math.round(
                (item.correctAnswers / item.totalQuestions) * 100
            );

        case "lab":

            return Math.round(
                item.functionalityScore * 0.7 +
                item.codeQualityScore * 0.3
            );
    }
}