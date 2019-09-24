export class Getta {
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
            this.modifiedBy = modifiedBy;
            this.modifiedDate = modifiedDate;
    }
}
