import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { roomUrl, authUrl } from "./urls";
import roomListContainer from "../pages/room/roomList/roomListContainer";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route path={roomUrl.home} exact component={roomListContainer} />
      <Route path={authUrl.signIn} exact component={SignIn} />
      <Route path={authUrl.signUp} exact component={SignUp} />
    </Switch>
  );
};

export default Routes;
