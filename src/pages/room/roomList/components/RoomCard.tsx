import React, { useEffect, useState } from "react";
import { IRoom } from "../../interface";
import { getRoomThumbnail } from "../../../../API/room";
import defaultThumbnail from "../../../../img/defaultThumbnail.jpg";
import { postUserFavorites } from "../../../../API/user";
import {roomUrl} from "../../../../components/urls"
import { Link } from "react-router-dom";
import ScoreItem from "../../roomDetail/components/ScoreItem";
import {AiFillHeart} from "react-icons/ai"
import { get_role, position } from "../../../../API/auth";
import { AxiosError } from "axios";

interface IProps{
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

  const handleClickFavorites = (e:any) => {
    postUserFavorites(props.room.roomId).then(()=>{
      alert('찜하였습니다. 찜리스트에서 해당 방을 찾으실 수 있습니다.');
    }).catch((err:AxiosError)=>{
    if(err.response?.data.message !== undefined)
    {
      alert(err.response.data.message);
    }else{
      alert("찜하기에 실패했습니다.");
    }
    });
  }
  useEffect(() => {
    roomThumbnail(props.room.roomId);
  }, []);

  return (
    <div className = "shadow-lg bg-gray-100 pb-2 hover:bg-gray-300">
      <Link to={roomUrl.roomDetail(props.room.roomId)} className="">
      <img style={{overflow:'hidden', height : '200px', width : '100%'}} 
        alt = "thumbnail" src = {thumbnail==="error"? defaultThumbnail : thumbnail}></img>
        
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
          <div className = "flex flex-wrap mt-3"> 
            <div className = "font-bold mr-2"> 월세 </div> 
              {props.room.price.monthlyLease +"만원"}
                <div className = "font-bold mx-2"> 보증금</div> 
                  {props.room.price.deposit +"만원"}
              </div>
          }
    
    <div className = "mt-4 text-purple-800 hover:underline font-bold">{props.room.location.address.substr(0,12)}   
            {props.room.location.address.length > 12 ?"...":""}
          </div>
          <div className = "mt-1 text-purple-500"> 학교까지 
            <span className = "text-purple-700 ml-2 text-xl font-bold hover:underline">{props.room.distance.toFixed(2)}m</span>
          </div>
          </div>
        </Link>
        {get_role() === position.STUDENT?
        <AiFillHeart className="w-full hover:text-purple-900 cursor-pointer h-10 text-pink-500 w-64 flex justify-center" onClick={handleClickFavorites}/>
        :undefined}
    </div>
  );
};

export default RoomCard;
