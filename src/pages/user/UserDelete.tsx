import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { get_login, log_out, setting_info} from "../../API/auth";
import { deleteUser } from "../../API/user";
import NavBar from "../../components/NavBar";
import { authUrl, roomUrl, userUrl } from "../../components/urls";
import "../../sass/tailwind.output.css"


const UserDelete = ({history} :RouteComponentProps) => {

  useEffect(() => {
    setting_info();
    if(get_login() === false){
      history.push(roomUrl.home);
    }},[history]);

  const delete_submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteUser().then(()=>{
        log_out();
        alert('탈퇴되었습니다.');
        history.push(authUrl.signIn);
    }).catch(()=>{
        alert('탈퇴에 실패하였습니다.');
        history.push(userUrl.userEdit);
    })
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen px-4 py-12 flex items-center justify-center sm:px-6 lg:px-8">
        <div className="max-w-md w-full border-deep-pink">
          <h2 className="mt-6 text-3xl text-center font-deep-pink">정말로 탈퇴하시겠습니까?</h2>
          <form name="form" onSubmit={delete_submit}>
          <div className="flex items-center justify-center mb-5">
              <button
                className="button-deep-pink-white w-1/6 margin-top-8"
                type="submit"
              >
                확인
              </button>

              <button
                className="ml-2 button-deep-pink-white w-1/6 margin-top-8"
                onClick={()=>history.push(userUrl.userEdit)}
              >
                취소
              </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserDelete);