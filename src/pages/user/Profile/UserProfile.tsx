import React, { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar";
import icon from "../../../img/person.png";
import { Link } from "react-router-dom";
import { map_auth_state, auth_state_props } from "../../auth/Api/commonFunc";

import { connect } from "react-redux";
const UserProfile: React.SFC<auth_state_props> = (props) => {
  const { id, role } = props.auth;
  return (
    <div>
      <NavBar></NavBar>
      <div className="container margin-left-30 margin-right-30 padding-top-8">
        <div className="flex-column-container margin-5 padding-20 padding-left-20 padding-top-10 border-green">
          <h1 className="margin-left-30 font-deep-pink padding-bottom-20">
            프로필
          </h1>
          <img
            className="padding-left-30"
            src={icon}
            alt="logo"
            width="100"
          ></img>
          <h3 className="margin-left-30 padding-top-5">{id}</h3>
          <div className="flex-column-container padding-left-2">
            <div className="flex-row-container padding-left-15 padding-top-15">
              <Link className="button-mint-white " to={`/user/profile/edit`}>
                정보수정
              </Link>
              <Link className="button-mint-white margin-left-5" to={`/`}>
                채팅하기
              </Link>
            </div>

            <div className="flex-row-container padding-left-15 padding-top-2">
              {role === "ROLE_ADMIN" ? (
                <Link className="button-mint-white " to={``}>
                  관리하기
                </Link>
              ) : role === "ROLE_LANDLORD" ? (
                <Link className="button-mint-white " to={``}>
                  방올리기
                </Link>
              ) : (
                <Link className="button-mint-white " to={``}>
                  찜리스트
                </Link>
              )}
              <Link className="button-mint-white margin-left-5" to={``}>
                내게시글
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(map_auth_state)(UserProfile);
