import { AxiosError, AxiosResponse } from "axios";
import { RSA_NO_PADDING } from "constants";
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

export const landlord_upload = async(param:room_info) => {
  const response = await baseApi.post(`/landlord/rooms`, 
    param
  )
  const {roomId} = response.data; 
  return roomId;
};