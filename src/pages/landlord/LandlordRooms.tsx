import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { get_role, position } from "../../API/auth";
import NavBar from "../../components/NavBar";
import { landlordUrl, roomUrl } from "../../components/urls";
import LandlordList from "./component/LandLordList";
import {Helmet} from "react-helmet"
  
const LandlordRooms = ({history}:RouteComponentProps)=>{
    const [page, set_page] = useState(0);
    //접근 제어
    useEffect(() => {
        if (get_role() !== position.LANDLORD) {
        history.push(roomUrl.home);
    }
  },[history, page]);

  const page_up = () =>{ 
    set_page(page+1);
  }

  const page_down = () =>{
    if(page-1 == -1){
        return;
    }
    set_page(page-1);
  }

    return (
        <div>
            <Helmet title="죽방 | 판매자 페이지" />
            <NavBar></NavBar>
            <div className="min-h-screen flex flex-col py-12 px-4 sm:px-10 lg:px-12">
            <div  className="mt-8"> 
                <Link
                className="fixed ml-10 btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
                to = {landlordUrl.landlordUpload}
                >방올리기</Link>
            </div>
            <div className = "mt-5 mr-16 fixed right-0 flex">
                <button onClick = {page_down} className="ml-2 shadow-md md:block bg-white lg:w-16 lg:h-16 rounded-full hover:bg-purple-200">
                    <svg className="w-12 mx-1"  width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
                </button>
                <button onClick = {page_up} className="ml-2 shadow-md md:block bg-white lg:w-16 lg:h-16 rounded-full hover:bg-purple-200">
                    <svg className="w-12 mx-1 " xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
                </button>
            </div>

            <LandlordList page = {page} set_page = {set_page}></LandlordList>

            </div>
        </div>
    )
}

export default withRouter(LandlordRooms);
