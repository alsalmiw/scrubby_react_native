export default interface ISharedSpace {
    id: number,
    invitedUsername: string,
    inviterUsername: string,
    collectionId: number,
    isDeleted: boolean,
    isAccepted: boolean

}