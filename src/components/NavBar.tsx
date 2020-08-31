import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import "../sass/navbar.sass";
import icon from "../img/logo_title.png";
import { LoginContext } from "./Context";

function NavBar() {
  const { login, role }: any = useContext(LoginContext);

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
            {role === "ROLE_ADMIN" ? (
              <Link className="nav-item" to={`/home`}>
                관리자페이지
              </Link>
            ) : role === "ROLE_LANDLORD" ? (
              <Link className="nav-item" to={`/home`}>
                판매자페이지
              </Link>
            ) : undefined}
            <Link className="nav-item" to={`/home`}>
              방 리스트
            </Link>
            <Link className="nav-item" to={`/home`}>
              커뮤니티
            </Link>
            {login === false ? (
              <Link className="nav-item" to={`/auth/signin`}>
                로그인
              </Link>
            ) : (
              <>
                <Link className="nav-item" to={`/user/profile`}>
                  프로필
                </Link>
                <Link className="nav-item" to={`/auth/signin`}>
                  로그아웃
                </Link>
              </>
            )}
          </div>
        </nav>
      ) : undefined}
    </div>
  );
}

export default NavBar;
