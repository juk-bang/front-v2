import React, { ChangeEvent, useState } from "react";
import NewPostPresenter from "./newPostPresenter"
import {postCommunityPost} from "../../../API/community"
import { withRouter, RouteComponentProps } from "react-router-dom";
import { communityUrl } from "../../../components/urls";

interface IProps extends RouteComponentProps{}

const NewPostContainer:React.FunctionComponent<IProps> = ({history}) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleChangeTitle:React.EventHandler<ChangeEvent> = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onSubmit = () => {
        const currentUnivid = localStorage.getItem("univid");
        if(currentUnivid){
            postCommunityPost(parseInt(currentUnivid), title, body);
            let communityListUrl = "";
            if(currentUnivid)
                communityListUrl = communityUrl.getCommunityPostList(parseInt(currentUnivid));
            history.push(communityListUrl);
        }
    }

    return <NewPostPresenter handleChangeTitle={handleChangeTitle} body={body} setBody={setBody} onSubmit={onSubmit}/>;
}

export default withRouter(NewPostContainer);