import React from "react";
import icon from "../../img/logo_title.png";
interface IProps{
    handleChangeUnivValue(e:React.ChangeEvent<HTMLSelectElement>) : void;
}

let style = {
    backgroundImage: `url(${icon})`,
    height :'18rem',
    minWidth: '30rem',
    backgroundSize: '30rem',
    backgroundRepeat: `no-repeat`,
}

const HomePresenter:React.FC<IProps> = ({handleChangeUnivValue}) => {


    return <div className="bg-green-200 h-screen w-screen flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
                <div
                style= {style}
              ></div>
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