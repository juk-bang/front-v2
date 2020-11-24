import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import PostCard from "./components/postCard";
import {communityUrl} from "../../../components/urls"

interface IProps{
    postList:any;
}

const PostListPresenter:React.FC<IProps> = ({postList}) => {

    let newPostUrl = "";
    const currentUnivid = localStorage.getItem("univid");
    if(currentUnivid)
        newPostUrl = communityUrl.getNewCommunityPost(parseInt(currentUnivid));


    return <>
        <NavBar></NavBar>
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="w-2/3 h-16 mt-8 flex items-center justify-end">
                <Link to={newPostUrl} className="w-24 h-12 bg-blue-200 flex items-center justify-center">
                    글쓰기
                </Link>
            </div>
            <div className="w-2/3 h-12 bg-blue-200 flex items-center justify-start">
                <div className="ml-16 mr-48">
                    조회수
                </div>
                <div className="ml-48 mr-48">
                    제목
                </div>
                <div className="ml-56 mr-16">
                    댓글수
                </div>
                <div>
                    글쓴이
                </div>
                <div className="mr-16 ml-16">
                    날짜
                </div>
            </div>
            <div className="w-2/3 h-12 mt-8 flex items-center justify-end">
                {
                    postList ?
                    postList.map((post:any) => <PostCard id={post.postId} post={post}/>) : ""
                }
                
            </div>
        </div>
    </>
}

export default PostListPresenter;