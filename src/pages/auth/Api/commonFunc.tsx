import jwt from "jwt-decode";

//토큰 타입
export type Token = {
  accessToken?: string;
  refreshToken?: string;
};

//토큰 추출 정보
type dec_token = {
  sub: string; //아이디
  roles: string; //권한
};

/**
 * get_role() : 권한정보 가져오는 함수
 */
export const get_role = () => {
  let token = localStorage.getItem("access_token");
  let decoded: dec_token;

  if (token !== null) {
    decoded = jwt(token);
    let { roles } = decoded;
    return roles[0];
  }
  return null;
};

/**
 * get_id() : 로그인한 아이디 정보 가져오는 함수
 */
export const get_id = () => {
  let token = localStorage.getItem("access_token");
  let decoded: dec_token;

  if (token !== null) {
    decoded = jwt(token);
    let { sub } = decoded;

    return sub;
  }
  return null;
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
