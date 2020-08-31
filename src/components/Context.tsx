import React, { Props, useState, useEffect, Component } from "react";
import "../sass/navbar.sass";
import { get_role, get_id } from "../pages/auth/Api/commonFunc";
import set_auth_token from "../pages/auth/Api/Api";
import Routes from "./Routes";
import NavBar from "./NavBar";

//페이지에서 로그인 정보를 참조할 수 있도록 컨테스트 설정
export const LoginContext = React.createContext({});

class Context extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false,
      role: "",
      id: "",
    };
  }

  //앱 처음 구동시 로컬스토리지에 따라 정보 설정
  componentDidMount() {
    if (localStorage.getItem("login") === "true") {
      this.setState({
        login: true,
        role: get_role(),
        id: get_id(),
      });
    }
  }

  //로그인 처리
  _signin = (response: any) => {
    if (response?.accessToken !== undefined)
      localStorage.setItem("access_token", response.accessToken);
    if (response?.refreshToken !== undefined)
      localStorage.setItem("refresh_token", response.refreshToken);
    localStorage.setItem("login", "true");
    this.setState({
      login: true,
      role: get_role(),
      id: get_id(),
    });

    set_auth_token(true);
  };

  //로그아웃 처리
  _signout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.setItem("login", "false");
    this.setState({
      login: false,
      role: "",
      id: "",
    });

    set_auth_token(false);
  };

  render() {
    const { login, role, id }: any = this.state;
    const { _signin, _signout }: any = this;
    const provider = {
      login: login,
      role: role,
      id: id,
      _signin: _signin,
      _signout: _signout,
    };
    return (
      <div>
        <LoginContext.Provider value={provider}>
          <NavBar></NavBar>
          <Routes></Routes>
        </LoginContext.Provider>
      </div>
    );
  }
}

export default Context;
