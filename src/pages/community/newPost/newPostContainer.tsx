import React, { ChangeEvent, useState } from "react";
import NewPostPresenter from "./newPostPresenter"
import {postCommunityPost} from "../../../API/community"
import { withRouter, RouteComponentProps } from "react-router-dom";
import { communityUrl } from "../../../components/urls";

interface IParams{
    role:any;
}

interface IProps extends RouteComponentProps<IParams>{}

const NewPostContainer:React.FunctionComponent<IProps> = ({history, match:{params:{role}}}) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleChangeTitle:React.EventHandler<ChangeEvent> = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onSubmit = () => {
        const currentUnivid = localStorage.getItem("univid");
        if(currentUnivid){
            postCommunityPost(parseInt(currentUnivid), title, body, role).then(()=>{
            let communityListUrl = "";
            if(currentUnivid){
                communityListUrl = communityUrl.getCommunityPostList(parseInt(currentUnivid));
                history.push(communityListUrl);
            }
            });
        }
    }

    return <NewPostPresenter handleChangeTitle={handleChangeTitle} body={body} setBody={setBody} onSubmit={onSubmit}/>;
}

export default withRouter(NewPostContainer);