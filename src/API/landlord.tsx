import { AxiosError } from "axios";
import baseApi from "./baseApi";

export interface room_info {
  univId : number,
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
description : string
};

export const landlord_upload= async (param:room_info) => {

  await baseApi.post(`/landlord/rooms`, 
    param
  ).catch((err : AxiosError)=>{
    console.log(err.message)
  });
};