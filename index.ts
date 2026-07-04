import { Temporal } from "@js-temporal/polyfill";
import { Student } from "./models/student.model";
import {
    AssessmentItem,
    calculateGrade
} from "./models/assessment.model";
import {
    EnrollmentStatus,
    describeEnrollment
} from "./models/enrollment.model";

import {
    isStudent
} from "./models/student.model";

import {
    Course,
    CourseStatus,
    describeCourse
} from "./models/course.model";
import { ApiResponse, renderResponse } from "./models/api-response.model";

const student: Student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant()
};

function processStudent(raw: unknown) {

    if (isStudent(raw)) {

        const gpaDisplay =
            raw.gpa?.toFixed(2)
            ?? "Not yet graded";

        console.log(
            `Student ${raw.name} GPA: ${gpaDisplay}`
        );

    } else {

        console.error(
            "Invalid student data received"
        );
    }
}
console.log();
console.log("=======Exercise-2=======");

processStudent({
    id: "STU-001",
    name: "Hana",
    gpa: 3.7
});
processStudent(42);


console.log();
console.log("======Exercise-3=======");

export function parseStudent(
    raw: unknown
): Student {

    if (
        typeof raw !== "object"
        || raw === null
    ) {

        throw new TypeError(
            `Expected an object, received ${
                raw === null
                    ? "null"
                    : typeof raw
            }`
        );
    }

    const obj =
        raw as Record<string, unknown>;

    if (typeof obj.id !== "string") {

        throw new TypeError(
            `Expected id to be a string, received ${typeof obj.id}`
        );
    }

    if (typeof obj.name !== "string") {

        throw new TypeError(
            `Expected name to be a string, received ${typeof obj.name}`
        );
    }

    return {
        id: obj.id,
        name: obj.name,
        enrollmentDate:
            Temporal.Now.instant()
    };
}

console.log(
    parseStudent({
        id: "STU-001",
        name: "Hana",
        enrollmentDate: Temporal.Now.instant()
    
    })
);
console.log();
console.log("=======Exercise 4=======");




const quiz: AssessmentItem = {
    id: "QUIZ-001",
    kind: "quiz",
    title: "SQL Basics",
    correctAnswers: 8,
    totalQuestions: 10
};

const lab: AssessmentItem = {
    id: "LAB-001",
    kind: "lab",
    title: "REST API Project",
    functionalityScore: 85,
    codeQualityScore: 90
};

console.log(`Quiz grade: ${calculateGrade(quiz)}%`);
console.log(`Lab grade: ${calculateGrade(lab)}%`);

console.log("======Exercise 5======");

const pending: EnrollmentStatus = {
    status: "PENDING",
    requestedAt: Temporal.Now.instant(),
    studentId: "STU-001",
    courseId: "CRS-101"
};

console.log(
    describeEnrollment(pending)
);


const webDev: CourseStatus = {
    status: "ACTIVE",
    enrolledCount: 28,
    startDate: Temporal.PlainDate.from("2026-09-01")
};

console.log(describeCourse(webDev));

console.log();
console.log("======Exercise 6======");
const studentRes: ApiResponse<Student> = {
    status: "success",
    data: {
        id: "STU-001",
        name: "Dawit Bekele",
        enrollmentDate: Temporal.Now.instant(),
        gpa: 3.4,
    },
    fetchedAt: Temporal.Now.instant(),
};

console.log(
    renderResponse(
        studentRes,
        (s) => `${s.name} GPA: ${s.gpa ?? "N/A"}`
    )
);

const courseListRes: ApiResponse<Course[]> = {
    status: "success",
    data: [
        {
            id: "CRS-101",
            title: "Web Development Fundamentals",
            capacity: 30,
            startDate: Temporal.PlainDate.from("2026-09-01"),
        },
    ],
    fetchedAt: Temporal.Now.instant(),
};

console.log(
    renderResponse(
        courseListRes,
        (courses) =>
            courses.map(c => c.title).join(", ")
    )
);


console.log();
console.log("======Exercise7=======");

const approvedAt = Temporal.Now.instant();

console.log(`Approved at (UTC): ${approvedAt}`);

const addisTime = approvedAt.toZonedDateTimeISO("Africa/Addis_Ababa");
const londonTime = approvedAt.toZonedDateTimeISO("Europe/London");

console.log(`Addis: ${addisTime.toPlainTime()}`);
console.log(`London: ${londonTime.toPlainTime()}`);

const courseStart = Temporal.PlainDate.from("2026-09-01");
const today = Temporal.Now.plainDateISO();




const daysUntilStart = today.until(courseStart).total({ unit: "days" });

console.log(`${Math.floor(daysUntilStart)} days until course starts`);

const deadline = Temporal.PlainDate.from("2026-12-15");
const remaining = today.until(deadline);
console.log(
  `${Math.floor(remaining.total({ unit: "days" }))} days until assignment is due`
);

console.log();