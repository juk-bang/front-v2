import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import icon from "../../img/person.png";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { get_id, get_login, get_role, position, setting_info} from "../../API/auth";
import { roomUrl } from "../../components/urls";

const UserInfo = ({history}:RouteComponentProps) => {
  const [state, set_state] = useState({id:"", role:""});

  useEffect(() => {
    setting_info();
    if(get_login() === false){
      history.push(roomUrl.home);
    }
    set_state({id:get_id(), role:get_role()});
  },[history]);

  return (
    <div>
      <NavBar></NavBar>
      <div className="container margin-left-30 margin-right-30 padding-top-8">
        <div className="flex-column-container margin-5 padding-20 padding-left-20 padding-top-10 border-green">
          <h1 className="margin-left-30 font-deep-pink padding-bottom-20">
            프로필
          </h1>
          <img
            className="padding-left-20"
            src={icon}
            alt="logo"
            width="50%"
          ></img>
          <h3 className="margin-left-30 padding-top-5">{state.id}</h3>
          <div className="flex-column-container padding-left-2">
            <div className="flex-row-container padding-left-15 padding-top-15">
              <Link className="button-mint-white " to={``}>
                정보수정
              </Link>
              <Link className="button-mint-white margin-left-5" to={``}>
                채팅하기
              </Link>
            </div>

            <div className="flex-row-container padding-left-15 padding-top-2">
              {state.role === position.ADMIN ? (
                <Link className="button-mint-white " to={``}>
                  관리하기
                </Link>
              ) : state.role === position.LANDLORD ? (
                <Link className="button-mint-white " to={``}>
                  방올리기
                </Link>
              ) : state.role === position.STUDENT ? (
                <Link className="button-mint-white " to={``}>
                  찜리스트
                </Link>
              ): undefined}
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
export default withRouter(UserInfo);
