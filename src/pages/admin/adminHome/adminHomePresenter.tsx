import React from "react";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import {adminUrl} from "../../../components/urls"
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet"

const AdminHomePresenter:React.FC = () => {
    return <>
        <NavBar></NavBar>
        <div className="pt-20 w-full h-full flex items-center flex-col">
            <Helmet title="죽방 | 관리자 홈" />
            <div className="mt-32 w-64 h-32 bg-green-400 flex justify-center items-center">관리자 페이지</div>
            <div className="flex justify-between items-center mt-32 w-2/3">
                <Link to={adminUrl.adminRoomPermission} className="flex justify-center items-center bg-green-200 w-32 h-32">방 허가 관리</Link>
                <Link to={adminUrl.adminRoomReport} className="flex justify-center items-center bg-green-200 w-32 h-32">방 신고 관리</Link>
                <Link to={adminUrl.getAdminCommunityReport("student")} className="flex justify-center items-center bg-green-200 w-32 h-32">커뮤니티 신고 관리 (학생)</Link>
                <Link to={adminUrl.getAdminCommunityReport("all")} className="flex justify-center items-center bg-green-200 w-32 h-32">커뮤니티 신고 관리 (전체)</Link>
            </div>
        </div>
    </>
}

export default AdminHomePresenter;