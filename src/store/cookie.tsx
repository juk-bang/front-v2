import { auth_cookie_type, init_auth } from "./modules/auth_cookie";
import { DispatchProp } from "react-redux";
import { sign_in, sign_out } from "./modules/auth";
import { Token } from "../pages/auth/Api/commonFunc";

//쿠키기본설정 :향후 시간 변경
let expires = new Date();
expires.setDate(expires.getDate() + 1 / 12);
export const cookie_option = {
  path: "/",
  expires,
};

//쿠키 기본 인터페이스
export interface cookie_type {
  cookies: {};
  set_cookie: any;
  remove_cookie: any;
}

//쿠키 관련 props
export interface cookie_props {
  init_auth: CallableFunction;
  sign_in: CallableFunction;
  sign_out: CallableFunction;
}

export const map_cookie_dispatch = (dispatch: any) => ({
  init_auth: (cookie: auth_cookie_type) => dispatch(init_auth(cookie)),
  sign_in: (token: Token): DispatchProp => dispatch(sign_in(token)),
  sign_out: (): DispatchProp => dispatch(sign_out()),
});
