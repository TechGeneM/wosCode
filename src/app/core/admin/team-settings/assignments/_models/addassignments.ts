export class Addassignments {
    assignmentConfigId: number;
    category: string;
    description: string;
    name: string;
    effectiveDate: number;
    endDate: number;

    constructor(
        assignmentConfigId: number,
        category: string,
        description: string,
        name: string,
        effectiveDate: number,
        endDate: number) {
            this.assignmentConfigId = assignmentConfigId;
            this.category = category;
            this.description = description;
            this.name = name;
            this.effectiveDate = effectiveDate;
            this.endDate = endDate;
        }
}
