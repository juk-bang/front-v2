import React from "react";
import {BsStarFill,BsStarHalf,BsStar} from "react-icons/bs"
import { getArr } from "../../../../API/room";

interface IProps{
    grade : number
}
const ScoreItem = (props : IProps) => {

    return(<>
            {getArr(1,Math.floor(props.grade)).map((i) => {
                return <BsStarFill key = {i} className = "text-green-700 text-lg h-full"></BsStarFill> })}
            {props.grade !== Math.floor(props.grade)  ?
            <BsStarHalf className = "text-green-700 text-lg h-full"></BsStarHalf> 
            :null}
            {getArr(1, 10-Math.ceil(props.grade)).map((i) => {
                return <BsStar key = {i} className = "text-green-700 text-lg h-full"></BsStar> })}
        </>
    );
}
export default ScoreItem;
