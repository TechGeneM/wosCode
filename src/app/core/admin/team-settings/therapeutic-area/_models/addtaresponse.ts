import { Addta } from './addta';

export interface Addtaresponse {
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
    record: Addta;
    reason: string;
}
