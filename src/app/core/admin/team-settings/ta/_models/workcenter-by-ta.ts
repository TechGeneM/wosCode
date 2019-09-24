import { Getworkcenter } from '../../work-center/_models/getworkcenter';

export class WorkcenterByTa {
    taid: number;
    taname: string;
    workcenterCount: number;
    workcenters: Getworkcenter[];

    constructor(
        taid: number,
        taname: string,
        workcenterCount: number,
        workcenters: Getworkcenter[]) {
            this.taid = taid;
            this.taname = taname;
            this.workcenterCount = workcenterCount;
            this.workcenters = workcenters;
    }
}

