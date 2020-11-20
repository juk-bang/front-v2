import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { roomUrl, authUrl, userUrl, landlordUrl, locationUrl, mainHome } from "./urls";
import roomListContainer from "../pages/room/roomList/roomListContainer";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import SignOut from "../pages/auth/SignOut";
import UserInfo from "../pages/user/UserInfo";
import LandlordUpload from "../pages/landlord/LandlordUpload";
import LocPopup from "../pages/landlord/popup/LocPopup";
import LocInput from "../pages/landlord/popup/LocInput";
import HomeContainer from "../pages/home/homeContainer";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={mainHome} exact component={HomeContainer} />
        <Route path={roomUrl.home} exact component={roomListContainer} />
        <Route path={authUrl.signIn} exact component={SignIn} />
        <Route path={authUrl.signUp} exact component={SignUp} />
        <Route path={authUrl.signOut} exact component={SignOut} />
        <Route path={userUrl.userInfo} exact component={UserInfo} />
        <Route path={landlordUrl.landlordUpload} exact component={LandlordUpload} />
        <Route path={locationUrl.locationGet} exact component={LocPopup} />
        <Route path={locationUrl.locationInput} exact component={LocInput} />
      </Switch>
    </Router>
  );
};

export default Routes;
