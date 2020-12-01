import React from "react"
import { Link } from "react-router-dom";
import {communityUrl} from "../../../../components/urls";

const PostCard: React.FC = () => {
    const univId = localStorage.getItem("univId");
    let communityDetailUrl = "";
    if(univId){
        communityDetailUrl = communityUrl.getCommunityDetailAll(parseInt(univId), 1);
    }

    return <Link to={communityDetailUrl} className="w-full h-full bg-gray-200 flex items-center justify-around order-solid border-4 border-gray-600">
        <div className="h-full flex items-center justify-center ml-64 mr-64">
            방이름
        </div>
        <div className="h-full flex items-center justify-center ml-32">
            허가
        </div>
        <div>
            불허
        </div>
    </Link>
}

export default PostCard;