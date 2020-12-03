import React from "react"
import { Link } from "react-router-dom";
import { postPermissionRoom, deletePermissionRoom } from "../../../../API/admin";
import {roomUrl} from "../../../../components/urls";

interface IProps{
    roomData:any;
}

const PostCard: React.FC<IProps> = ({roomData}) => {

    const handleClickSubmit = async (e:any) => {
        await postPermissionRoom(roomData.univId, roomData.postId);
        window.location.reload();
    }

    const handleClickNoSubmit = async (e:any) => {
        await deletePermissionRoom(roomData.univId, roomData.postId);
        window.location.reload();
    }

    return <div  className="w-full h-20 mt-8 bg-gray-200 flex items-center justify-around order-solid border-4 border-gray-600">
        <Link to={roomUrl.roomDetail(roomData.postId)} className="flex items-center justify-center ml-20 border-solid border-2 border-green-400 w-1/2 h-12">
            {roomData.title}    
        </Link>
        <div className="flex items-center justify-center border-solid border-2 border-blue-200 w-20 h-12 ml-20" onClick={handleClickSubmit}>
            허가
        </div>
        <div className="flex items-center justify-center border-solid border-2 border-red-200 w-20 h-12" onClick={handleClickNoSubmit}>
            불허
        </div>
    </div>
}

export default PostCard;