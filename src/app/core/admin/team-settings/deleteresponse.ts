export interface Deleteresponse {
    status: string;
    statusCode: string;
    deletedStatus: string;
    isDeleted: boolean;
    data: DeleteReferences[];
    error: string[];
}

export interface DeleteReferences {
    modelName: string;
    count: number;
    data: string[];
}
