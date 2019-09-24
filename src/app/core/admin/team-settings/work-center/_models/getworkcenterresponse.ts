import { Getworkcenter } from './getworkcenter';

export interface Getworkcenterresponse {
    status: string;
    statusCode: string;
    data: Getworkcenter[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}

