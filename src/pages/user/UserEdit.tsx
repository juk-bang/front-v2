import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { get_login, setting_info, type_check } from "../../API/auth";
import { editPassword } from "../../API/user";
import NavBar from "../../components/NavBar";
import { roomUrl, userUrl } from "../../components/urls";


const UserEdit = ({history} :RouteComponentProps) => {
  const [user, set_user] = useState({ passCheck: "", userpassword: "" });

  //로그인 상태에서 새 로그인 방지
  useEffect(() => {
    setting_info();
    if(get_login() === false){
      history.push(roomUrl.home);
    }},[history]);

  const pass_check = () => {
    if(user.passCheck !== user.userpassword){
        throw new Error("not equal error");
    }
    type_check("패스워드", user.userpassword);
  };

  const edit_submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      pass_check();
      editPassword(user.userpassword).then(()=>{
          alert('비밀번호가 변경되었습니다.');
          history.push(userUrl.userInfo);
      }).catch(()=>{
          alert('비밀번호 변경에 실패하였습니다.');
      })
    } catch (error) {
      let msg = error.message;
      if(msg === "not equal error"){
          alert('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  /**
   * handle_change(event) : 비밀번호 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_change = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    if (name === "password") {
      set_user({
        ...user,
        userpassword: value,
      });
    } else
      set_user({
        ...user,
        passCheck: value,
      });
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen px-4 py-12 flex items-center justify-center sm:px-6 lg:px-8">
        <div className="max-w-md w-full border-deep-pink">
          <h2 className="mt-6 text-3xl text-center font-deep-pink">정보수정</h2>
          <form name="form" onSubmit={edit_submit}>
            <div className="flex-column-container mt-5 pl-5 pr-5">
              <input className = "border border-gray-300 rounded-md" 
              name="passCheck" 
              type = "password"
              placeholder = "변경할 비밀번호 입력"
              onChange={handle_change} />
            </div>
            <span className = ""></span>
            <div className="flex-column-container p-5">
              <input className = "border border-gray-300 rounded-md"
                name="password"
                type="password"
                placeholder = "동일 비밀번호 재입력"
                onChange={handle_change}
              />
            </div>
            <div className="flex-column-container">
              <button
                className="button-deep-pink-white mid padding-3 margin-top-8"
                type="submit"
              >
                비밀번호 변경
              </button>

              <Link
                className="mid border-white padding-7 padding-top-9px font-deep-pink background-pink"
                type="submit"
                to={userUrl.userDelete}
              >
                삭제하기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserEdit); 