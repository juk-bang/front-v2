import React, { useEffect } from "react";
import {
  auth_props,
  map_auth_state,
  map_auth_dispatch,
} from "./Api/commonFunc";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";

const SignOut: React.FC<auth_props> = (props) => {
  //로그아웃 처리
  useEffect(() => {
    props.sign_out();
    props.remove_auth();

    props.history.push("/home");
  }, []);

  return <></>;
};

export default connect(map_auth_state, map_auth_dispatch)(SignOut);
