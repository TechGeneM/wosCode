export class Addworkcenter {
    workCenterId: number;
    taId: number;
    agentroleId: number;
    workCenterName: string;
    unitofWork: string;
    taName: string;
    agentRoleName: string;
    targetUtilization: number;
    targetAttendance: number;
    shiftLength: string;
    thresholdOT: string;
    modifiedDate: number;
    modifiedBy: string;

    constructor(
        workCenterId: number,
        taId: number,
        agentroleId: number,
        workCenterName: string,
        unitofWork: string,
        taName: string,
        agentRoleName: string,
        targetUtilization: number,
        targetAttendance: number,
        shiftLength: string,
        thresholdOT: string,
        modifiedDate: number,
        modifiedBy: string) {
        this.workCenterId = workCenterId;
        this.taId = taId;
        this.agentroleId = agentroleId;
        this.workCenterName = workCenterName;
        this.unitofWork = unitofWork;
        this.taName = taName;
        this.agentRoleName = agentRoleName;
        this.targetUtilization = targetUtilization;
        this.targetAttendance = targetAttendance;
        this.shiftLength = shiftLength;
        this.thresholdOT = thresholdOT;
        this.modifiedDate = modifiedDate;
        this.modifiedBy = modifiedBy;
    }
}
