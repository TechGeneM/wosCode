export class Addagenttype {
    agentTypeId: number;
    agentType: string;
    description: string;
    modifiedDate: number;
    modifiedBy: string;

    constructor(
        agentTypeId: number,
        agentType: string,
        description: string,
        modifiedDate: number,
        modifiedBy: string) {
            this.agentTypeId = agentTypeId;
            this.agentType = agentType;
            this.description = description;
            this.modifiedDate = modifiedDate;
            this.modifiedBy = modifiedBy;
        }
}
