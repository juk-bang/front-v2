import React, { useEffect, useState } from "react";
import PostListPresenter from "./postListPresenter"
import {getCommunityPostList} from "../../../API/community"


const PostListContainer:React.FC = () => {

    const [postList, setPostList] = useState();

    const getPostList = async () => {
        let serverPostList;
        const currentUnivid = localStorage.getItem("univid");
        if(currentUnivid)
            serverPostList = await getCommunityPostList(parseInt(currentUnivid));
        setPostList(serverPostList?.data);
    }

    useEffect(() => {
        getPostList();
    }, []);

    console.log(postList);


    return <PostListPresenter postList={postList}/>;
}

export default PostListContainer;