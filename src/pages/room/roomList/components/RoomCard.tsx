import React, { useEffect, useState } from "react";
import { IRoom } from "../../interface";
import { getRoomThumbnail } from "../../../../API/room";
import defaultThumbnail from "../../../../img/defaultThumbnail.jpg";
import "../../../../sass/tailwind.output.css";
import ScoreItem from "../../roomDetail/components/ScoreItem";

interface IProps {
  room: IRoom;
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
      <img style={{overflow:'hidden', height : '200px', width : '100%'}} 
      alt = "thumbnail" src = {thumbnail==="error"? defaultThumbnail:thumbnail}></img>
      
      <div className = "p-5">
        <div className = "text-2xl mb-2 font-bold hover:underline">{props.room.roomInfo.roomName.substr(0,15)}
          {props.room.roomInfo.roomName.length > 15 ?"...":undefined}
        </div>
        <div className = "flex mb-3"><ScoreItem grade = {props.room.grade}></ScoreItem></div>
        <div className = "flex flex-wrap">
          <div className = "mt-1 rounded-lg bg-green-200 p-1 w-min">{props.room.roomInfo.layout === 1? "#원룸":"#투쓰리룸"}</div>
          <div className = "mt-1 ml-2 rounded-lg bg-green-300 p-1 w-min">
          #{props.room.roomInfo.floor > 0 ? props.room.roomInfo.floor+"층": 
            props.room.roomInfo.floor === 0 ? "반지하" : "지하"}
          </div> 
          <div className = "mt-1 ml-2 rounded-lg bg-green-400 p-1 w-min">#{props.room.roomInfo.scale} 평</div>
          <div className = "mt-1 ml-2 rounded-lg bg-green-500 p-1 w-min"> {props.room.price.monthlyLease === 0 ? "#전세" : "#월세"}</div>
        </div>
        {props.room.price.monthlyLease === 0 ?
          <div className = "flex mt-3"> 
            <div className = "font-bold mr-2"> 전세 </div> 
              {props.room.price.deposit+"만원"} 
            </div>
        :   
        <div className = "flex mt-3"> 
          <div className = "font-bold mr-2"> 월세 </div> 
            {props.room.price.monthlyLease +"만원"}
              <div className = "font-bold mx-2"> 보증금</div> 
                {props.room.price.deposit +"만원"}
             </div>
        }
   
        <div className = "mt-4 text-purple-800 hover:underline font-bold">{props.room.location.address.substr(0,20)}   
          {props.room.roomInfo.roomName.length > 20 ?"...":undefined}
        </div>
        <div className = "mt-1 text-purple-500"> 학교까지 
          <span className = "text-purple-700 ml-2 text-xl font-bold hover:underline">{props.room.distance.toFixed(2)}m</span>
        </div>
        </div>
    </div>
  );
};

export default RoomCard;
