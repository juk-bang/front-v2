import { cookie_type } from "../cookie";
import { Token } from "../../pages/auth/Api/commonFunc";
import Axios from "axios";

//인증 쿠키 인터페이스
export interface auth_cookie_type extends cookie_type {
  cookies: { accessToken: string; refreshToken: string };
}

//초기 인증상태 선언
export const initialState: auth_cookie_type = {
  cookies: { accessToken: "", refreshToken: "" },
  set_cookie: undefined,
  remove_cookie: undefined,
};

const INIT_AUTH = "cookie/INIT_AUTH"; // 토큰초기화
const SET_AUTH = "cookie/SET_AUTH"; //토큰저장
const REMOVE_AUTH = "cookie/REMOVE_AUTH"; // 토큰지우기

export interface auth_init_action {
  type: typeof INIT_AUTH;
  payload: { cookies: auth_cookie_type };
}

export interface auth_set_action {
  type: typeof SET_AUTH;
  payload: { token: Token };
}

export interface auth_remove_action {
  type: typeof REMOVE_AUTH;
}

export const init_auth = (cookies: auth_cookie_type): auth_init_action => {
  return {
    type: INIT_AUTH,
    payload: { cookies },
  };
};

export const set_auth = (token: Token): auth_set_action => {
  return {
    type: SET_AUTH,
    payload: { token },
  };
};

export const remove_auth = (): auth_remove_action => {
  return {
    type: REMOVE_AUTH,
  };
};

export type auth_cookie_action =
  | auth_init_action
  | auth_set_action
  | auth_remove_action;

export default function auth_cookie(
  state = initialState,
  action: auth_cookie_action
) {
  switch (action.type) {
    case INIT_AUTH:
      return action.payload.cookies;
    case SET_AUTH:
      const { accessToken, refreshToken } = action.payload.token;
      state.set_cookie("accessToken", accessToken, {
        path: "/",
      });
      state.set_cookie("refreshToken", refreshToken, {
        path: "/",
      });

      Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return {
        ...state,
        cookies: { accessToken, refreshToken },
      };
    case REMOVE_AUTH:
      state.remove_cookie("accessToken");
      state.remove_cookie("refreshToken");

      delete Axios.defaults.headers.common["Authorization"];
      return {
        ...state,
        cookies: {},
      };
    default:
      return state;
  }
}
