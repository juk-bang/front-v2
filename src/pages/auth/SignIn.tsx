import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  type_check,
  auth_props,
  map_auth_state,
  map_auth_dispatch,
  is_session_exist,
  Token,
} from "./Api/commonFunc";
import { request_auth } from "./Api/Api";
import { connect } from "react-redux";
import NavBar from "../../components/NavBar";
import { useCookies } from "react-cookie";

const SignIn: React.SFC<auth_props> = (props) => {
  const [cookie] = useCookies(["auth"]);
  const cookie_curr = is_session_exist(cookie as Token);
  const [user, set_user] = useState({ userid: "", userpassword: "" });

  /**
   * login_check() : 로그인 값 형식 체크하기 위한 함수
   */
  const login_check = () => {
    type_check("아이디", user.userid);
    type_check("패스워드", user.userpassword);
  };

  /**
   * get_auth() : 서버에 로그인요청하는 함수
   * 정상 반환시 토큰을 로컬스토리지에 저장, 아닐 시 팝업창으로 고지
   */
  const get_auth = () => {
    request_auth(user.userid, user.userpassword)
      .then((response) => {
        props.sign_in(response);
        props.set_auth(response);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err.message);
        alert("회원정보가 존재하지 않습니다");
      });
  };

  /**
   * login_submit(event) : 타입체크 후 서버에 인증요청하기 위한 함수
   * event는 로그인 버튼 클릭시 전달되는 이벤트 target
   */
  const login_submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userid, userpassword } = event.currentTarget;
    if (cookie_curr) {
      alert("이미 로그인되어있습니다");
      props.history.push("/home");
    }
    try {
      login_check();
      get_auth();
    } catch (error) {
      let msg = error.message;
      let type = msg.substring(msg.indexOf("for ") + 4, msg.length);
      if (type === "아이디") {
        userid.focus();
      } else {
        userpassword.focus();
      }
    }
  };

  /**
   * handle_change(event) : 아이디, 비밀번호 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_change = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    if (name === "userid") {
      set_user({
        ...user,
        userid: value,
      });
    } else
      set_user({
        ...user,
        userpassword: value,
      });
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="container margin-left-30 margin-right-30 padding-top-20">
        <div className="flex-column-container margin : 10 padding-10 border-deep-pink">
          <h2 className="mid font-deep-pink">로그인</h2>
          <form name="form" onSubmit={login_submit}>
            <div className="flex-column-container padding-top-5 padding-left-5px padding-right-5">
              <label className="userid">아이디</label>
              <input name="userid" onChange={handle_change} />
            </div>
            <div className="flex-column-container padding-top-5 padding-bottom-5px padding-left-5px padding-right-5">
              <label className="userpassword">비밀번호</label>
              <input
                name="userpassword"
                type="password"
                onChange={handle_change}
              />
            </div>
            <div className="flex-column-container">
              <button
                className="button-deep-pink-white mid padding-3 margin-top-8"
                type="submit"
              >
                로그인
              </button>

              <Link
                className="mid border-white padding-7 padding-top-9px font-deep-pink background-pink"
                type="submit"
                to={`/auth/signup`}
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(map_auth_state, map_auth_dispatch)(SignIn);
