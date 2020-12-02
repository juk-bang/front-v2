import React from "react"
import { Link } from "react-router-dom";
import { get_id } from "../../../../API/auth";
import {communityUrl} from "../../../../components/urls";

interface IProps{
    id: any;
    post: any;
    role:any;
}

const PostCard: React.FC<IProps> = ({id, post, role}) => {
    const currentUnivid = localStorage.getItem("univid");

    return <Link to={currentUnivid ? role=="all" ? communityUrl.getCommunityDetailAll(parseInt(currentUnivid), post.postId) : communityUrl.getCommunityDetailStudent(parseInt(currentUnivid), post.postId) : ""}
        className="grid grid-cols-11">
            <div className="col-span-5 pl-5 py-3 border-b-2 border-gray-300 text-start text-sm leading-4 tracking-wider"> {post.title}</div>
            <div className="col-span-1 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider">  {post.comments}</div>
            <div className="col-span-1 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider"> {post.views}</div>
            <div className="col-span-2 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider">  {post.writer===undefined?get_id():post.writer}</div>
            <div className="col-span-2 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 tracking-wider">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative text-xs">{post.updatedDate.slice(0, 10)}</span>
                </span>
            </div>
        </Link>
}

export default PostCard;