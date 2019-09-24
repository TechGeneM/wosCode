export class Getagentrole {
    agentRoleId: number;
    agentRole: string;
    description: string;
    effectiveDate: number;
    modifiedDate: number;
    modifiedBy: string;

    constructor(
        agentRoleId: number,
        agentRole: string,
        description: string,
        effectiveDate: number,
        modifiedDate: number,
        modifiedBy: string) {
            this.agentRoleId = agentRoleId;
            this.agentRole = agentRole;
            this.description = description;
            this.effectiveDate = effectiveDate;
            this.modifiedDate = modifiedDate;
            this.modifiedBy = modifiedBy;
        }
}
