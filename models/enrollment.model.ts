import {Temporal} from "@js-temporal/polyfill";
export interface enrollment{
    readonly studentId:string;
    readonly courseId:string;
    enrollmentDate:Temporal.Instant;
} 