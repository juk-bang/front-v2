import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { log_out } from "../../API/auth";
import { roomUrl } from "../../components/urls";

const SignOut = ({history}:RouteComponentProps) => {
  //로그아웃 처리
  useEffect(() => {
    log_out();
    history.push(roomUrl.home);
  }, [history]);

  return <></>;
};

export default withRouter(SignOut);
