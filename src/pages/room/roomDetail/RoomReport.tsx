import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { reportRoom } from "../../../API/room";
import NavBar from "../../../components/NavBar";
import {reportType} from "../interface"

const RoomReport = ({history} :RouteComponentProps) => {
  const [report, set_report] = useState({ type : 0, detail : "" });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const roomId = parseInt(history.location.pathname.split("/")[2]);
    reportRoom(roomId, report.type, report.detail).then(()=>{
        alert('접수되었습니다.');
        history.goBack();
    }).catch(err=>{
        alert('접수에 실패하였습니다.');
        console.log(err);
    })
  };

  const handle_select = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    set_report({...report, type : parseInt(value)});
  };

  const handle_textarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;
    set_report({ ...report, detail : value });
 }
 

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen px-4 py-12 flex items-center justify-center sm:px-6 lg:px-8">
        <div className="max-w-md w-full shadow-lg mg-3">
          <h1 className="mt-6 text-3xl text-center text-pink-400">신고하기</h1>
          <form name="form" onSubmit={submit}>
            <div className="flex-column-container p-10">
              <h1 className = "mb-2 text-xl">산고사유</h1>
              <select onClick={handle_select}>
                <option value = {reportType.falseRoom}>허위 매물</option>
                <option value = {reportType.exaggerate}>과장 광고</option>
                <option value = {reportType.notEqual}>불일치한 정보제공</option>
                <option value = {reportType.destroy}>계약 파기</option>
                <option value = {reportType.etc}>기타</option>
              </select>

              <h1 className = "mt-10 text-xl">상세사유</h1>
              <textarea onChange={handle_textarea} className="form-textarea w-full p-3" placeholder="상세한 사유를 입력해주세요"></textarea>
              <button
                className="button-deep-pink-white mid padding-3 margin-top-8" type="submit"
              >
                제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RoomReport);
