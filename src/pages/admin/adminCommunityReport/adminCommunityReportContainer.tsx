import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getCommunityReportList } from "../../../API/admin";
import AdminCommunityReportPresenter from "./adminCommunityReportPresenter"

interface IParams{
    role:any;
}

interface IProps extends RouteComponentProps<IParams> {}

const AdminCommunityReportContainer:React.FC<IProps> = ({match:{params:{role}}}) => {

    const [roomList, setRoomList] = useState();

    const getRoomList = async () => {
        const data = await getCommunityReportList(role);
        setRoomList(data.data);
    }
    

    console.log(roomList);

    useEffect(() => {
        getRoomList();
    }, []);


    return <AdminCommunityReportPresenter roomList={roomList}/>;
}

export default withRouter(AdminCommunityReportContainer);