import React, { useEffect, useState } from "react"
import ReportDetailPresenter from "./reportDetailPresenter";
import {getRoomReportDetail, getCommunityReportDetail} from "../../.././API/admin"
import { withRouter, RouteComponentProps } from "react-router-dom";

interface IPrams{
    category:any;
    detailid:any;
    reportid:any;
}

interface IProps extends RouteComponentProps<IPrams> {

}

const ReportDetailContainer:React.FC<IProps> = ({match:{params:{category, detailid, reportid}}}) => {

    const [data, setData] = useState();

    const getRoomData = async () => {
        const serverData = await getRoomReportDetail(detailid, reportid);
        setData(serverData.data);
    }

    const getCommunityData = async (role:any) => {
        const serverData = await getCommunityReportDetail(category.slice(10, ), detailid, reportid);
        setData(serverData.data);
    }

    useEffect(()=>{
        if(category == "room"){
            getRoomData();
        } else if (category == "community:all"){
            getCommunityData("all");
        } else if (category == "community:student"){
            getCommunityData("student");
        }
    }, []);

    return <ReportDetailPresenter data={data}/>
}

export default withRouter(ReportDetailContainer);