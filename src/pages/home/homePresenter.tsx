import React from "react";

interface IProps{
    handleChangeUnivValue(e:React.ChangeEvent<HTMLSelectElement>) : void;
}

const HomePresenter:React.FC<IProps> = ({handleChangeUnivValue}) => {


    return <div className="bg-green-200 h-screen w-screen flex items-center justify-center flex-col">
        <div className="bg-green-500 w-40 h-40 flex items-center justify-center mb-16">
            메인 이미지 들어갈 자리
        </div>
        <div>
        <select name="univ" onChange={handleChangeUnivValue}>
            <option value="0">학교를 선택해 주세요</option>
            <option value="1">숭실대학교</option>
        </select>
        </div>
    </div>;
}

export default HomePresenter;