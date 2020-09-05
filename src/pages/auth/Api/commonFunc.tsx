import { RouteComponentProps } from "react-router-dom";
import jwt from "jwt-decode";
import { auth_state, sign_out, sign_in } from "../../../store/modules/auth";
import { DispatchProp } from "react-redux";
import {
  auth_cookie_type,
  init_auth,
  set_auth,
  remove_auth,
} from "../../../store/modules/auth_cookie";

//토큰 추출 정보
type dec_token = {
  sub: string; //아이디
  roles: string; //권한
};

//토큰 타입
export type Token = {
  accessToken: string;
  refreshToken: string;
};

//auth전역변수 인터페이스
export interface auth_state_props {
  auth: auth_state;
  auth_cookie: auth_cookie_type;
}

//모든 auth전역변수, dispatch 인터페이스
export interface auth_props_noroute {
  auth: auth_state;
  auth_cookie: auth_cookie_type;
  sign_in: CallableFunction;
  sign_out: CallableFunction;
  init_auth: CallableFunction;
  set_auth: CallableFunction;
  remove_auth: CallableFunction;
}

//모든 auth전역변수, dispatch 인터페이스
export interface auth_props extends RouteComponentProps, auth_props_noroute {}

// auth전역변수 참조시 전달할 props
export const map_auth_state = ({ auth, auth_cookie }: auth_state_props) => ({
  auth: auth,
  auth_cookie: auth_cookie,
});

export const map_auth_dispatch = (dispatch: any) => ({
  sign_in: (token: Token): DispatchProp => dispatch(sign_in(token)),
  sign_out: (): DispatchProp => dispatch(sign_out()),
  init_auth: (cookie: auth_cookie_type): DispatchProp =>
    dispatch(init_auth(cookie)),
  set_auth: (token: Token): DispatchProp => dispatch(set_auth(token)),
  remove_auth: (): DispatchProp => dispatch(remove_auth()),
});

export const is_session_exist = (cookie: Token) => {
  if (Object.keys(cookie).length == 0) return false;
  else return true;
};
/**
 * get_role(token) : 권한정보 가져오는 함수
 */
export const get_role = (token: Token) => {
  let decoded: dec_token;

  if (token.accessToken != undefined) {
    decoded = jwt(token.accessToken);
    let { roles } = decoded;
    return roles[0];
  }
  return undefined;
};

/**
 * get_id(token) : 로그인한 아이디 정보 가져오는 함수
 */
export const get_id = (token: Token) => {
  let decoded: dec_token;

  if (token.accessToken !== undefined) {
    decoded = jwt(token.accessToken);
    let { sub } = decoded;

    return sub;
  }
  return undefined;
};

/**
 * type_check(key, item) : 타입체크를 위한 함수
 * key는 항목, item은 검사대상
 */
export const type_check = (key: string, item: string) => {
  var exp = /[a-zA-Z0-9]$/; //기본 형식검사 : 영문자와 숫자로 구성된 문자열인지 검사

  if (key === "아이디" || key === "패스워드") {
    exp = /[a-zA-Z0-9]$/;
  }

  //1개이상 문자입력 필요
  if (item.length === 0) {
    alert(`${key}가 입력되지 않았습니다`);
    throw new Error(`invalid_len_error for ${key}`);
  } else {
    let i;
    for (i = 0; i < item.length; i++) {
      if (!exp.test(item[i])) {
        break;
      }
    }

    //key에 따른 형식 검사
    if (i !== item.length) {
      alert(`${key} 형식이 바르지 않습니다`);
      throw new Error(`invalid_type_error for ${key}`);
    }
  }
};
