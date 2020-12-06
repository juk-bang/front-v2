import React from "react"
import NavBar from "../../../components/NavBar";
import {deleteRoomReport} from "../../.././API/admin"
import { withRouter,RouteComponentProps } from "react-router-dom";
import {adminUrl} from "../../../components/urls"
import {landlord_delete} from "../../../API/landlord"
import {deleteCommunityReportDetail, postCommunityReportDetail, deleteRoomReportDetail, postRoomReportDetail} from "../../../API/admin"
import {Helmet} from "react-helmet"
interface IParms{
    category:any;
    detailid:any;
    reportid:any;
}

interface IProps extends RouteComponentProps<IParms>{
    data:any;
}

const ReportDetailPresenter:React.FC<IProps> = ({data, history:{push}, match:{params:{category, detailid, reportid}}}) => {


    let reportType = ""

    const handleClickDelete = async (e:any) => {
      e.preventDefault();
      if(category == "room")
        await deleteCommunityReportDetail(detailid, reportid);
      else
        await deleteRoomReportDetail(detailid, reportid);
      push(adminUrl.adminRoomReport);
    }

    const handleClickReportDelete = async (e:any) => {
        e.preventDefault();
        if(category == "room")
          await postCommunityReportDetail(reportid);
        else
          await postRoomReportDetail(reportid);
        push(adminUrl.adminRoomReport);
    }

    if(data)
        if(data.type == "0")
            reportType="욕설";
        else if(data.type == "1")
            reportType="과도한 친목";
        else if(data.type == "2")
            reportType="지속적인 부정행위";

    return <div>
      <Helmet title="죽방 | 관리자 신고 사유" />
    <NavBar></NavBar>
    <div className="min-h-screen px-4 py-12 flex items-center justify-center sm:px-6 lg:px-8">
      <div className="max-w-md w-full shadow-lg mg-3">
        <h1 className="mt-6 text-3xl text-center text-pink-400">신고 상세정보</h1>
        <form name="form">
          <div className="flex-column-container p-10">
            <h1 className = "mb-2 text-xl">신고사유</h1>
            <div>
              {data? reportType : ""}
            </div>

            <h1 className = "mt-10 text-xl">상세사유</h1>
            <textarea value={data ? data.detail : ""} className="form-textarea w-full p-3" readOnly></textarea>
            <div className="flex">
                <button
                className="button-deep-pink-white mid padding-3 margin-top-8" type="submit" onClick={handleClickDelete}
                >
                삭제
                </button>
                <button
                className="button-deep-pink-white mid padding-3 margin-top-8" type="submit" onClick={handleClickReportDelete}
                >
                잔류
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
}

export default withRouter(ReportDetailPresenter);