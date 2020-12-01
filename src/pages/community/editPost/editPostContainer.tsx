import React, { ChangeEvent, useEffect, useState } from "react";
import EditPostPresenter from "./editPostPresenter"
import {putCommunityPost} from "../../../API/community"
import { withRouter, RouteComponentProps } from "react-router-dom";
import { communityUrl } from "../../../components/urls";
import { getCommunityPostDetail } from "../../../API/community";

interface MatchParams {
    univId: string;
    postId: string;
    role:any;
}



const EditPostContainer:React.FC<RouteComponentProps<MatchParams>> = ({history, match:{params}}) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const getPostData = async () => {
        const serverPostData = await getCommunityPostDetail(parseInt(params.postId), parseInt(params.univId), params.role);
        setTitle(serverPostData.data.title);
        setBody(serverPostData.data.body);
    }


    useEffect(() => {
        getPostData();
    }, [])

    const handleChangeTitle:React.EventHandler<ChangeEvent> = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onSubmit = () => {
        const currentUnivid = localStorage.getItem("univid");
        if(currentUnivid){
            putCommunityPost(parseInt(params.univId), parseInt(params.postId), title, body, params.role);
            history.goBack();
        }
    }

    return <EditPostPresenter handleChangeTitle={handleChangeTitle} body={body} setBody={setBody} onSubmit={onSubmit} title={title} />;
}

export default withRouter(EditPostContainer);