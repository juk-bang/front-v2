import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../sass/navbar.sass";
import icon from "../img/logo_title.png";
//전역변수참조
import { connect } from "react-redux";
import {
  map_auth_state,
  map_auth_dispatch,
  auth_props_noroute,
  is_session_exist,
  Token,
} from "../pages/auth/Api/commonFunc";

import { useCookies } from "react-cookie";

const NavBar = (props: auth_props_noroute) => {
  const {
    auth,
    auth_cookie: { cookies: auth_cookie },
  } = props;

  const [cookie] = useCookies(["auth"]);

  const cookie_curr = is_session_exist(cookie as Token);
  const cookie_mine = is_session_exist(auth_cookie);

  useEffect(() => {
    //로그인,로그아웃상태 맞추기
    if (cookie.accessToken !== undefined) {
      if (cookie_curr !== cookie_mine) {
        props.set_auth(cookie);
      }
    }

    if (cookie_curr) {
      if (cookie.accessToken !== undefined && !auth.login) {
        props.sign_in(cookie);
      }
    } else {
      if (auth.login === true) {
        props.sign_out();
      }
    }
  }, []);

  return (
    <div>
      {3 > 1 ? (
        <nav className="navigation-bar">
          <div className="left-nav">
            <Link className="logo" to="/home">
              <img
                className="padding-top-7px"
                src={icon}
                alt="logo"
                width="100"
              ></img>
            </Link>
          </div>
          <div className="right-nav">
            {auth.role === "ROLE_ADMIN" ? (
              <Link className="nav-item" to={`/home`}>
                관리자페이지
              </Link>
            ) : auth.role === "ROLE_LANDLORD" ? (
              <Link className="nav-item" to={`/home`}>
                판매자페이지
              </Link>
            ) : undefined}
            <Link className="nav-item" to={`/home`}>
              방 리스트
            </Link>
            <Link className="nav-item" to={`/user/profile`}>
              커뮤니티
            </Link>
            {auth.login === false ? (
              <Link className="nav-item" to={`/auth/signin`}>
                로그인
              </Link>
            ) : (
              <>
                <Link className="nav-item" to={`/user/profile`}>
                  프로필
                </Link>
                <Link className="nav-item" to={`/auth/signout`}>
                  로그아웃
                </Link>
              </>
            )}
          </div>
        </nav>
      ) : undefined}
    </div>
  );
};

export default connect(map_auth_state, map_auth_dispatch)(NavBar);
