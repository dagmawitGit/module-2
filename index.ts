import { Temporal } from "@js-temporal/polyfill";
import { Student } from "./models/student.model";

import {
    isStudent
} from "./models/student.model";

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

processStudent({
    id: "STU-001",
    name: "Hana",
    gpa: 3.7
});
processStudent(42);


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
        name: "Hana"
    })
);
