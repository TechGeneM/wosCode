import { User } from './user';

export interface Userresponse {
    status: string;
    statusCode: number;
    data: User[];
    error: ErrorMessage;
}

export class ErrorMessage {
    message: string;
}
