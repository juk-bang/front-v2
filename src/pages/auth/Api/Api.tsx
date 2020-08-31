import axios from "axios";
import { Token } from "./commonFunc";

//Base Url
const allApi = axios.create({
  baseURL: "https://jukbang.codingnome.dev",
});

/**
 * check_overlap(userid) : 아이디 중복 체크 함수
 * 반환값 : 중복시 true, 중복이 아닐시 false
 */
export const check_overlap = async (userid: string) => {
  let response = await allApi.get(`/auth/checkid/${userid}`);

  if (response.status === 200) {
    return false;
  }

  return true;
};

/**
 * set_auth_token(setting) : 토큰 헤더 설정 함수
 * setting값이 true이면 헤더에 토큰인증값을 추가해준다.
 * false라면 해제한다.
 */
export default function set_auth_token(setting: boolean) {
  const token = localStorage.getItem("access_token");
  if (setting) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

/**
 * request_auth(userid, userpassword) : 사용자 인증하기 위한 함수
 * userid, userpassword를 검사하여 존재하는 사용자이면
 * 토큰값을 리턴한다.
 */
export const request_auth = async (userid: string, userpassword: string) => {
  let response = await allApi.post(`/auth/signin`, {
    id: userid,
    password: userpassword,
  });

  if (response.status === 200) {
    return response.data;
  }
};

/**
 * refresh_auth() : 토큰 재발급받기 위한 함수
 * 재발급 실패하면 로그아웃 처리
 */
export const refresh_auth = async () => {
  let refresh = localStorage.getItem("refresh_token");

  try {
    let response = await allApi.post(`/auth/refresh`, {
      refreshToken: refresh,
    });

    if (response.status === 200) {
      const new_token = response.data.accessToken;
      localStorage.setItem("access_token", new_token);
      set_auth_token(true);
    }
  } catch (error) {
    alert("토큰이 만료되어 로그아웃 됩니다");
    document.location.href = "/auth/signin";
  }
};

//회원가입 요청
export const request_join = async (
  userid: string,
  userpassword: string,
  useruniv: number,
  userrole: string
) => {
  let response = await allApi.post(`/auth/signup`, {
    id: userid,
    password: userpassword,
    univId: useruniv,
    role: userrole,
  });

  if (response.status === 200) {
    let user_token: Token = response.data;
    return user_token;
  }
};
