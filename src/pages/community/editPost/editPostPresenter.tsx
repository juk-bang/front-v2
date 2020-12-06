import React from "react";
import MDEditor from '@uiw/react-md-editor';
import NavBar from "../../../components/NavBar";
import {Helmet} from "react-helmet"
interface IProps{
    handleChangeTitle(e:React.ChangeEvent) : void;
    onSubmit() : void;
    body: string;
    title: string;
    setBody: any;
}

const EditPostPresenter:React.FunctionComponent<IProps> = ({body, setBody,handleChangeTitle, onSubmit, title }) => {

    return <div>
        <Helmet title="죽방 | 커뮤니티 글 수정" />
    <NavBar></NavBar>
    <div className="pt-20 w-full h-full flex items-center flex-col">
        <div className="text-center font-bold text-2xl w-2/3 mt-8 bg-green-100 py-2">
            글 수정하기
        </div>
        <div className="w-2/3 h-2/3 mt-8">
            <div className="w-full">
                <textarea className="py-1 border-solid border-green-200 border-2 w-full h-10" onChange={handleChangeTitle} value={title} placeholder="제목을 입력하세요"/>
            </div>
            <MDEditor
                value={body}
                onChange={setBody}
            />
        </div>
        <button onClick={onSubmit} className="mt-10 focus:outline-none focus:shadow-outline bg-green-300 hover:bg-green-900 text-white py-2 px-4 mr-1 rounded">수정하기</button>
    </div>
    </div>;

}

export default EditPostPresenter