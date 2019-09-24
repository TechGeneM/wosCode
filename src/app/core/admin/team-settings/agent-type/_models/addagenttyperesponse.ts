import { Addagenttype } from './addagenttype';

export interface Addagenttyperesponse {
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
    record: Addagenttype;
    reason: string;
}

