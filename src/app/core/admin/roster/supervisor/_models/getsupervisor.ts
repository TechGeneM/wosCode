export class Getsupervisor {
    // tslint:disable-next-line: variable-name
    sup_first_name: string;
    // tslint:disable-next-line: variable-name
    sup_last_name: string;
    // tslint:disable-next-line: variable-name
    sup_unixId: string;
    // tslint:disable-next-line: variable-name
    sup_team: string;
    // tslint:disable-next-line: variable-name
    ta_name: string;
    location: string;
    rotation: string;
    workCenterName: string;
    // tslint:disable-next-line: variable-name
    email_id: string;
    // tslint:disable-next-line: variable-name
    ta_id: number;
    workcenterId: number;
    startDate: number;
    endDate: number;
    modifiedDate: number;
    modifiedBy: string;

    constructor(
        // tslint:disable-next-line: variable-name
        sup_first_name: string,
        // tslint:disable-next-line: variable-name
        sup_last_name: string,
        // tslint:disable-next-line: variable-name
        sup_unixId: string,
        // tslint:disable-next-line: variable-name
        sup_team: string,
        // tslint:disable-next-line: variable-name
        ta_name: string,
        location: string,
        rotation: string,
        workCenterName: string,
        // tslint:disable-next-line: variable-name
        email_id: string,
        // tslint:disable-next-line: variable-name
        ta_id: number,
        workcenterId: number,
        startDate: number,
        endDate: number,
        modifiedDate: number,
        modifiedBy: string,
    ) {
        this.sup_first_name = sup_first_name;
        this.sup_last_name = sup_last_name;
        this.sup_unixId = sup_unixId;
        this.sup_team = sup_team;
        this.ta_name = ta_name;
        this.location = location;
        this.rotation = rotation;
        this.workCenterName = workCenterName;
        this.email_id = email_id;
        this.ta_id = ta_id;
        this.workcenterId = workcenterId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.modifiedDate = modifiedDate;
        this.modifiedBy = modifiedBy;
    }
}
