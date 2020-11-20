import jwt from "jwt-decode";
import { get_token, Token } from "../../API/auth";

const SIGN_IN = "auth/SIGN_IN"; // 로그인처리
const SIGN_OUT = "auth/SIGN_OUT"; // 로그아웃처리

//인증 state 인터페이스
export interface auth_state {
  login: boolean;
  role: string;
  id: string;
}

//초기 인증상태
const initialState: auth_state = {
  login: false,
  role: "",
  id: "",
};

export interface signin_action {
  type: typeof SIGN_IN;
}
export interface signout_action {
  type: typeof SIGN_OUT;
}

export const sign_in = (): signin_action => {
  return {
    type: SIGN_IN,
  };
};
export const sign_out = (): signout_action => {
  return {
    type: SIGN_OUT,
  };
};

export type auth_action = signin_action | signout_action;

export default function auth(
  state: auth_state = initialState,
  action: auth_action
) {
  switch (action.type) {
    case SIGN_IN:
      const token = get_token();
      if(token === null || token === false || token === true){
        return { login: false, role: "", id: "" };
      }else {
        return {
          login: true,
          role: get_role(token),
          id: get_id(token),
        };
      }
    case SIGN_OUT:
      return { login: false, role: "", id: "" };
    default:
      return state;
  }
}

/*-------------토큰 정보로 회원정보 조회할 때 쓰이는 모듈------------*/
interface dec_token {
  sub: string;
  roles: string;
}

/**
 * get_role(token) : 권한정보 가져오는 함수
 */
const get_role = (token: Token) : string => {
  let decoded: dec_token;

  if (token.accessToken !== undefined) {
    decoded = jwt(token.accessToken);
    let { roles } = decoded;
    return roles[0];
  }
  return "";
};

/**
 * get_id(token) : 로그인한 아이디 정보 가져오는 함수
 */
const get_id = (token: Token) => {
  let decoded: dec_token;

  if (token.accessToken !== undefined) {
    decoded = jwt(token.accessToken);
    let { sub } = decoded;

    return sub;
  }
  return "";
};