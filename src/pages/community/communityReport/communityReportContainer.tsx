import React, { useState } from "react";
import CommunityReportPresenter from "./communityReportPresenter"
import { postReportCommunityPost } from "../../../API/community";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface IParams{
    univId:string;
    postId:string;
    role:any;
}

interface IProps extends RouteComponentProps<IParams>{

}

const CommunityReportContainer:React.FC<IProps> = ({match:{params:{univId, postId, role}}, history:{goBack}}) => {

    const [type, setType] = useState();
    const [detail, setDetail] = useState();

    const postReport = async (type:any, detail:any) => {
        await postReportCommunityPost(parseInt(univId), parseInt(postId), type, detail, role);
        goBack();
    }
    const handleClickSubmit = (e:any) => {
        postReport(type, detail);
    }

    const handleChangeDetail = (e:any) => {
        setDetail(e.target.value);
    }

    return <CommunityReportPresenter type={type} setType={setType} detail={detail} handleChangeDetail={handleChangeDetail} handleClickSubmit={handleClickSubmit} />
}

export default withRouter(CommunityReportContainer);