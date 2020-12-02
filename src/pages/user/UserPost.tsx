import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { get_id, get_login, setting_info } from "../../API/auth";
import { getMyPost } from "../../API/community";
import NavBar from "../../components/NavBar";
import PostCard from "../community/postList/components/postCard";

const UserPost = ({history}:RouteComponentProps) => {
    const [postList,set_post] = useState([]);

    useEffect(()=>{
        setting_info();
        if(get_login() === false){
          history.goBack();
        }
        getPost();
    },[])

    const getPost = async() =>{
        const postList = await getMyPost(get_id());
        set_post(postList.data);
    }

    return <>
        <NavBar></NavBar>
        <div className="pt-20 flex items-center justify-center flex-col">
        <div className="w-2/3 shadow-lg overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <div className = "grid grid-cols-11 font-bold">            
                <div className="col-span-5 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">제목</div>
                <div className="col-span-1 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">조회수</div>
                <div className="col-span-1 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">댓글수</div>
                <div className="col-span-2 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">작성자</div>
                <div className="col-span-2  py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">날짜</div>  
            </div>                        
            {
                postList ?
                postList.map((post:any) => <PostCard id={post.postId} post={post} role={post.role}/>  ) : ""
            }  
        </div>
        </div>
    </>
}

export default UserPost;