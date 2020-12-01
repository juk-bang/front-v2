import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import PostCard from "./components/postCard";
import {communityUrl} from "../../../components/urls"

interface IProps{
    roomList:any;
}

const AdminRoomReportPresenter:React.FC<IProps> = ({roomList}) => {

    
    return <>
        <NavBar></NavBar>
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="w-2/3 h-12 bg-blue-200 flex items-center justify-around">
                <div className="ml-64 mr-64">
                    방
                </div>
                <div className="ml-32">
                    잔류
                </div>
                <div>
                    삭제
                </div>
            </div>
            <div className="w-2/3 h-screen flex items-center justify-start mt-8 flex-col">
                {roomList ? roomList.map((room:any) => <PostCard roomData={room}/>) : ""}
            </div>
        </div>
    </>
}

export default AdminRoomReportPresenter;