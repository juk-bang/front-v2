import { combineReducers } from "redux";
import auth from "./auth";
import auth_cookie from "./auth_cookie";
export default combineReducers({
  auth,
  auth_cookie,
  // 다른 리듀서를 만들게되면 여기에 넣어줌
});
