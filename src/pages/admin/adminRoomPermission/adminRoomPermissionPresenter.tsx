import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import PostCard from "./components/postCard";
import {communityUrl} from "../../../components/urls"

interface IProps{
    roomList:any;
}

const AdminRoomPermissionPresenter:React.FC<IProps> = ({roomList}) => {
    
    return <>
        <NavBar></NavBar>
        <div className="pt-20 h-screen flex items-center justify-center flex-col">
            <div className="w-2/3 h-12 bg-blue-200 flex items-center justify-around">
                <div className="ml-40 mr-64">
                    방이름 (클릭시 상세페이지 이동)
                </div>
                <div className="ml-20">
                    허가
                </div>
                <div>
                    불허
                </div>
            </div>
            <div className="w-2/3 h-full flex items-center justify-start flex-col">
                {
                    roomList ? roomList.map((roomData:any) => {
                        return <PostCard roomData={roomData}/>;
                    }) : ""
                }
            </div>
        </div>
    </>
}

export default AdminRoomPermissionPresenter;