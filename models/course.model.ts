import { Temporal } from "@js-temporal/polyfill";
export interface Course {
readonly id: string;
title: string;
capacity: number;
startDate?: Temporal.PlainDate;
}



export type CourseStatus =
    | {
        status: "DRAFT";
        createdBy: string;
        createdAt: Temporal.Instant;
    }
    | {
        status: "PUBLISHED";
        publishedAt: Temporal.Instant;
        syllabus: string;
    }
    | {
        status: "ACTIVE";
        enrolledCount: number;
        startDate: Temporal.PlainDate;
    }
    | {
        status: "ARCHIVED";
        archivedAt: Temporal.Instant;
        finalEnrollmentCount: number;
    }
    | {
        status: "CANCELLED";
        reason: string;
        cancelledAt: Temporal.Instant;
    };


 export function describeCourse(status: CourseStatus): string {
    switch (status.status) {
        case "DRAFT":
            return `Course is in draft mode, created by ${status.createdBy} at ${status.createdAt}`;

        case "PUBLISHED":
            return `Course is published, published at ${status.publishedAt}, syllabus: ${status.syllabus}`;

        case "ACTIVE":
            return `Course is active, enrolled count: ${status.enrolledCount}, start date: ${status.startDate}`;

        case "ARCHIVED":
            return `Course is archived, archived at ${status.archivedAt}, final enrollment count: ${status.finalEnrollmentCount}`;

        case "CANCELLED":
            return `Course is cancelled, reason: ${status.reason}, cancelled at: ${status.cancelledAt}`;

        default: {
            const _check: never = status;
            throw new Error("Unknown course status");
        }
    }
}

    