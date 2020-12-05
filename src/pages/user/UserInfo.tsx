import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import icon from "../../img/person.png";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { get_id, get_login, get_role, position, setting_info} from "../../API/auth";
import { adminUrl, landlordUrl, roomUrl, userUrl } from "../../components/urls";

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
      <div className="min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
        <div className="max-w-md w-full border-green">
          <h1 className="mt-10 mb-6 text-3xl text-center font-deep-pink">
            프로필
          </h1>
          <img
            className="mid w-24 h-24"
            src={icon}
            alt="logo"
            width="50%"
          ></img>
          <h3 className="padding-top-5 text-center ">{state.id}</h3>
          <div className="mt-5 mb-10 flex-column-container ">
            {state.role === position.STUDENT ?
              <span className="mid flex w-full rounded-md shadow-sm sm:w-auto">
                <Link className="text-center button-mint-white w-full" to={userUrl.userEdit}>
                  정보수정
                </Link>
              </span>
           :undefined}
            <span className="mid flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              {state.role === position.ADMIN ? (
                <Link className="text-center button-mint-white w-full" to={adminUrl.adminHome}>
                  관리하기
                </Link>
              ) : state.role === position.LANDLORD ? (
                <Link className="text-center button-mint-white w-full" to={landlordUrl.landlordUpload}>
                  방올리기
                </Link>
              ) : state.role === position.STUDENT ? (
                <Link className="text-center button-mint-white w-full" to={userUrl.userFavorite}>
                  찜리스트
                </Link>
              ): undefined}
              <Link className="text-center button-mint-white w-full" to={userUrl.userPost}>
                내게시글
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(UserInfo);
