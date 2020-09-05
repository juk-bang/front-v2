import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { roomUrl, authUrl, userUrl } from "./urls";
import roomListContainer from "../pages/room/roomList/roomListContainer";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import SignOut from "../pages/auth/SignOut";
import UserProfile from "../pages/user/Profile/UserProfile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={roomUrl.home} exact component={roomListContainer} />
        <Route path={authUrl.signIn} exact component={SignIn} />
        <Route path={authUrl.signUp} exact component={SignUp} />
        <Route path={authUrl.signOut} exact component={SignOut} />
        <Route path={userUrl.userProfile} exact component={UserProfile} />
      </Switch>
    </Router>
  );
};

export default Routes;
