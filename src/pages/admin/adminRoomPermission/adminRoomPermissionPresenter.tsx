import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import PostCard from "./components/postCard";
import {communityUrl} from "../../../components/urls"


const AdminRoomPermissionPresenter:React.FC = () => {

    
    return <>
        <NavBar></NavBar>
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="w-2/3 h-12 bg-blue-200 flex items-center justify-around">
                <div className="ml-64 mr-64">
                    방이름
                </div>
                <div className="ml-32">
                    허가
                </div>
                <div>
                    불허
                </div>
            </div>
            <div className="w-2/3 h-12 mt-8 flex items-center justify-end">
                <PostCard />
            </div>
        </div>
    </>
}

export default AdminRoomPermissionPresenter;