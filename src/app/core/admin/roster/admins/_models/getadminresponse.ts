import { Getadmin } from './getadmin';

export interface Getadminresponse {
    status: string;
    statusCode: number;
    data: Getadmin[];
}
