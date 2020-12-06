import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import NavBar from "../../components/NavBar";
import FavoriteList from "./components/FavoriteList";
import {Helmet} from "react-helmet"
  
const UserFavorite = ({history}:RouteComponentProps)=>{
  const [page, set_page] = useState(0);

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
                        <Helmet title="죽방 | 찜목록" />
            <NavBar></NavBar>
            <div className="min-h-screen flex flex-col py-12 px-4 sm:px-10 lg:px-12">
            <div className = "mt-5 mr-16 fixed right-0 flex">
                <button onClick = {page_down} className="ml-2 shadow-md md:block bg-white lg:w-16 lg:h-16 rounded-full hover:bg-purple-200">
                    <svg className="w-12 mx-1"  width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
                </button>
                <button onClick = {page_up} className="ml-2 shadow-md md:block bg-white lg:w-16 lg:h-16 rounded-full hover:bg-purple-200">
                    <svg className="w-12 mx-1 " xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
                </button>
            </div>

            <FavoriteList page = {page} set_page = {set_page}></FavoriteList>

            </div>
        </div>
    )
}

export default withRouter(UserFavorite);
