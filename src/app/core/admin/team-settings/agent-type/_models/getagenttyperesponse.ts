import { Getagenttype } from './getagenttype';

export interface Getagenttyperesponse {
    status: string;
    statusCode: string;
    data: Getagenttype[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}

