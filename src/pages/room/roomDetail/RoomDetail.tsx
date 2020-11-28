import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import {getRoomDetail, postFavorite} from "../../../API/room";
import { IRoomDetail } from "../interface";

import {MdSubway} from "react-icons/md";
import {GrElevator} from "react-icons/gr";
import {FaParking} from "react-icons/fa"
import {BiFoodTag,BiCctv, BiWind} from "react-icons/bi";
import {RiLayoutColumnLine} from "react-icons/ri";
import {CgSmartHomeWashMachine,CgSmartHomeRefrigerator} from "react-icons/cg";

import LocationPresenter from "./components/LocationPresenter";
import RoomPicture from "./components/RoomPicture";
import RoomReview from "./components/RoomReview";
import ScoreItem from "./components/ScoreItem";

const RoomDetail = ({history}:RouteComponentProps) => {
  const [room_id, set_room_id] = useState(0);
  const [room, set_room] = useState<IRoomDetail>({
    roomId : 0,  
    roomInfo: {
        roomName : "",
        scale : 0,
        floor : 0,
        layout : 0    
    },
    price:{
        monthlyLease : 0,
        adminExpenses : 0,
        deposit : 0
    },
    option: {
        elevator : true,
        park : true,
        cctv : true,
        autoDoor : true,
        washingMachine : true,
        gasrange : true,
        refrigerator : true,
        airconditioner : true
    },
    location:{
        address:"",
        lat:37.496303,
        lng:126.957266
    },
    description : "",
    univId : 1,
    grade : 0,
    distance : 0,
    pictureCount : 0,
    sellerId : ""
  });

useEffect(()=>{
    const id = history.location.pathname.replace("/rooms/","");
    get_room(Number(id)).then(()=>{
      set_room_id(Number(id));
    });
   }  ,[history]
);

useEffect(()=>{
},[room_id])

const get_room = async(room_id : number) => {
  const roomInfo = await getRoomDetail(room_id);
  set_room(roomInfo.data);
}

const favorite = () => {
  postFavorite(room.roomId).then(()=>{
    alert('찜하였습니다. 찜리스트에서 해당 방을 찾으실 수 있습니다.');
  }).catch((err)=>{
    alert("찜하기에 실패했습니다.");
  })
}

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-8 lg:px-20">
        <div className = "mt-20 flex justify-end space-x-2">        
          <Link className="button-mint-white" to ={"/rooms/"+room_id+"/report"}>
            신고하기
          </Link>
          <button className="button-light-green-white" >
            문의하기
          </button>
          <button className="button-mint-white" onClick = {favorite}>
            찜하기
          </button>
        </div>

        <div className = "mt-10 text-center font-bold text-3xl">{room.roomInfo.roomName}</div>     
        
        <div className = "flex mt-5 text-center w-2/3">
          <div className = "bg-green-200 w-1/4 p-5">        
            <div className = "flex-col">
              <div className = "text-xl font-bold"> {room.roomInfo.layout === 1 ? "원룸":"투쓰리룸"} </div> 
                <div> {room.price.monthlyLease === 0?
                    <> <span className = "text-green-600">전세 </span><b>{room.price.deposit}</b></>
                  : <><span className = "text-green-600">월세 </span><b>{room.price.monthlyLease}/{room.price.deposit}</b></>
               } </div>
              </div>
          </div>  
          <div className = "shadow w-1/4 p-5">        
            <div className = "flex-col">
              <div className = "text-xl font-bold"> 관리비 </div>
              <div> <b>{room.price.adminExpenses}</b>만원 </div>
            </div>
          </div>
          <div className = "green-200 w-1/4 p-5">        
            <div className = "flex-col">
              <div className = "text-xl font-bold"> 방평수 </div>
                <div> <b>{room.roomInfo.scale}</b>m<sup>2</sup> </div>
              </div>
          </div>
          <div className = "shadow w-1/4 p-5">   
            <div className = "text-xl font-bold">
              층수      
            </div>
            <div> 
              {room.roomInfo.floor === -1 ? "지하"
               :room.roomInfo.floor === 0 ? "반지하" : String(room.roomInfo.floor).concat("층")}
            </div>
          </div>
        </div>    
      
        <div className = "flex justify-center mt-10 w-full">
          <div className = "flex items-center w-1/3">        
            <MdSubway className = "text-lg h-20 w-20 text-green-700 ml-10"></MdSubway>
            <div className = "ml-10"><b>{room.distance.toFixed(2)}m 거리</b></div>
          </div>
          <div className = "w-1/3 p-5 flex flex-col">        
            <div className = "flex text-xl font-bold">
              <b className = "mr-5 text-2xl ">평점</b>
               <ScoreItem grade = {room.grade}></ScoreItem>
              <div className = "ml-2">{room.grade}</div> 
            </div>        
          </div>
        </div>         

        {room_id !== 0? <RoomPicture roomid = {room_id} pircutreCount = {room.pictureCount}></RoomPicture> :undefined}  
        
        <div className="margin-top-10 text-2xl font-bold">옵션</div>
        <div className="shadow margin-2 padding-5 background-deep-pink">
          <div className = "grid grid-cols-4 w-full gap-8">
            {room.option.elevator === true ? 
              <><div className = "flex flex-col"><GrElevator className = "mid text-3xl w-1/4"></GrElevator>
                  <div className = "mid">엘레베이터</div>
                </div> 
              </> :undefined}   
            {room.option.park === true ?   
              <><div className = "flex flex-col"><FaParking className = "mid text-3xl w-1/4"></FaParking>
                  <div className = "mid">주차장</div>
                </div>
              </>:undefined}  
           {room.option.cctv === true ? 
              <><div className = "flex flex-col"><BiCctv className = "mid text-3xl w-1/4"></BiCctv>
              <div className = "mid">cctv</div>         
            </div>
            </>:undefined}  
            {room.option.autoDoor=== true ? 
              <><div className = "flex flex-col"><RiLayoutColumnLine className = "mid text-3xl w-1/4"></RiLayoutColumnLine>
              <div className = "mid">자동문</div>
            </div>
            </>:undefined}    
            {room.option.washingMachine === true ? 
              <><div className = "flex flex-col"><CgSmartHomeWashMachine className = "mid text-3xl w-1/4"></CgSmartHomeWashMachine>
              <div className = "mid">세탁기</div>
            </div>
            </>:undefined}
            {room.option.gasrange === true ?
              <><div className = "flex flex-col"><BiFoodTag className = "mid text-3xl w-1/4"></BiFoodTag>
              <div className = "mid">가스레인지</div>  
            </div>
            </>:undefined} 
            {room.option.refrigerator === true ? 
            <><div className = "flex flex-col"><CgSmartHomeRefrigerator className = "mid text-3xl w-1/4"></CgSmartHomeRefrigerator>
              <div className = "mid">냉장고</div>  
            </div>
            </>:undefined}  
              {room.option.airconditioner === true ? 
              <><div className = "flex flex-col"><BiWind className = "mid text-3xl w-1/4"></BiWind>
              <div className = "mid">에어컨</div>
            </div>    
            </>:undefined}
          </div>
        </div>            
            
        <div className="mt-10 text-2xl font-bold">추가설명</div>
        <div className = "margin-2 shadow w-2/3 p-5 bg-green-200">{room.description}</div>

        <div className="mt-10 text-2xl mr-5 font-bold">위치</div>
        <div className="shadow p-3 bg-pink-300 font-bold">{room.location.address}</div>   
      </div> 
      {room_id !== 0?<LocationPresenter lat = {room.location.lat} lng = {room.location.lng}></LocationPresenter>: undefined}   
      <div className="h-20"></div>
      {room_id !== 0? <RoomReview roomid = {room_id}></RoomReview> : undefined}   
  </div>
  );  
}

export default withRouter(RoomDetail);
