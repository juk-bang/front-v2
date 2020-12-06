import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import PostCard from "./components/postCard";
import {communityUrl} from "../../../components/urls"
import {Helmet} from "react-helmet"
interface IProps{
    roomList:any;
}

const AdminRoomReportPresenter:React.FC<IProps> = ({roomList}) => {

    
    return <>
        <NavBar></NavBar>
        <Helmet title="죽방 | 관리자 방 신고관리" />
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="w-2/3 h-12 bg-blue-200 flex items-center justify-around">
                <div className="ml-8">
                    방 번호
                </div>
                <div className="">
                    방 상세정보
                </div>
                <div className="">
                    신고 상세정보
                </div>
            </div>
            <div className="w-2/3 h-screen flex items-center justify-start mt-8 flex-col">
                {roomList ? roomList.map((room:any) => <PostCard roomData={room}/>) : ""}
            </div>
        </div>
    </>
}

export default AdminRoomReportPresenter;