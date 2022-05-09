export declare interface ISpaceArr {
    id:number,
    collectionName: string,
    isDeleted: boolean,
    rooms:{
        id:number,
        spaceName: string,
        spaceCategory: string,
        tasks:{}[]
    }[]
    sharedWith:{
        id:number,
        invitedId: number,
        invitedUsername:string,
        invitedName:string
    }[]
}