import React from "react"
import { Link } from "react-router-dom";
import {communityUrl} from "../../../../components/urls";

interface IProps{
    id: any;
    post: any;
}

const PostCard: React.FC<IProps> = ({id, post}) => {
    const currentUnivid = localStorage.getItem("univid");

    return <Link to={currentUnivid ? communityUrl.getCommunityDetail(parseInt(currentUnivid), post.postId) : ""} 
                className="w-full h-20 bg-gray-200 flex items-center justify-start pl-10 border-solid border-4 border-gray-600 mt-px">
        <div className="ml-8">
            {post.views}
        </div>
        <div className="w-2/3 h-full flex items-center justify-center">
            {post.title}
        </div>
        <div className="w-32 h-full flex items-center justify-center">
            {post.comments}
        </div>
        <div>
            {post.writer}
        </div>
        <div className="pl-10">
            {post.updatedDate.slice(0, 10)}
        </div>
    </Link>
}

export default PostCard;