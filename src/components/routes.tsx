import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { roomUrl, authUrl, userUrl, landlordUrl, locationUrl, mainHome, communityUrl, adminUrl } from "./urls";
import roomListContainer from "../pages/room/roomList/roomListContainer";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import SignOut from "../pages/auth/SignOut";
import UserInfo from "../pages/user/UserInfo";
import LandlordUpload from "../pages/landlord/LandlordUpload";
import LocPopup from "../pages/landlord/popup/LocPopup";
import LocInput from "../pages/landlord/popup/LocInput";
import RoomDetail from "../pages/room/roomDetail/RoomDetail";
import HomeContainer from "../pages/home/homeContainer";
import postListContainer from "../pages/community/postList/postListContainer"
import NewPostContainer from "../pages/community/newPost/newPostContainer";
import EditPostContainer from "../pages/community/editPost/editPostContainer";
import postDetailContainer from "../pages/community/postDetail/postDetailContainer";
import CommunityReportContainer from "../pages/community/communityReport/communityReportContainer";
import UserEdit from "../pages/user/UserEdit";
import UserDelete from "../pages/user/UserDelete";
import LandlordRooms from "../pages/landlord/LandlordRooms";
import RoomReport from "../pages/room/roomDetail/RoomReport";
import UserFavorite from "../pages/user/UserFavorite";
import AdminHomeContainer from "../pages/admin/adminHome/adminHomeContainer";
import AdminCoomunityReportContainer from "../pages/admin/adminCommunityReport/adminCommunityReportContainer";
import AdminRoomPermissionContainer from "../pages/admin/adminRoomPermission/adminRoomPermissionContainer";
import adminRoomReportContainer from "../pages/admin/adminRoomReport/adminRoomReportContainer";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={mainHome} exact component={HomeContainer} />
        <Route path={roomUrl.home} exact component={roomListContainer} />
        <Route path={roomUrl.room} exact component={RoomDetail} />
        <Route path={roomUrl.roomReport} exact component={RoomReport} />
        <Route path={authUrl.signIn} exact component={SignIn} />
        <Route path={authUrl.signUp} exact component={SignUp} />
        <Route path={authUrl.signOut} exact component={SignOut} />
        <Route path={userUrl.userInfo} exact component={UserInfo} />
        <Route path={userUrl.userEdit} exact component={UserEdit} />
        <Route path={userUrl.userDelete} exact component={UserDelete} />
        <Route path={userUrl.userFavorite} exact component={UserFavorite} />
        <Route path={landlordUrl.landlordUpload} exact component={LandlordUpload} />
        <Route path={landlordUrl.landlordRooms} exact component={LandlordRooms} />
        <Route path={locationUrl.locationGet} exact component={LocPopup} />
        <Route path={locationUrl.locationInput} exact component={LocInput} />
        <Route path={communityUrl.communityPostList} exact component={postListContainer} />
        <Route path={communityUrl.newCommunityPost} exact component={NewPostContainer} />
        <Route path={communityUrl.editCommunityPost} exact component={EditPostContainer} />
        <Route path={communityUrl.communityDetail} exact component={postDetailContainer} />
        <Route path={communityUrl.communityReport} exact component={CommunityReportContainer} />
        <Route path={adminUrl.adminHome} exact component={AdminHomeContainer} />
        <Route path={adminUrl.adminCommunityReport} exact component={AdminCoomunityReportContainer} />
        <Route path={adminUrl.adminRoomPermission} exact component={AdminRoomPermissionContainer} />
        <Route path={adminUrl.adminRoomReport} exact component={adminRoomReportContainer} />
      </Switch>
    </Router>
  );
};

export default Routes;
