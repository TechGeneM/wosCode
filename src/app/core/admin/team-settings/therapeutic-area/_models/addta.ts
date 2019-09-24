export class Addta {
    taId: number;
    taName: string;
    description: string;
    modifiedDate: number;
    modifiedBy: string;

    constructor(
        taId: number,
        taName: string,
        description: string,
        modifiedDate: number,
        modifiedBy: string) {
            this.taId = taId;
            this.taName = taName;
            this.description = description;
            this.modifiedDate = modifiedDate;
            this.modifiedBy = modifiedBy;
    }
}
