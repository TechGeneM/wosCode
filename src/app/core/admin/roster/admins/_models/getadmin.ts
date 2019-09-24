export class Getadmin {
    unixId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    modifiedDate: number;
    modifiedBy: string;

    constructor(
        unixId: string,
        firstName: string,
        lastName: string,
        emailId: string,
        modifiedDate: number,
        modifiedBy: string) {
            this.unixId = unixId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailId = emailId;
            this.modifiedDate = modifiedDate;
            this.modifiedBy = modifiedBy;
        }
}
