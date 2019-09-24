export class Addagentrole {
    agentRoleId: number;
    agentRole: string;
    description: string;

    constructor(
        agentRoleId: number,
        agentRole: string,
        description: string
    ) {
        this.agentRoleId = agentRoleId;
        this.agentRole = agentRole;
        this.description = description;
    }
}
