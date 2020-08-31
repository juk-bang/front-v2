import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { check_overlap, request_join } from "./Api/Api";
import { type_check } from "./Api/commonFunc";
import { LoginContext } from "../../components/Context";

function SignUp({ history }: any) {
  const { _signin }: any = useContext(LoginContext);
  /**
   * id_overlap_check(userid) : 아이디 중복 체크하기 위한 함수
   */
  const id_overlap_check = async (userid: string) => {
    let result = await check_overlap(userid);
    return result;
  };

  /**
   * join_check(userid, userpassword, univid) : 회원가입 값 형식 체크하기 위한 함수
   */
  const join_check = (userid: string, userpassword: string, univid: string) => {
    let univ = Number.parseInt(univid);
    type_check("아이디", userid);
    type_check("패스워드", userpassword);

    //univ 무조건 1(숭실대)로 설정
    if (univ !== 1) {
      throw new Error("wrong_univ_error");
    }
  };

  const get_token = (
    userid: string,
    userpassword: string,
    univid: string,
    userrole: string
  ) => {
    let univ = Number.parseInt(univid);
    request_join(userid, userpassword, univ, userrole).then((response: any) => {
      _signin(response);
      history.push("/home");
    });
  };

  /**
   * join_submit(event) : 타입체크 후 서버에 회원가입 요청하기 위한 함수
   * event는 회원가입 버튼 클릭시 전달되는 이벤트 target
   */
  const join_submit = async (event: any) => {
    const { userid, userpassword, useruniv, role } = event.target;
    event.preventDefault();
    try {
      if (role.value === "") {
        throw new Error("empty_role_error");
      }

      join_check(userid.value, userpassword.value, useruniv.value);

      if (await id_overlap_check(userid.value)) {
        throw new Error("exist_id_error");
      }
      get_token(userid.value, userpassword.value, useruniv.value, role.value);
    } catch (error) {
      console.log(error.message);
      if (error.message === "empty_role_error") {
        alert("계정유형을 선택해주세요");
      } else if (error.message === "wrong_univ_error") {
        alert("학교를 선택해주세요");
      } else if (error.message === "exist_id_error") {
        alert("아이디가 이미 존재합니다");
      } else {
        let msg = error.message;
        let type = msg.substring(msg.indexOf("for ") + 4, msg.length);
        if (type === "아이디") {
          userid.focus();
        } else {
          userpassword.focus();
        }
      }
    }
  };

  return (
    <div>
      <div className="container margin-left-30 margin-right-30 padding-top-15 margin-bottom-20">
        <div className="flex-column-container margin : 10 padding-10 border-deep-pink">
          <h2 className="mid font-deep-pink">회원가입</h2>
          <form name="form" onSubmit={join_submit}>
            <div className="flex-column-container padding-top-5 padding-left-5 padding-right-5">
              <label className="userid ">아이디</label>
              <input name="userid" />
            </div>

            <div className="flex-column-container padding-top-5 padding-left-5 padding-right-5">
              <label className="userpassword">비밀번호</label>
              <input name="userpassword" type="password" />
            </div>
            <div className="flex-column-container padding-top-5 padding-left-5 padding-right-5">
              <label className="useruniv">학교</label>
              <select name="useruniv">
                <option value="0"> - </option>
                <option value="1"> 숭실대 </option>
              </select>
            </div>

            <div className="flex-column-container padding-top-5 padding-left-5 ">
              <label>계정유형</label>
              <div className="margin-bottom-10">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_STUDENT"
                    key="학생
                "
                  />
                  학생
                </label>

                <label className="radio-label padding-left-15">
                  <input type="radio" name="role" value="ROLE_LANDLORD" />
                  방판매자
                </label>
                <label className="radio-label padding-left-15 ">
                  <input type="radio" name="role" value="ROLE_ADMIN" />
                  관리자
                </label>
              </div>
              <button className="button-white-deep-pink mid" type="submit">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
