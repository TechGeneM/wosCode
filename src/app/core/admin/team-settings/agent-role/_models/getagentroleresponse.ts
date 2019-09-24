import { Getagentrole } from './getagentrole';

export interface Getagentroleresponse {
    status: string;
    statusCode: string;
    data: Getagentrole[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}
