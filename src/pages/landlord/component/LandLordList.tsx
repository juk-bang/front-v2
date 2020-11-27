import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../../sass/tailwind.output.css";
import { Link } from "react-router-dom";
import { landlord_delete, landlord_list } from "../../../API/landlord";
import { landlordUrl, roomUrl } from "../../../components/urls";
import RoomCard from "./RoomCard";
import { ILandlordRoom } from "../interface";

interface IProps {
    page: number;
    set_page : Dispatch<SetStateAction<number>>
}

interface IList{
    _embedded :{
        rooms : ILandlordRoom[]
    }
}
const LandlordList = (props:IProps) => {
    const [rooms, set_rooms] = useState(new Array<ILandlordRoom>());

    useEffect(()=>{
        landlord_list(props.page).then((list:IList)=>{
            if(list._embedded !== undefined){
                set_rooms(list._embedded.rooms) 
            }else{
                props.set_page(props.page-1);
            }    
        })
    },[props.page]);

    useEffect(()=>{}, [rooms]);

    const delete_room = (roomId : number) =>{
        const num = rooms.length;
        let page = props.page;

        landlord_delete(roomId).then(()=>{
            if(num === 1){
                if(props.page > 0){
                    props.set_page(props.page-1);
                    page = props.page-1;
                }
            }
            landlord_list(page).then((list:IList)=>{
                if(list._embedded !== undefined){
                    set_rooms(list._embedded.rooms) 
                }else{
                    set_rooms(new Array<ILandlordRoom>());
                }    
            }).catch((err)=>{
                console.log("get room list error");
            })
        }).catch((err)=>{
            console.log("room delete error");
        })
    }

    return<div className="p-10 mt-5">
            <div className = "grid grid-cols-5 w-full gap-y-5 sm:grid-cols-2 lg:grid-cols-5"> 
                {rooms.length !== 0 ? 
                rooms.map((room : ILandlordRoom) => {
                return (
                    <div key={room.roomId}>
                    <Link to={roomUrl.roomDetail(room.roomId)}>
                        <RoomCard room={room} />
                    </Link>
                    <div className="mt-3 flex items-center justify-center">
                        <Link to = {landlordUrl.landlordUpload+'?roomid='+room.roomId} className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
                        >수정</Link>
                        <button onClick = {()=>delete_room(room.roomId)} className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border bg-black-100 border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded"
                        >삭제</button>
                    </div>  
                    </div>
                );
                }): undefined}
            </div>
            {rooms.length === 0 ? 
                <div className="flex bg-purple-200 w-full">
                <div className="w-16 bg-teal">
                    <div className="p-4">
                        <svg className="h-8 w-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.019 74.981C388.667 26.629 324.38 0 256 0S123.333 26.63 74.981 74.981 0 187.62 0 256s26.629 132.667 74.981 181.019C123.332 485.371 187.62 512 256 512s132.667-26.629 181.019-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.668-74.981-181.019zM256 470.636C137.65 470.636 41.364 374.35 41.364 256S137.65 41.364 256 41.364 470.636 137.65 470.636 256 374.35 470.636 256 470.636z"/><path d="M256 235.318c-11.422 0-20.682 9.26-20.682 20.682v94.127c0 11.423 9.26 20.682 20.682 20.682 11.423 0 20.682-9.259 20.682-20.682V256c0-11.422-9.259-20.682-20.682-20.682zM270.625 147.248A20.826 20.826 0 0 0 256 141.19a20.826 20.826 0 0 0-14.625 6.058 20.824 20.824 0 0 0-6.058 14.625 20.826 20.826 0 0 0 6.058 14.625A20.83 20.83 0 0 0 256 182.556a20.826 20.826 0 0 0 14.625-6.058 20.826 20.826 0 0 0 6.058-14.625 20.839 20.839 0 0 0-6.058-14.625z"/></svg>
                    </div>
                </div>
                <div className="text-grey-darker items-center p-4">
                    <span className="text-lg font-bold">
                        올리신 매물이 존재하지 않습니다
                    </span>
                    <p className="leading-tight">
                        위의 방올리기 버튼을 사용하여 매물을 올리실 수 있습니다.
                    </p>
                </div>
            </div>
            :undefined}
        </div>        
};

export default LandlordList;