import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getRoomReportList } from "../../../API/admin";
import AdminRoomReportPresenter from "./adminRoomReportPresenter"

interface IParams{
    role:any;
}

interface IProps extends RouteComponentProps<IParams> {}

const AdminRoomReportContainer:React.FC<IProps> = ({match:{params:{role}}}) => {

    const [roomList, setRoomList] = useState();

    const getRoomList = async () => {
        const data = await getRoomReportList();
        setRoomList(data.data);
    }

    useEffect(() => {
        getRoomList();
    }, []);

    return <AdminRoomReportPresenter roomList={roomList}/>;
}

export default withRouter(AdminRoomReportContainer);