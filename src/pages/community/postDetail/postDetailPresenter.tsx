import React from "react";
import { Link, withRouter,  RouteComponentProps} from "react-router-dom";
import NavBar from "../../../components/NavBar";
import {communityUrl} from "../../../components/urls";
import CommentsCard from "./components/commentsCard"
import {get_id} from ".././../../API/auth"

interface MatchParams {
    univId: string;
    postId: string;
  }

interface IProps extends RouteComponentProps<MatchParams>{
    newComment:string | number | readonly string[] | undefined;
    handleClickSubmitComment(e:React.MouseEvent<HTMLDivElement>) : void;
    handleChangeComment(e:React.ChangeEvent<HTMLTextAreaElement>) : void;
    postData:any;
    commentsData:any;
    deletePost():void;
    getCommentsData:any;
}

const PostDetailPresenter:React.FC<IProps> = ({newComment, handleClickSubmitComment, postData, handleChangeComment, commentsData, deletePost, getCommentsData, match:{params}}) => {

    return <div>
        <NavBar />
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="flex items-center justify-between w-2/3">
                <div className="flex items-center justify-center">
                    {
                        postData ? get_id() == postData.writer ? <><Link to={communityUrl.getEditCommunityPost(params.univId, params.postId)} className="w-24 h-12 bg-blue-200 flex items-center justify-center mr-8">
                        수정
                    </Link>
                    <div className="w-24 h-12 bg-blue-200 flex items-center justify-center" onClick={deletePost}>
                        삭제
                    </div></> : "" : ""
                    }
                    
                </div>
                <div className="flex items-center justify-center">
                    <Link to={communityUrl.getCommunityPostList(parseInt(params.univId))} className="w-24 h-12 bg-blue-200 flex items-center justify-center mr-8">
                        글목록
                    </Link>
                    <Link className="w-24 h-12 bg-blue-200 flex items-center justify-center" to={communityUrl.getCommunityReport(params.univId, params.postId)}>
                        신고
                    </Link>
                </div>
            </div>
            <div className="flex flex-col w-2/3 pt-8">
                <div className="flex justify-center items-center bg-blue-500 h-16">
                    <div>
                        {postData ? postData.title : ""}
                    </div>
                </div>
                <div className="flex justify-between items-center px-12 mt-4 bg-blue-400 h-12">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center mr-24">
                            수정날짜
                        </div>
                        <div className="flex justify-center items-center">
                            조회수
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center mr-24">
                            댓글수 
                        </div>
                        <div className="flex justify-center items-center">
                            글쓴이
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center px-12 bg-blue-300 h-12">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center mr-24">
                            {postData ? postData.updatedDate.slice(0, 10) : ""}
                        </div>
                        <div className="flex justify-center items-center">
                            {postData ? postData.views : ""}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center mr-24">
                        {commentsData ? commentsData.length : ""} 
                        </div>
                        <div className="flex justify-center items-center">
                        {postData ? postData.writer : ""} 
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-blue-100 h-64">
                    {postData ? postData.body : ""}
                </div>
                <div className="mt-10">
                    <div>
                        Comments
                    </div>
                    {
                        commentsData ? commentsData.map((commentData:any) => {
                            return <CommentsCard commentData={commentData} key={parseInt(commentsData.commentsId)} getCommentsData={getCommentsData}/>;
                        }) : ""
                    }
                </div>
                <div className="mt-10">
                    <div>댓글 쓰기</div>
                    <textarea onChange={handleChangeComment} name="" id="" cols={30} rows={10} value={newComment} className="outline-none border-2 border-solid border-green-300 w-full"></textarea>
                    <div className="w-full flex justify-end items-center pr-32 ">
                        <div onClick={handleClickSubmitComment} className="pl-full h-20 w-24 bg-green-300 flex justify-center items-center">댓글 제출</div>
                    </div>
                    
                </div>
            </div>
        </div>
        </div>;
}

export default withRouter(PostDetailPresenter);