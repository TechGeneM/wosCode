import { Getta } from './getta';

export interface Gettaresponse {
    status: string;
    statusCode: string;
    data: Getta[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}

