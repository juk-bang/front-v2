export interface ILandlordRoom {
    roomId : number,
    address : string,
    roomName : string,
    modifiedDate : string
}

export type roomtype = {
    roomId : number,
    roomName: string,
    scale: number,
    monthlyLease : number,
    adminExpenses : number,
    deposit : number,
    floor : number,
    layout : number,
    description  : string
}

export const leaseOption = {
    month : '1',
    charter : '2'
}