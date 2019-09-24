import { Getagents } from './getagents';

export interface Getagentsresponse {
    status: string;
    statusCode: number;
    data: Getagents[];
}
