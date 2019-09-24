import { Getassignments } from './getassignments';

export interface Getassignmentsresponse {
    status: string;
    statusCode: string;
    data: Getassignments[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}

