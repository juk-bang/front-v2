import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {communityUrl, roomUrl, adminUrl} from "../../../../components/urls";
import { getCommunityReportDetail } from "../../../../API/admin";

interface IProps{
    roomData:any;
}

const PostCard: React.FC<IProps> = ({roomData}) => {

    const univId = localStorage.getItem("univId");
    let communityDetailUrl = "";
    let adminReportUrl = "";
    console.log(roomData);
    if(roomData){
        if(roomData.role == "all"){
            communityDetailUrl = communityUrl.getCommunityDetailAll(roomData.univId, roomData.postId);
            adminReportUrl = adminUrl.getAdminReportDetail("community:all", roomData.postId, roomData.reportPostId);
        }
        else if(roomData.role == "student"){
            communityDetailUrl = communityUrl.getCommunityDetailStudent(roomData.univId, roomData.postId);
            adminReportUrl = adminUrl.getAdminReportDetail("community:student", roomData.postId, roomData.reportPostId);
        }
    }

    const [detail, setDetail] = useState();

    const getCommunityDetail = async () => {
        const data = await getCommunityReportDetail(roomData.role, roomData.reportPostId, roomData.reportPostId);
        setDetail(data.data);
    }

    useEffect(() => {
        getCommunityDetail();
    }, [])

    return<div className="w-full h-20 bg-gray-200 flex items-center justify-around border-solid border-4 border-gray-600 mt-2">
    <div className="h-16 flex items-center justify-center ml-40">
        {roomData.postId}
    </div>
    <Link to={communityDetailUrl} className="h-16 w-1/3 flex items-center justify-center ml-8 border-2 border-solid border-green-500">
        커뮤니티 상세정보로 이동
    </Link>
    <Link to={adminReportUrl} className="h-16 w-22 flex items-center justify-center border-2 border-solid border-blue-500 mr-10">
        신고 상세정보로 이동
    </Link>
    </div>
}

export default PostCard;