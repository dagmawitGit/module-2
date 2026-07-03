import { Temporal } from "@js-temporal/polyfill";
import { Student } from "./models/student.model";

const student: Student = {
    id: "STU-001",
    name: "Hana Tadesse",
    enrollmentDate: Temporal.Now.instant()
};
console.log(student.gpa?.toFixed(2) ?? "not yet graded");
console.log(student.name);