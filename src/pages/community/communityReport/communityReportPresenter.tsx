import React from "react";
import NavBar from "../../../components/NavBar";

interface IProps{
    type:any;
    setType:any;
    detail:any;
    handleClickSubmit:any;
    handleChangeDetail:any;
}

const CommunityReportPresenter:React.FC<IProps> = ({type, setType, detail, handleClickSubmit, handleChangeDetail}) => {

    const handleClickType = (e:any) => {
        setType(e.target.id);
    }

    return <div>
        <NavBar />
        <div className="pt-20 flex flex-center items-center flex-col">
            <div>
                커뮤니티 신고 페이지
            </div>
            <div>
                신고이유
            </div>
            <div>
                <div className={"w-64 h-10 border-2 border-solid border-blue-200 flex justify-center items-center " + (type == 1 ? 'bg-blue-200' : '')} id="1" onClick={handleClickType}> 욕설 </div>
                <div className={"w-64 h-10 border-2 border-solid border-blue-200 flex justify-center items-center " + (type == 2 ? 'bg-blue-200' : '')} id="2" onClick={handleClickType}> 과도한 친목 </div>
                <div className={"w-64 h-10 border-2 border-solid border-blue-200 flex justify-center items-center " + (type == 3 ? 'bg-blue-200' : '')} id="3" onClick={handleClickType}> 지속적으로 부정적 행위 </div>
            </div>
            <div>
                자세한 내용을 적어주세요
            </div>
            <div>
                <textarea name="" id="" className="outline-none resize-none border-2 border-solid border-blue-200" value={detail} onChange={handleChangeDetail}></textarea>
            </div>
            <div onClick={handleClickSubmit}>
                제출
            </div>
        </div>
    </div>
}

export default CommunityReportPresenter;