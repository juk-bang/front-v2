import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import set_auth_token, { request_auth } from "../Api/Api";
import { type_check } from "./Api/commonFunc";

//메인 함수
const SignIn = ({ history }: any) => {
  const { login, _signout, _signin }: any = useContext(MyContext);
  const [load, setLoad] = useState(true);
  /**
   * login_check(userid, userpassword) : 로그인 값 형식 체크하기 위한 함수
   */
  const login_check = (userid: string, userpassword: string) => {
    type_check("아이디", userid);
    type_check("패스워드", userpassword);
  };

  /**
   * get_auth(userid, userpassword) : 서버에 로그인요청하는 함수
   * 정상 반환시 토큰을 로컬스토리지에 저장, 아닐 시 팝업창으로 고지
   */
  const get_auth = async (userid: string, userpassword: string) => {
    await request_auth(userid, userpassword)
      .then((response: any) => {
        setLoad(false);
        _signin(response);
        history.push("/");
      })
      .catch((err: Error) => {
        console.log(err.message);
        alert("회원정보가 존재하지 않습니다");
      });
  };

  /**
   * login_submit(event) : 타입체크 후 서버에 인증요청하기 위한 함수
   * event는 로그인 버튼 클릭시 전달되는 이벤트 target
   */
  const login_submit = (event: any) => {
    const { userid, userpassword } = event.target;
    event.preventDefault();
    try {
      login_check(userid.value, userpassword.value);
      get_auth(userid.value, userpassword.value);
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

  return (
    <div>
      {load && login ? _signout() : undefined}
      <div className="container margin-left-30 margin-right-30 padding-top-20">
        <div className="flex-column-container margin : 10 padding-10 border-deep-pink">
          <h2 className="mid font-deep-pink">로그인</h2>
          <form name="form" onSubmit={login_submit}>
            <div className="flex-column-container padding-top-5 padding-left-5px padding-right-5">
              <label className="userid ">아이디</label>
              <input name="userid" />
            </div>
            <div className="flex-column-container padding-top-5 padding-bottom-5px padding-left-5px padding-right-5">
              <label className="userpassword">비밀번호</label>
              <input name="userpassword" type="password" />
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
      )
    </div>
  );
};

export default withRouter(SignIn);
