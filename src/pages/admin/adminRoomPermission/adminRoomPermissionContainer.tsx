import React, { useEffect, useState } from "react";
import { getPermissionRoomList } from "../../../API/admin";
import AdminRoomPermissionPresenter from "./adminRoomPermissionPresenter"



const AdminRoomPermissionContainer:React.FC = () => {

    const [roomList, setRoomList] = useState();

    const getRoomList = async () => {
        const data = await getPermissionRoomList();
        setRoomList(data.data.rooms);
    }

    useEffect(() => {
        getRoomList();
    }, []);
    return <AdminRoomPermissionPresenter roomList={roomList}/>;
}

export default AdminRoomPermissionContainer;