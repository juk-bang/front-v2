import axios from "axios";
import { Token } from "./commonFunc";
import store from "../../../store";
import { set_auth } from "../../../store/modules/auth_cookie";

//Base Url
const allApi = axios.create({
  baseURL: "https://jukbang.codingnome.dev",
});

/**
 * check_overlap(userid) : 아이디 중복 체크 함수
 */
export const check_overlap = async(userid: string) => {
  await allApi.get(`/auth/checkid/${userid}`);
};

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

  return response.data;
};

/**
 * refresh_auth() : 토큰 재발급받기 위한 함수
 */
export const refresh_auth = async () => {
  const {
    cookies: { refreshToken },
  } = store.getState().auth_cookie;
  allApi
    .post(`/auth/refresh`, {
      refreshToken: refreshToken,
    })
    .then((response) => {
      const new_token = {
        accessToken: response.data.accessToken,
        refreshToken: refreshToken,
      };
      store.dispatch(set_auth(new_token));
    });
};

/**
 * request_join(userid, userpassword,useruniv,userrole) : 회원가입요청 함수
 */
export const request_join = async (
  userid: string,
  userpassword: string,
  useruniv: number,
  userrole: string
) => {
  const response = await allApi.post(`/auth/signup`, {
    id: userid,
    password: userpassword,
    univId: useruniv,
    role: userrole,
  });

  let user_token: Token = response.data;
  return user_token;
};
