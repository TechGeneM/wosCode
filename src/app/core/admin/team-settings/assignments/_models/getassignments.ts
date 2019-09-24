export class Getassignments {
    assignmentConfigId: number;
    category: string;
    description: string;
    name: string;
    status: string;
    effectiveDate: number;
    endDate: number;
    effectiveDatetext: string;
    endDatetext: string;
    modifiedDate: number;
    modifiedBy: string;
    cronornotflag: boolean;

    constructor(
        assignmentConfigId: number,
        category: string,
        description: string,
        name: string,
        status: string,
        effectiveDate: number,
        endDate: number,
        effectiveDatetext: string,
        endDatetext: string,
        modifiedDate: number,
        modifiedBy: string,
        cronornotflag: boolean) {
            this.assignmentConfigId = assignmentConfigId;
            this.category = category;
            this.description = description;
            this.name = name;
            this.status = status;
            this.effectiveDate = effectiveDate;
            this.endDate = endDate;
            this.effectiveDatetext = effectiveDatetext;
            this.endDatetext = endDatetext;
            this.modifiedDate = modifiedDate;
            this.modifiedBy = modifiedBy;
            this.cronornotflag = cronornotflag;
    }
}
