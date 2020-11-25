import React from "react";
import MDEditor from '@uiw/react-md-editor';
import NavBar from "../../../components/NavBar";

interface IProps{
    handleChangeTitle(e:React.ChangeEvent) : void;
    onSubmit() : void;
    body: string;
    setBody: any;
}

const NewPostPresenter:React.FunctionComponent<IProps> = ({body, setBody,handleChangeTitle, onSubmit }) => {

    return <div>
        <NavBar></NavBar>
        <div className="pt-20 w-full h-full flex items-center flex-col">
            <div className="w-2/3 mt-8">
                글 작성하기
            </div>
            <div className="w-2/3 h-2/3 mt-8">
                <div className="w-full">
                    <textarea className="border-solid border-green-200 border-2 w-full h-10" onChange={handleChangeTitle} placeholder="제목을 입력하세요"/>
                </div>
                <MDEditor
                    value={body}
                    onChange={setBody}
                />
            </div>
            <button onClick={onSubmit} className="w-2/3 h-16 bg-green-400 mt-8 text-md">제출하기</button>
        </div>
    </div>;
}

export default NewPostPresenter