import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { get_id } from "../../../../API/auth";
import { getArr, getReviewList, uploadReview, deleteReview, editReview } from "../../../../API/room";
import ScoreItem from "./ScoreItem";
import {IReview} from "../../interface"
import { AxiosError, AxiosResponse } from "axios";

interface iReviewDetail extends IReview{
    roomid : number,
    update : MutableRefObject<number>,
    onChange : (change:number)=>void
}

const ReviewItem = (props:iReviewDetail) => {
    const [reviewText, _set_reviewtext] = useState(props.message);
    const [grade, _set_grade] = useState(props.grade);

    const activeReview = useRef(reviewText);
    const activeGrade= useRef(grade);

    const set_reviewText = (update:string)=>{
        activeReview.current = update;
        _set_reviewtext(update);
    }
   
    const set_grade = (update:number)=>{
        activeGrade.current = update;
        _set_grade(update);
    }

    useEffect(()=>{
        const editB = document.getElementById("edit".concat(props.id.toString()));
        if(editB !== null){
            editB.addEventListener("click", edit_listener as EventListener);        
        }   
    },[]);

    const del_review = (event : React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        deleteReview(props.id).then(()=>{
           props.onChange(props.update.current+1);
        });
    }

    const edit_review = (event: CustomEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const comment = document.getElementById(props.id.toString());
        const deleteB = document.getElementById("del".concat(props.id.toString()));
        const editB= document.getElementById("edit".concat(props.id.toString()));
        const gradeS= document.getElementById("grade".concat(props.id.toString()));

        editReview(props.id, activeReview.current, activeGrade.current).then(()=>{
            
            if(comment !== null){
                comment.setAttribute('readonly', "true");
                if(deleteB !== null){
                    deleteB.hidden = false;
                }
                if(editB !== null){
                    editB.removeEventListener("click", edit_review as EventListener);  
                    editB.addEventListener("click", edit_listener as EventListener);
                }
                if(gradeS !== null){
                    gradeS.hidden=true;
                }
                props.onChange(props.update.current+1);
            }
       }).catch((err:AxiosError)=>{
            console.log(err);
       });
    }

    const edit_listener = (event:CustomEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const comment = document.getElementById(props.id.toString());
        const deleteB = document.getElementById("del".concat(props.id.toString()));
        const editB= document.getElementById("edit".concat(props.id.toString()));
        const gradeS= document.getElementById("grade".concat(props.id.toString()));
        
        if(comment !== null){
            comment.focus();
            comment.removeAttribute('readonly');
            if(deleteB !== null){
                deleteB.hidden = true;
            }
            if(editB !== null){
                editB.removeEventListener("click", edit_listener as EventListener);  
                editB.addEventListener("click", edit_review as EventListener);
            }
            if(gradeS !== null){
                gradeS.hidden= false;
            }
        }
    }

    const edit_comment = (event : React.FormEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        set_reviewText(event.currentTarget.value);
    }

    const handle_select = (event: React.FormEvent<HTMLSelectElement>) => {
        event.preventDefault();
        set_grade(parseInt(event.currentTarget.value));
    };
    
    return(
        <div className = "m-5 flex items-center">
            <ScoreItem grade = {props.grade}></ScoreItem>
            <select defaultValue = {props.grade} id = {"grade".concat(props.id.toString())} onChange={handle_select} hidden> 
                {getArr(1,10).map((i) => {
                    return <option value = {i} key={i}> {i}</option>
                })}
            </select>
            <div style = {{position:"relative"}} className = "shadow-lg w-full ml-10 p-5 pt-10 border border-teal-400">
            {get_id() === props.writer? 
              <>
              <button id = {"del".concat(props.id.toString())} className = "button-mint-white" style={{position: "absolute", top: "1px",right: "50px"}}
                onClick = {del_review}>삭제</button>
              <button id = {"edit".concat(props.id.toString())} className = "button-mint-white" style={{position: "absolute", top: "1px",right: "2px"}}
                >수정</button>
                </>
            :null}   
                <textarea className = "w-full" id = {props.id.toString()} onChange = {edit_comment} defaultValue={props.message} readOnly></textarea>
                <div className="mt-2 text-right text-gray-600">{props.writer} | 
                {props.modifiedDate.substr(0,10)} {props.modifiedDate.substr(11,8)}</div>
            </div>

        </div>
    )
}

const RoomReview = (props:{roomid:number}) => {
    const [reviewList, set_reviewList] = useState([]);
    const [reviewText, set_reviewtext] = useState("");
    const [grade, set_grade] = useState(1);
    const [update, _set_update] = useState(0);

    const activeUpdate = useRef(update);

    const set_update = (update:number)=>{
        activeUpdate.current = update;
        _set_update(update);
    }

    const handle_textarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const { value } = event.currentTarget;
        set_reviewtext(value);
    };

    const handle_select = (event: React.FormEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { value } = event.currentTarget;
        set_grade(parseInt(value));
    };

    const upload_review = (event : React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const text = document.getElementById('inputText');
        if(reviewText === ""){
            alert('리뷰를 작성해주세요');
            return;
        }

        uploadReview(props.roomid, reviewText, grade).then(()=>{
            if(text !== null){
                set_reviewtext("");
                text.innerText = "";
            }
            set_update(update+1);
        }).catch((err:AxiosError)=>{
            if(err.response && err.response.data.message === "Forbidden"){
                alert('댓글 작성이 거부된 사용자입니다.');
            }
        });
    }

    useEffect(()=>{
        getReviewList(props.roomid).then((res:AxiosResponse)=>{
            set_reviewList(res.data);
        }).catch((err:AxiosError)=>{
            console.log(err.message);
        });
    },[update]);

    useEffect(()=>{
    },[reviewList]);

    return(
        <div className="mt-64 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-8 lg:px-20">
            <div className="mt-64 text-2xl font-bold">이전 입주자 한마디</div>
            <div className="w-2/3 margin-2">
                {reviewList.map((rev:IReview)=>{return (<ReviewItem 
                   key = {rev.id}
                   id = {rev.id}
                   writer = {rev.writer}
                   message = {rev.message}
                   grade = {rev.grade}
                   modifiedDate = {rev.modifiedDate} 
                   roomid = {props.roomid}
                   update = {activeUpdate}
                   onChange = {set_update}
                />)})
                }
                <div className = "m-5 flex items-center">
                    <div style = {{position:"relative"}} className = "shadow-lg w-full ml-10 mt-5 p-3 border border-teal-400">  
                    <form>             
                        <select name="grade" onChange={handle_select}> 
                            {getArr(1,10).map((i) => {
                                return <option value = {i} key={i}> {i}</option>;
                        })}
                        </select>
                        <span className = "text-gray-700">평점을 클릭하세요</span>
                    <textarea id = "inputText" className = "mt-3 w-full" onChange = {handle_textarea} value= {reviewText}></textarea>
                        <div className = "flex justify-end">
                            <button className = "mt-1 w-12 button-mint-white" onClick = {upload_review}>작성</button>
                        </div>
                    </form>
                    </div>        
                </div>
            </div>
        </div>
    );
}
export default RoomReview;
