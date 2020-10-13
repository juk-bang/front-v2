import { combineReducers } from "redux";
import auth from "./auth";

export default combineReducers({
  auth,
  // 다른 리듀서를 만들게되면 여기에 넣어줌
});