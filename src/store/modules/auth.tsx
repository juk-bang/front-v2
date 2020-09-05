import { Token, get_role, get_id } from "../../pages/auth/Api/commonFunc";

const SIGN_IN = "auth/SIGN_IN"; // 로그인처리
const SIGN_OUT = "auth/SIGN_OUT"; // 로그아웃처리

//인증 state 인터페이스
export interface auth_state {
  login: Boolean;
  role: String;
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
  payload: { token: Token };
}

export interface signout_action {
  type: typeof SIGN_OUT;
}

export const sign_in = (token: Token): signin_action => {
  return {
    type: SIGN_IN,
    payload: { token },
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
      const { token } = action.payload;

      return {
        login: true,
        role: get_role(token),
        id: get_id(token),
      };
    case SIGN_OUT:
      return { login: false, role: "", id: "" };
    default:
      return state;
  }
}
