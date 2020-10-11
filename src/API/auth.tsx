import { AxiosError } from "axios";
import { refresh_auth } from "../pages/auth/Api";
import store from "../store";

import { auth_state, sign_in, sign_out } from "../store/modules/auth";
import { get_cookie, remove_cookie, set_cookie } from "./cookie";

//권한 상수
export const ADMIN = "ROLE_ADMIN";
export const LANDLORD = "ROLE_LANDLORD";
export const STUDENT= "ROLE_STUDENT";

//토큰 타입
export interface Token{
  accessToken: string,
  refreshToken: string;
};
export interface AccessToken{
  accessToken :string
}
export interface RefreshToken{
  refreshToken :string
}

/**
* set_token(token) : 토큰값 쿠키에 설정
* 파라미터 : Token데이터 타입값 필요
*/
export const set_token = (token: Token) : void =>{
  set_cookie("accessToken", token.accessToken); //10분
  set_cookie("refreshToken", token.refreshToken,60*24*7); //일주일
}

/**
* remove_token(token) : 토큰값 쿠키로부터 제거
*/
export const remove_token = () : void=>{
  remove_cookie("accessToken");
  remove_cookie("refreshToken");
}

/**
* log_in(token) : 토큰값을 이용해 로그인 
*/
export const log_in = (token: Token) : void=> {
  set_token(token);
  store.dispatch(sign_in());
};

/**
* log_out() : 로그아웃 처리 
*/
export const log_out = () : void => {
  remove_token();
  store.dispatch(sign_out());
};

/**
 * refresh_request(refreshToken) : 토큰 재발급받기 위한 함수
 */
export const refresh_request = (refreshToken : string) : boolean => {
  refresh_auth(refreshToken).then((response :string) => {
    remove_cookie("accessToken");
    set_cookie("accessToken", response);
    return true;
  }).catch((err : AxiosError) => {
    //에러처리
    alert('세션이 종료되었습니다. 다시 로그인해주세요');
    log_out();
    return false;
  })

  return false;
};

/**
* get_token(event) : 토큰값 리턴, 쿠키에 있는 엑세스토큰, 리프래시 토큰정보를 얻어 반환
* 엑세스 토큰이 존재하지 않으면 리프레시 토큰으로 갱신
* 반환값 : Token 타입 
*/
export const get_token = () : Token | null=> {
  const accessToken = get_cookie("accessToken");
  const refreshToken = get_cookie("refreshToken");
  let token: Token;

  if (accessToken !== null && refreshToken !== null) {
    token = { accessToken, refreshToken };
    return token;
  }else if(accessToken === null && refreshToken !== null){
    if(refresh_request(refreshToken) === false){
      return null;
    }
    const new_access = get_cookie("accessToken");
    if(new_access !== null){
      token = {accessToken : new_access, refreshToken};
      return token;
    }
  }
  return null;
};

/**
* setting_info() : 토큰과 로그인 상태 맞추기, 전역변수 auth와 쿠키상태를 동일하게 맞춘다
*/
export const setting_info = ()  : void =>{
    const auth : auth_state = store.getState().auth;
    const token = get_token();

    if (token !== null) {
      if (auth.login === false) {
        store.dispatch(sign_in());
      }
    } else {
      if (auth.login === true) {
        store.dispatch(sign_out());
      }
    }
}

/**
* get_role() : 현재 role 리턴, 없으면 ""리턴
*/
export const get_role = () => {
  const auth : auth_state = store.getState().auth 
  return auth.role;
};

/**
* get_id() : 현재 id 리턴, 없으면 ""리턴
*/
export const get_id = () => {
  const auth : auth_state = store.getState().auth 
  return auth.id;
};

/**
* get_login() : login상태 리턴, 있으면 true 없으면 false리턴
*/
export const get_login = () => {
  const auth : auth_state = store.getState().auth 
  return auth.login;
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

