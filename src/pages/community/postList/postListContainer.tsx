import React, { useEffect, useState } from "react";
import PostListPresenter from "./postListPresenter"
import {getCommunityPostList} from "../../../API/community"


const PostListContainer:React.FC = () => {

    const [postList, setPostList] = useState();
    const [role, setRole] = useState("all");

    const getPostList = async () => {
        let serverPostList;
        const currentUnivid = localStorage.getItem("univid");
        if(currentUnivid)
            serverPostList = await getCommunityPostList(parseInt(currentUnivid), role);
        setPostList(serverPostList?.data);
    }

    useEffect(() => {
        getPostList();
    }, [role]);

    return <PostListPresenter postList={postList} role={role} setRole={setRole}/>;
}

export default PostListContainer;