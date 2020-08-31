import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { roomUrl, authUrl } from "./urls";
import roomListContainer from "../pages/room/roomList/roomListContainer";

const routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={roomUrl.home} exact component={roomListContainer} />
        <Route path={authUrl.signIn} exact component={SignIn} />
      </Switch>
    </Router>
  );
};

export default routes;
