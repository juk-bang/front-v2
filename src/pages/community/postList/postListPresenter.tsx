import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import "../../../sass/tailwind.output.css";
import PostCard from "./components/postCard";
import {communityUrl} from "../../../components/urls"
import { get_role, position } from "../../../API/auth";

interface IProps{
    postList:any;
    role:any;
    setRole:any;
}

const PostListPresenter:React.FC<IProps> = ({postList, role, setRole}) => {

    let newPostUrl = "";
    const currentUnivid = localStorage.getItem("univid");
    if(currentUnivid)
        if(role == "student")
            newPostUrl = communityUrl.getNewCommunityPostStudent(parseInt(currentUnivid));
        else if (role=="all")
            newPostUrl = communityUrl.getNewCommunityPostAll(parseInt(currentUnivid));
            
    useEffect(()=>{
        const st = document.getElementById('student');
        const al = document.getElementById('all');
        if(role === "student"){
            st?.setAttribute('class', "mr-2 cursor-pointer btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-600 hover:bg-blue-900 text-white font-normal py-2 px-4 mr-1 rounded")
            al?.setAttribute('class',"cursor-pointer btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border bg-black-100 border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white font-normal py-2 px-4 rounded")
        }else if(role === "all"){
           al?.setAttribute('class', "cursor-pointer btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-600 hover:bg-blue-900 text-white font-normal py-2 px-4 mr-1 rounded")
           st?.setAttribute('class', "mr-2 cursor-pointer btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border bg-black-100 border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white font-normal py-2 px-4 rounded")
        }
    },[role])

    const handleChangeStudentRole = (e:any) => {
        if(get_role() !== position.STUDENT){
            alert('접근 불가한 페이지 입니다.');
            return;
        }
        setRole("student");
        localStorage.setItem("role", "student");
    }

    const handleChangeAllRole = (e:any) => {
        setRole("all");
        localStorage.setItem("role", "all");
    }


    return <>
        <NavBar></NavBar>
        <div className="pt-20 flex items-center justify-center flex-col">
            <div className="mb-2 w-2/3 h-16 mt-8 flex items-center justify-between">
                <div className="flex">
                    <div id = "student" className="mr-2 cursor-pointer btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border bg-black-100 border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white font-normal py-2 px-4 rounded" onClick={handleChangeStudentRole}>
                        학생 전용
                    </div>
                    <div id = "all" className="cursor-pointer btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-600 hover:bg-blue-900 text-white font-normal py-2 px-4 mr-1 rounded" onClick={handleChangeAllRole}>
                        모든 회원
                    </div>
                    
                </div>
                <Link to={newPostUrl} className="cursor-pointer btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-600 hover:bg-blue-900 text-white font-normal py-2 px-4 mr-1 rounded">
                    글쓰기
                </Link>
            </div>

            <div className="w-2/3 shadow-lg overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                <div className = "grid grid-cols-11 font-bold">            
                    <div className="col-span-5 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">제목</div>
                    <div className="col-span-1 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">조회수</div>
                    <div className="col-span-1 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">댓글수</div>
                    <div className="col-span-2 py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">작성자</div>
                    <div className="col-span-2  py-3 border-b-2 border-gray-400 text-center text-sm leading-4 text-blue-500 tracking-wider">날짜</div>  
                </div>                        
                {
                    postList ?
                    postList.map((post:any) => <PostCard id={post.postId} post={post} role={role}/>  ) : ""
                }  
            </div>
        </div>
    </>
}

export default PostListPresenter;