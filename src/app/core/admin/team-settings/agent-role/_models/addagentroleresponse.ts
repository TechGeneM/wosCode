import { Addagentrole } from './addagentrole';

export interface Addagentroleresponse {
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
    record: Addagentrole;
    reason: string;
}


