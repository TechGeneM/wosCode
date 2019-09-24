import { Addworkcenter } from './addworkcenter';

export interface Addworkcenterresponse {
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
    record: Addworkcenter;
    reason: string;
}
