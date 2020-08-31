import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { roomUrl, authUrl } from "./urls";
import roomListContainer from "../pages/room/roomList/roomListContainer";
import SignIn from "../pages/auth/SignIn";

const Routes = () => {
  return (
    <Switch>
      <Route path={roomUrl.home} exact component={roomListContainer} />
      <Route path={authUrl.signIn} exact component={SignIn} />
    </Switch>
  );
};

export default Routes;
