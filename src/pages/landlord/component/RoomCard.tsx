import React, { useEffect, useState } from "react";
import { AxiosPromise, AxiosResponse } from "axios";
import defaultThumbnail from "../../../img/defaultThumbnail.jpg";
import { getRoomThumbnail } from "../../../API/room";
import { IRoom } from "../../room/interface";
import { ILandlordRoom } from "../interface";
import { Link } from "react-router-dom";
import { roomUrl } from "../../../components/urls";
import { orderedListCommand } from "@uiw/react-md-editor/lib/cjs/commands";

interface IProps {
  room: ILandlordRoom;
}

const RoomCard: React.FunctionComponent<IProps> = (props) => {
  const [thumbnail, setThumbnail] = useState<string>(
    ""
  );

  const roomThumbnail = async (roomId: number) => {
    getRoomThumbnail(roomId).then((res)=>{
    
    const url = URL.createObjectURL(res);
    setThumbnail(url);
    
   }).catch((err)=>{
      setThumbnail("error");
   });
  };

  useEffect(() => {
    roomThumbnail(props.room.roomId);
  }, []);

  return (
    <div className = "shadow-lg hover:bg-purple-200">
      <img style={{overflow:'hidden', height : '150px', width : '100%'}} 
      alt = "thumbnail" src = {thumbnail==="error"? defaultThumbnail:thumbnail}></img>
      
      <div className = "p-5">
      <div className = "font-bold hover:underline">{props.room.roomName.substr(0, 15)}</div>
      <div className = "mt-3 mb-5">{props.room.address.substr(0, 30)}
      {props.room.address.length > 30 ? "..." : undefined}</div>
      <span className = "text-purple-700 font-bold"> {props.room.modifiedDate.substr(0,10)}</span> 에 수정됨
      </div>
    </div>
  );
};

export default RoomCard;
