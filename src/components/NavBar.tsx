import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import icon from "../img/logo_title.png";
import "../sass/navbar.sass";

import { adminUrl, authUrl, landlordUrl, roomUrl, userUrl, communityUrl } from "./urls";
import {get_login, get_role, position, refresh_request, setting_info } from "../API/auth";
import { basic_time, get_cookie } from "../API/cookie";

const NavBar = () => {
  const [state, set_state] = useState({role:"", login:false});

  useEffect(() => {
    setting_info();
    set_state({role : get_role(), login : get_login()});
  }, []);

  const currentUnivid = localStorage.getItem("univid");
  let communityListUrl = "";
  let roomListUrl = "";
  if(currentUnivid){
   communityListUrl = communityUrl.getCommunityPostList(parseInt(currentUnivid));
   roomListUrl = roomUrl.getHome(currentUnivid);
  }

  return (
    <div>
        <nav className="navigation-bar">
          <div className="left-nav">
            <Link className="logo" to={roomListUrl}>
              <img
                className="padding-top-7px"
                src={icon}
                alt="logo"
                width="100"
              ></img>
            </Link>
          </div>
          <div className="right-nav">
            {state.role === position.ADMIN ? (
              <Link className="nav-item" to={adminUrl.adminHome}>
                관리자페이지
              </Link>
            ) : state.role === position.LANDLORD ? (
              <Link className="nav-item" to={landlordUrl.landlordRooms}>
                판매자페이지
              </Link>
            ) : undefined}
            <Link className="nav-item" to={roomListUrl}>
              방 리스트
            </Link>
            <Link className="nav-item" to={communityListUrl}>
              커뮤니티
            </Link>
            {state.login === false ? (
              <Link className="nav-item" to={authUrl.signIn}>
                로그인
              </Link>
            ) : (
              <>
                <Link className="nav-item" to={userUrl.userInfo}>
                  프로필
                </Link>
                <Link className="nav-item" to={authUrl.signOut}>
                  로그아웃
                </Link>
              </>
            )}
          </div>
        </nav>
    </div>
  );
};

export default withRouter(NavBar);
