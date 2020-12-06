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

const AdminCommunityReportPresenter:React.FC<IProps> = ({roomList}) => {

    console.log(roomList);

    
    return<>
<NavBar></NavBar>
<div className="pt-20 flex items-center justify-center flex-col">
    <Helmet title="죽방 | 관리자 커뮤니티 신고관리" />
    <div className="w-2/3 h-12 bg-blue-200 flex items-center justify-around">
        <div className="ml-8">
            커뮤니티 게시글
        </div>
        <div className="">
            잔류
        </div>
        <div className="">
            삭제
        </div>
    </div>
    <div className="w-2/3 h-screen flex items-center justify-start mt-8 flex-col">
        {roomList ? roomList.map((room:any) => <PostCard roomData={room}/>) : ""}
    </div>
</div>
</>
}

export default AdminCommunityReportPresenter;