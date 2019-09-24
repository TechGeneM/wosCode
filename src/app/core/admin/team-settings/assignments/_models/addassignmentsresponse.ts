import { Addassignments } from './addassignments';

export interface Addassignmentsresponse {
    status: string;
    statusCode: string;
    data: number[];
    ignoredRecords: IgnoredRecords[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}

export class IgnoredRecords {
    record: Addassignments;
    reason: string;
}

