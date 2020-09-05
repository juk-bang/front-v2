import React from "react";
import Routes from "./components/routes";
import { connect } from "react-redux";
//쿠키설정
import { useCookies } from "react-cookie";
import { map_cookie_dispatch, cookie_props } from "./store/cookie";
import { is_session_exist, Token } from "./pages/auth/Api/commonFunc";

const App = (props: cookie_props) => {
  //쿠키 생성
  const [auth_cookie, set_cookie, remove_cookie] = useCookies(["auth"]);
  const login = is_session_exist(auth_cookie as Token);

  props.init_auth({
    cookies: auth_cookie,
    set_cookie,
    remove_cookie,
  });

  //처음접속시 세션에따라 로그인처리
  if (login === true) {
    props.sign_in(auth_cookie);
  } else {
    props.sign_out();
  }
  return <Routes></Routes>;
};

export default connect(undefined, map_cookie_dispatch)(App);
