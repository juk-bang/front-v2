export interface IRoom {
  distance: number;
  grade: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: {
    adminExpenses: number;
    deposit: number;
    monthlyLease: number;
  };
  roomId: number;
  roomInfo: {
    floor: number;
    layout: number;
    roomName: string;
    scale: number;
  };
}

export interface IRoomDetail {
  roomId : number,
  roomInfo : {
      roomName : string,
      scale : number,
      floor : number,
      layout :number
  }
  ,
  price :{
    monthlyLease :number,
    adminExpenses :number,
    deposit : number
  }
  ,
  option:{
    elevator : boolean,
    park :boolean,
    cctv :boolean,
    autoDoor : boolean,
    washingMachine :boolean,
    gasrange : boolean,
    refrigerator :boolean,
    airconditioner :boolean
  }
  ,
  location : {
      address: string,
      lng : number,
      lat : number
  },
  description : string,
  univId : number,
  grade : number,
  distance : number,
  pictureCount : number,
  sellerId : string
}

export interface IReview{
  id : number,
  writer : string,
  message : string,
  grade : number,
  modifiedDate : string
}

export const reportType = {
  falseRoom : 0,
  exaggerate : 1,
  notEqual : 2,
  destroy : 3,
  etc : 4
}