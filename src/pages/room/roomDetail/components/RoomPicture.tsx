import { AxiosError } from "axios";
import React, { useState, useEffect, useRef } from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import { getRoomImage } from "../../../../API/room";

interface iProps{
    roomid : number,
    pircutreCount : number
}

const RoomPicture = (props: iProps) => {
    const [pic_i, set_pic_i] = useState(-1);
    const [pictures, set_pictures] = useState(new Array());
    const [show, set_show] = useState({left : false, right : false});
    const [size, set_size] = useState({width : '780px', height : '500px'});

    const get_room_images = async() =>{

        for(let i = 3 ; i <= props.pircutreCount ; i++){
            await getRoomImage(props.roomid, i).then((res)=>{
                const src = URL.createObjectURL(res);  
                pictures.push(src);
            }).catch((err : AxiosError)=>{
                console.log('network error');
             });   
        }
    }

    useEffect(()=>{

        getRoomImage(props.roomid, 1).then((res)=>{
            const src = URL.createObjectURL(res);  
            pictures.push(src);
            set_pic_i(0);
            resize(0);   
        }).catch((err : AxiosError)=>{
            console.log('network error');
         });   

        get_room_images().then(()=>{
            if(pictures.length > 1){
               set_show({...show, right : true});
            }
        })  
    },[]);

    const right_move = () => {
        var i = pic_i;
        const len = pictures.length;

        let left = show.left;
        let right = show.right;

        if(i < len - 1){
            i++;
            set_pic_i(i);
            resize(i);

            if(i === 1){
                left = true;
            }
        }

        if(i === len - 1){
            right = false;
        }
        set_show({left, right});
    }

    const left_move = () => {
        var i = pic_i;
        const len = pictures.length;

        let left = show.left;
        let right = show.right;

        if(i !== 0){
            i--;
            set_pic_i(i);
            resize(i);
            if(i === len - 2){
                right = true;
            }
        }
        if(i === 0){
            left = false;
        }

        set_show({left,right});
    }

    const resize = (i:number)=>{
        const maxWidth = 780;
        const maxHeight = 500;

        var img = new Image();
        let width, height;

        img.onload = ()=>{
            width = img.width;
            height = img.height;

            while(width > maxWidth || height > maxHeight){
                if(width > maxWidth && height > maxHeight){
                    width = 0.8 * width;
                    height = 0.8 *height;
                }
                else if(width > maxWidth){
                    width = maxWidth;
                    height = (height * maxWidth) / width; 
                }else{
                    height = maxHeight;
                    width = (width * maxHeight) / height;
                }    
            }     
            set_size({width:width.toString().concat("px"), height:height.toString().concat("px")});
        }
        img.src = pictures[i];
    }
    return(
        <div style = {{width : "800px", height : "500px"}} className = "relative mt-10 bg-gray-700 flex items-center justify-center">
            {show.left?<FaChevronLeft style = {{zIndex : 100}} id = "left" className = "absolute left-0 cursor-pointer text-3xl" onClick = {left_move}>
            </FaChevronLeft>:null}
            <img draggable = "false" alt = "roomImage" className = "justify-self-center" style = {size} src = {pictures[pic_i]}></img>
            {show.right?
            <FaChevronRight style = {{zIndex : 100}} id = "right" className="absolute right-0 cursor-pointer text-3xl" onClick ={right_move}>
            </FaChevronRight>:null}
        </div>
    );
}
export default RoomPicture;
