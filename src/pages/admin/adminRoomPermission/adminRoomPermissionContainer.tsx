import React, { useEffect, useState } from "react";
import { getPermissionRoomList } from "../../../API/admin";
import AdminRoomPermissionPresenter from "./adminRoomPermissionPresenter"



const AdminRoomPermissionContainer:React.FC = () => {

    const [roomList, setRoomList] = useState();

    const getRoomList = async () => {
        const data = await getPermissionRoomList();
        console.log(data);
        setRoomList(roomList);
    }

    useEffect(() => {
        getRoomList();
    }, []);
    return <AdminRoomPermissionPresenter/>;
}

export default AdminRoomPermissionContainer;