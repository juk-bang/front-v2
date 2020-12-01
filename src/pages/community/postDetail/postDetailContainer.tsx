import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getCommunityPostDetail, getCommunityPostComments, postCommunityPostComments, deleteCommunityPost } from "../../../API/community";
import { communityUrl } from "../../../components/urls";
import PostDetailPresenter from "./postDetailPresenter";


interface MatchParams {
    univId: string;
    postId: string;
    role:string;
  }

const PostDetailContainer:React.FC<RouteComponentProps<MatchParams>> = ({match:{params}, history}) => {

    const [postData, setPostData] = useState();
    const [commentsData, setCommentsData] = useState();
    const [newComment, setNewComment] = useState("");

    const getPostData = async () => {
        const serverPostData = await getCommunityPostDetail(parseInt(params.univId), parseInt(params.postId), params.role);
        setPostData(serverPostData.data);
    }

    const getCommentsData = async () => {
        const serverCommentsData = await getCommunityPostComments(parseInt(params.univId), parseInt(params.postId), params.role);
        setCommentsData(serverCommentsData.data);
        setNewComment("");
    }

    const postComments = async () => {
        await postCommunityPostComments(parseInt(params.univId), parseInt(params.postId), newComment, params.role);
        getCommentsData();
    }

    const deletePost = async () => {
        await deleteCommunityPost(parseInt(params.univId), parseInt(params.postId), params.role);

        const currentUnivid = localStorage.getItem("univid");
        let communityListUrl = "";
        if(currentUnivid)
            communityListUrl = communityUrl.getCommunityPostList(parseInt(currentUnivid));
        history.push(communityListUrl);
    }

    useEffect(() => {
        getCommentsData();
        getPostData();
    }, [])

    const handleChangeComment = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    }

    const handleClickSubmitComment = (e:React.MouseEvent<HTMLDivElement>) => {
        postComments();
    }

    return <PostDetailPresenter newComment={newComment} handleClickSubmitComment={handleClickSubmitComment} handleChangeComment={handleChangeComment} postData={postData} commentsData={commentsData} deletePost={deletePost} getCommentsData={getCommentsData} role={params.role}/>;
}

export default withRouter(PostDetailContainer);