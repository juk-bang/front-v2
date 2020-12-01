import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {communityUrl} from "../../../../components/urls";
import { getCommunityReportDetail } from "../../../../API/admin";

interface IProps{
    roomData:any;
}

const PostCard: React.FC<IProps> = ({roomData}) => {

    const univId = localStorage.getItem("univId");
    let communityDetailUrl = "";
    if(univId){
        communityDetailUrl = communityUrl.getCommunityDetailAll(parseInt(univId), 1);
    }
    const [detail, setDetail] = useState();

    const getCommunityDetail = async () => {
        const data = await getCommunityReportDetail(roomData.role, roomData.reportPostId, roomData.reportPostId);
        setDetail(data.data);
    }

    useEffect(() => {
        getCommunityDetail();
    }, [])
    console.log(detail);

    return <Link to={communityDetailUrl} className="w-full h-20 bg-gray-200 flex items-center justify-around order-solid border-4 border-gray-600 mt-2">
        <div className="h-full flex items-center justify-center ml-64 mr-64">
            커뮤니티 게시글
        </div>
        <div className="h-full flex items-center justify-center ml-32">
            잔류
        </div>
        <div>
            삭제
        </div>
    </Link>
}

export default PostCard;