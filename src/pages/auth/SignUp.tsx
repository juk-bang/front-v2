import React, { useEffect, useState } from "react";
import { check_overlap, request_join } from "./Api";
import NavBar from "../../components/NavBar";
import { get_login, log_in, setting_info, Token, type_check } from "../../API/auth";
import { roomUrl } from "../../components/urls";
import { AxiosError } from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {Helmet} from "react-helmet"
const SignUp = ({history}:RouteComponentProps) => {
  const [user, set_user] = useState({
    userid: "",
    userpassword: "",
    useruniv: "0",
    userrole: "",
  });

  //로그인 상태에서 회원가입 방지
  useEffect(()=>{
    setting_info();
    if(get_login() === true){
      history.push(roomUrl.home)
    }
  },[history]);
  /**
   * join_check() : 회원가입 값 형식 체크하기 위한 함수
   */
  const join_check = () => {
    type_check("아이디", user.userid);
    type_check("패스워드", user.userpassword);

    if (user.userrole === "") {
      throw new Error("empty_role_error");
    }
    //univ 무조건 1(숭실대)로 설정
    if (user.useruniv !== "1") {
      throw new Error("wrong_univ_error");
    }
  };

  /**
   * get_access() : 서버에 회원가입 요청하기 위한 함수
   */
  const get_access = () => {
    let univ = Number.parseInt(user.useruniv);
    const { userid, userpassword, userrole } = user;

    request_join(userid, userpassword, univ, userrole)
      .then((response: Token) => {
        log_in(response);
        history.push(roomUrl.home+"?univId="+localStorage.getItem('univid'));
      })
      .catch((err: AxiosError) => {
        alert("회원가입에 실패하였습니다");
      });
  };

  /**
   * join_submit(event) : 타입체크 후 서버에 회원가입 요청하기 위한 함수
   * event는 회원가입 버튼 클릭시 전달되는 이벤트 target
   */
  const join_submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userid, userpassword, useruniv } = event.currentTarget;
    set_user({ ...user, useruniv: useruniv.value });

    try {
      join_check();

      check_overlap(user.userid)
        .then(() => {
          get_access();
        })
        .catch((err:AxiosError) => {
          alert("아이디가 이미 존재합니다");
        });
    } catch (error) {
      //입력값 유효성에 따라 에러메시지 고지
      if (error.message === "empty_role_error") {
        alert("계정유형을 선택해주세요");
      } else if (error.message === "wrong_univ_error") {
        alert("학교를 선택해주세요");
      } else {
        let msg = error.message;
        let type = msg.substring(msg.indexOf("for ") + 4, msg.length);
        if (type === "아이디") {
          userid.focus();
        } else {
          userpassword.focus();
        }
      }
    }
  };

  /**
   * handle_change(event) : 회원정보 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_change = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;

    if (name === "userid") {
      set_user({
        ...user,
        userid: value,
      });
    } else if (name === "userpassword")
      set_user({
        ...user,
        userpassword: value,
      });
    else if(name === "userrole"){
      set_user({
        ...user,
        userrole: value,
      });
    }
  };

  /**
   * handle_select(event) : 회원정보 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_select = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;
    set_user({
      ...user,
      useruniv: value,
    });
  };

  return (
    <div>
      <Helmet title="죽방 | 회원가입" />
      <NavBar></NavBar>
      <div className="min-h-screen flex items-center justify-center sm:px-8 lg:px-12">
        <div className="max-w-md w-full border-deep-pink padding-5">
          <h2 className="font-deep-pink text-3xl text-center">회원가입</h2>
          <form name="form" onSubmit={join_submit}>
            <div className="flex-column-container margin-top-5">
              <label className="userid ">아이디</label>
              <input className = "border border-gray-300 rounded-md" name="userid" onChange={handle_change} />
            </div>

            <div className="flex-column-container">
              <label className="userpassword">비밀번호</label>
              <input className = "border border-gray-300 rounded-md"
                type="password"
                name="userpassword"
                onChange={handle_change}
              />
            </div>
            <div className="flex-column-container margin-top-5">
              <label className="useruniv">학교</label>
              <select name="useruniv" onChange={handle_select}>
                <option value="0"> - </option>
                <option value="1"> 숭실대 </option>
              </select>
            </div>

            <div className="flex-column-container margin-top-5">
              <label>계정유형</label>
              <div className="margin-bottom-10">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userrole"
                    value="ROLE_STUDENT"
                    onChange={handle_change}
                  />
                  학생
                </label>

                <label className="radio-label padding-left-15">
                  <input
                    type="radio"
                    name="userrole"
                    value="ROLE_LANDLORD"
                    onChange={handle_change}
                  />
                  방판매자
                </label>
                <label className="radio-label padding-left-15 ">
                  <input
                    type="radio"
                    name="userrole"
                    value="ROLE_ADMIN"
                    onChange={handle_change}
                  />
                  관리자
                </label>
              </div>
              <button className="button-white-deep-pink mid w-auto" type="submit">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
