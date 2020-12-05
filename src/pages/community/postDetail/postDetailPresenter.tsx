import React from "react";
import { Link, withRouter,  RouteComponentProps} from "react-router-dom";
import NavBar from "../../../components/NavBar";
import {communityUrl} from "../../../components/urls";
import CommentsCard from "./components/commentsCard"
import {get_id} from ".././../../API/auth"

interface MatchParams {
    univId: string;
    postId: string;
    role:string;
  }

interface IProps extends RouteComponentProps<MatchParams>{
    newComment:string | number | readonly string[] | undefined;
    handleClickSubmitComment(e:React.MouseEvent<HTMLDivElement>) : void;
    handleChangeComment(e:React.ChangeEvent<HTMLTextAreaElement>) : void;
    postData:any;
    commentsData:any;
    deletePost():void;
    getCommentsData:any;
    role:any;
}

const PostDetailPresenter:React.FC<IProps> = ({newComment, handleClickSubmitComment, postData, handleChangeComment, commentsData, deletePost, getCommentsData, match:{params}}) => {

    return <div>
        <NavBar />
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="flex items-center justify-between w-2/3">
                <div className="flex items-center justify-center">
                    {
                        postData ? get_id() == postData.writer ? <><Link to={communityUrl.getEditCommunityPost(params.univId, params.postId, params.role)} className="mt-10 focus:outline-none focus:shadow-outline bg-green-300 hover:bg-green-900 text-white py-2 px-4 mr-1 rounded">
                        수정
                    </Link>
                    <div className="cursor-pointer mt-10 focus:outline-none focus:shadow-outline bg-green-300 hover:bg-green-900 text-white py-2 px-4 mr-1 rounded" onClick={deletePost}>
                        삭제
                    </div></> : "" : ""
                    }
                    
                </div>
                <div className="flex items-center justify-center">
                    <Link to={communityUrl.getCommunityPostList(parseInt(params.univId))} className="mt-10 focus:outline-none focus:shadow-outline bg-green-300 hover:bg-green-900 text-white py-2 px-4 mr-1 rounded">
                        글목록
                    </Link>
                    <Link className="mt-10 focus:outline-none focus:shadow-outline bg-green-300 hover:bg-green-900 text-white py-2 px-4 mr-1 rounded" to={communityUrl.getCommunityReport(params.univId, params.postId, params.role)}>
                        신고
                    </Link>
                </div>
            </div>
            <div className="flex flex-col w-2/3 pt-8">
                <div className="font-bold flex justify-center items-center border border-blue-300 rounded h-16 bg-blue-100">
                    <div>
                        {postData ? postData.title : ""}
                    </div>
                </div>
                <div className="flex justify-end items-center px-12 bg-blue-200 h-12">
                    <div className="text-green-700 flex justify-between items-center">
                        <div className=" mr-10">
                            {postData ? postData.updatedDate.slice(0, 10) : ""}
                        </div>
                        <div className="mr-10 flex justify-center items-center">
                          <b className = "mr-2">조회</b>  {postData ? postData.views : ""}
                        </div>
                        <div className="flex justify-center items-center">
                            <b className = "mr-2">작성자</b>   {postData ? postData.writer : ""} 
                        </div>
                    </div>
                </div>
                <div className="border border-green-700 opacity-70 h-64 p-5">
                    {postData ? postData.body : ""}
                </div>
                <div className="mt-10">
                    <div className = "font-bold text-2xl">
                        Comments
                    </div>
                    {
                        commentsData ? commentsData.map((commentData:any) => {
                            return <CommentsCard commentData={commentData} key={parseInt(commentsData.commentsId)} getCommentsData={getCommentsData} role={params.role}/>;
                        }) : ""
                    }
                </div>
                <div className="mt-5">
                    <textarea onChange={handleChangeComment} name="" id="" cols={30} rows={10} value={newComment} className="p-2 shadow-lg outline-none border-2 border-solid border-green-300 w-full h-32"></textarea>
                    <div className="w-full flex justify-end items-center ">
                        <div onClick={handleClickSubmitComment} className="cursor-pointer mt-10 focus:outline-none focus:shadow-outline bg-blue-300 hover:bg-blue-900 text-white py-2 px-4 mr-1 rounded">댓글 제출</div>
                    </div>
                    
                </div>
            </div>
        </div>
        </div>;
}

export default withRouter(PostDetailPresenter);