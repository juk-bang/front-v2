import React, { useState, FormEvent, useEffect } from "react"
import NavBar from "../../components/NavBar"
import { landlordUrl, roomUrl } from "../../components/urls"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { get_role, position } from "../../API/auth"
import LocInput from "./popup/LocInput"
import { landlord_upload, room_info } from "../../API/landlord"
import {getArr, getRoomDetail, getRoomImage, postRoomImage, deleteRoomImage} from "../../API/room"
import {FiUpload} from "react-icons/fi"
import "../../sass/tailwind.output.css"
import { IRoomDetail } from "../room/interface"
import {leaseOption, roomtype} from "./interface"
import queryString from "query-string";
import { AxiosError, AxiosResponse } from "axios"
import {landlord_update} from "../../API/landlord"

export interface IProps extends RouteComponentProps{
}

export const blobToFile = (theBlob: Blob, fileName:string): File => {
  var b: any = theBlob;
  fileName = "a"+fileName+"."+b.type.split('image/')[1];
  b.lastModified = new Date();
  b.name = fileName;
  return new File([b], fileName, { type: b.type })
}

const LandlordUpload = (props: IProps) => {
  //주소정보 state로써 저장
  const [room, set_room] = useState({
    roomId : -1,
    roomName: "",
    scale: 0,
    monthlyLease: 0,
    adminExpenses : 0,
    deposit : 0,
    floor : -1,
    layout : 1,
    description  : ""
  });

  const [toggle, set_toggle] = useState(leaseOption.month);
  
  const [counter, set_counter] = useState(0);
  const [basic, set_basic] = useState(0);
  const [location, set_location] = useState({address:"",lng:0, lat:0});
  const [optionArr, set_option] = useState([false,false,false,false,false,false,false,false]);
  const [img, set_img] = useState(new Array());

  const get_room_images = async(roomId : number, pictureCount : number) =>{
    let count = 0;
    var photos = document.getElementById("photos");
    for(let i = 2 ; i <= pictureCount ; i++){
        await getRoomImage(roomId, i).then((res)=>{
          const reader = new FileReader();
          reader.onload = (e : any)=>{ 
            var imgRef = new Image();
            imgRef.src = reader.result as string;    
            const result = e.target.result;

            imgRef.onload = (e:any) =>{
            var new_photo = document.createElement("img");
            new_photo.setAttribute("width", "110");  
            new_photo.setAttribute("id",  String(count));
            new_photo.setAttribute("src", result);
            new_photo.setAttribute("class", "cursor-pointer hover:opacity-25");
            new_photo.addEventListener("click", ()=>{

            const it = img.findIndex((item)=> item.id === new_photo.id);
    
            if(it !== -1){
                if(img[it].use === true){
                  img[it].use = false;
                    new_photo.setAttribute("class","cursor-pointer opacity-25 hover:opacity-100");
                  }else{
                    img[it].use = true;
                    new_photo.setAttribute("class","cursor-pointer opacity-100 hover:opacity-25");
                  }
                }
            });       
            const file = blobToFile(res, new_photo.id); 
            img.push({file: file, id:new_photo.id, use : true});
         
            if (photos != null){ 
              photos.appendChild(new_photo); 
            }
            count++; 
          }
        }
        reader.readAsDataURL(res);      
      }).catch((err : AxiosError)=>{
          console.log('network error',i);
      });    
      
    }
    set_basic(count);
    set_counter(count);
    set_img(img)
}

  useEffect(() => {
    const {history} = props;
    if (get_role() !== position.LANDLORD) {
      history.push(roomUrl.home);
    }

    let { roomid } = queryString.parse(props.location.search);
    let roomId = parseInt(roomid as string);

    if(roomid !== undefined && roomid !== null){
      getRoomDetail(roomId).then((res : AxiosResponse<IRoomDetail>)=>{
        const detail = res.data;
        const {roomInfo, price, location} = detail;
        let room : roomtype = {
          roomId : roomId,
          roomName : roomInfo.roomName,
          scale : roomInfo.scale,
          monthlyLease : price.monthlyLease,
          adminExpenses : price.adminExpenses,
          deposit : price.deposit,
          floor : roomInfo.floor,  
          layout : roomInfo.layout,
          description : detail.description
        }

        const tog = document.getElementById("deposit");
        if(room.monthlyLease === 0){
          set_toggle(leaseOption.charter);
          room.monthlyLease = room.deposit;
          room.deposit = 0;
          if(tog !== null){
            tog.setAttribute('disabled', 'disabled');
          }    
        }else{
          set_toggle(leaseOption.month);
          if(tog !== null){
            tog.removeAttribute('disabled');
          }
        }  
        set_room(room);  
        set_location(location);

        const {option} = detail;
        const arr = [option.elevator, option.park, option.cctv, option.autoDoor,
        option.washingMachine, option.gasrange, option.refrigerator, option.airconditioner];

        arr.map((val, i)=>{
          const comp = document.getElementsByName(i.toString())[0];
          if(comp !== undefined && val === true){
            comp.click();
          }
        })

        get_room_images(roomId, detail.pictureCount);  
         
      }).catch((err)=>{
        console.log("get room info error");
        history.push(landlordUrl.landlordRooms);
      })} 
    }
  ,[]);

  useEffect(() => {
  },[room,optionArr,toggle,img, counter]);


  /**
   * submit_room(event) : 입력정보를 바탕으로 서버에 매물 등록 요청
   */
  const submit_room = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(room.roomName.length === 0){
      alert('방이름을 입력해주세요.');
      const room = document.getElementsByName('roomName');
      room[0].focus();
      return;
    }
    if(room.deposit < 0 ||
      room.adminExpenses  <= 0 ||
      room.monthlyLease <= 0 ||
      room.scale <= 0){
        alert('올바른 정보를 입력했는지 확인해주세요.');
        return;
      }
    if(location.address === ""){
      alert('주소를 입력해주세요');
      const room = document.getElementsByName('room_search');
      room[0].focus();
      return;
    }

    if(img.filter(val => val.use === true).length === 0){
      alert('사진을 하나이상 입력해주세요');
      return;
    }

    if(toggle === leaseOption.charter){
      room.deposit = room.monthlyLease;
      room.monthlyLease = 0;
    }

    let univid = localStorage.getItem('univid');
    if(univid === null){
      univid = "1";
    }
    const param : room_info = {
        univId : parseInt(univid),
        roomInfo : {
            roomName : room.roomName,
            scale : parseFloat(room.scale.toFixed(2)),
            floor : room.floor,
            layout :room.layout
        }
        ,
        price :{
          monthlyLease : Math.floor(room.monthlyLease),
          adminExpenses : Math.floor(room.adminExpenses),
          deposit : Math.floor(room.deposit)
        }
      ,
      option:{
        elevator : optionArr[0],
        park :optionArr[1],
        cctv :optionArr[2],
        autoDoor : optionArr[3],
        washingMachine :optionArr[4],
        gasrange : optionArr[5],
        refrigerator :optionArr[6],
        airconditioner :optionArr[7]
      }
      ,
      location : {
          address: location.address,
          lng : location.lng,
          lat : location.lat
      },
      description : room.description
    };

    if(room.roomId === -1){
      upload(param).then(()=>{
        props.history.push(landlordUrl.landlordRooms);
      }).catch((err)=>{
        alert('매물 업로드에 실패했습니다');
      });
    }else{
      update(param).then(()=>{
        props.history.push(landlordUrl.landlordRooms);
      }).catch((err)=>{
        alert('매물 업데이트에 실패했습니다');
      });
    }
  }

  const update = async (param : room_info) =>{
    await landlord_update(room.roomId ,param);
    const useImg = img.filter(val => val.use === true);

    await deleteRoomImage(room.roomId, 1);

    for(let i = 0 ; i < basic ; i++){
      await deleteRoomImage(room.roomId, i+2);
    }

    await postRoomImage(room.roomId, 1, useImg[0].file);    

    for(let i = 0 ; i < useImg.length ; i++){
      await postRoomImage(room.roomId, i+2, useImg[i].file);
    }
  }

  const upload = async(param:room_info)=>{
    const roomId = await landlord_upload(param);
    const useImg = img.filter(val => val.use === true);
    await postRoomImage(roomId, 1, useImg[0].file);
      
    for(let i = 0 ; i < useImg.length ; i++){
      await postRoomImage(roomId, i+2, useImg[i].file); 
    }
  }
   /**
   * img_handle(event) : 이미지 정보 저장 및 클라이언트 화면에 표시
   */
  const img_handle = (event: FormEvent<HTMLInputElement>) => {
    const match = ["image/jpeg", "image/png", "image/jpg"];
    var photos = document.getElementById("photos");
   
    const files = event.currentTarget.files;

    const maxHeight = 400*6; //정하기
    const maxWidth = 890*6; //정하기
    const arr = img;
    var count = counter;

    if (files != null && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].type !== match[0] &&
          files[i].type !== match[1] &&
          files[i].type !== match[2]
        ) {
          console.log("유효하지 않은 형식입니다");
        } else {
          const reader = new FileReader();
          reader.onload = (e : any)=>{ 
            var imgRef = new Image();
            imgRef.src = reader.result as string;    
            const res = e.target.result;

            imgRef.onload = (e:any) =>{
            /* 해상도 제한 
               if(imgRef.naturalWidth > maxWidth ||
                imgRef.naturalHeight > maxHeight ){
                  return ;
                }    
            */
            var new_photo = document.createElement("img");
            new_photo.setAttribute("width", "110");  
            new_photo.setAttribute("id",  String(count));
            new_photo.setAttribute("src", res);
            new_photo.setAttribute("class", "cursor-pointer hover:opacity-25");
            new_photo.addEventListener("click",()=>{
              const it = img.findIndex((item)=> item.id === new_photo.id);
              
              if(it !== -1){
                if(img[it].use === true){
                    img[it].use = false;
                    new_photo.setAttribute("class","cursor-pointer opacity-25 hover:opacity-100");
                }else{
                    img[it].use = true;
                    new_photo.setAttribute("class","cursor-pointer opacity-100 hover:opacity-25");
                }
              }
            });

            if(files !== null)
              arr.push({file:files[i],id:new_photo.id, use : true});
            
            if (photos != null) photos.appendChild(new_photo); 
            
            count++;
            set_counter(count);
          }
        }
          reader.readAsDataURL(files[i]);       
        }
      }
    }
    set_img(arr);
  };

  /**
   * handle_change(event) : 회원정보 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_change = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;

    if (name === "roomName") {
      set_room({
        ...room,
        roomName : value,
      });
    } else if (name === "scale"){
      set_room({
        ...room,
        scale : parseInt(value),
      });
     }  else if (name === "monthlyLease"){
      set_room({
        ...room,
        monthlyLease: parseInt(value),
      });
    } else if (name === "deposit"){
      set_room({
        ...room,
        deposit: parseInt(value),
      });
    }else if (name === "adminExpenses"){
      set_room({
        ...room,
        adminExpenses: parseInt(value),
      });
    }
  };

  /**
   * handle_select(event) : 회원정보 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_select = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
 
    if (name === "floor"){
      set_room({
        ...room,
        floor: parseInt(value),
      });
    }else if (name === "layout"){
      set_room({
        ...room,
        layout: parseInt(value),
      });
    }
    
  };

  /**
   * handle_textarea(event) : 부가설명 입력정보 저장  
   * */
  const handle_textarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;
    set_room({
      ...room,
      description : value,
    });
  };

  /**
   * handle_option(event) : 옵션정보 데이터 저장  
   * */
  const handle_option = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {name} = event.currentTarget;
    let index = parseInt(name);
    let update_option = optionArr;
  
    optionArr[index] =  !update_option[index]; 

    set_option(
        update_option
    );
  };

  /**
   * handle_toggle(event) : 월세/전세 구분하기 위한 함수  
   * */
  const handle_toggle = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const {value} = event.currentTarget;

    const tog = document.getElementById("deposit");

    if(value === leaseOption.month){
      if(tog !== null){
        tog.removeAttribute('disabled');
      }
    }else{
      if(tog !== null){
        tog.setAttribute('disabled', 'disabled');     
      }
    }
    set_toggle(value);
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-10 lg:px-12">
        <form className="mt-10 p-20 border-deep-pink">
          <h2 className="font-deep-pink margin-top-3 text-2xl">방이름</h2>
          <input value = {room.roomName} name="roomName" className="border-deep-pink padding-3 w-full" type="text" onChange={handle_change}></input>
          <h2 className="font-deep-pink margin-top-7 text-2xl">방정보</h2>

          <div className="border border-pink-400 p-5 mt-5 rounded-lg grid grid-cols-6 grid-rows-3">
            <div className="col-span-1 mid">방 평수</div>
            <div className = "col-span-2">
              <input value = {room.scale} className = "text-right" name="scale" type="number" onChange={handle_change}></input>m<sup>2</sup>
            </div>
            <div className = "col-span-1 mid">
              <select value = {toggle} id = "toggle" onChange={handle_toggle}>
                <option value = {leaseOption.month}>월세</option>
                <option value = {leaseOption.charter} >전세</option>
              </select>
            </div>
            <div className = "col-span-2">
              <input value = {room.monthlyLease} className = "text-right" name="monthlyLease" type="number" onChange={handle_change}></input>만원
            </div>
            <div className="col-span-1 mid">보증금</div>
            <div className = "col-span-2">
              <input value = {room.deposit} id = "deposit" className = "text-right" name="deposit" type="number" onChange={handle_change}></input>만원
            </div>
            <div className="col-span-1 mid">관리비</div>
            <div className = "col-span-2">
              <input value = {room.adminExpenses} className = "text-right" name="adminExpenses" type="number" onChange={handle_change}></input>만원
            </div>
            <div className="col-span-1 mid">층수</div>
            <div className = "col-span-2">
              <select value = {room.floor} name="floor" onChange={handle_select}> 
                <option value = "-1">지하</option>
                <option value = "0">반지하</option>
                {getArr(1,10).map((i) => {
                  return <option value = {i} key={i}> {i}</option>
                })}
              </select>
            </div>
            <div className="col-span-1 mid">방형태</div>
            <div className = "col-span-2">
              <select value = {room.layout} name = "layout" onChange={handle_select}>
                <option value = "1">원룸</option>
                <option value = "2">투쓰리룸</option>
              </select>
            </div>
          </div>           
          <div>
            <h2 className="font-deep-pink margin-top-10 text-2xl">옵션</h2>
            <div className="margin-5 padding-3 background-deep-pink">
            <div className = "flex">
              <div className = "flex-1">
                <label className="radio-label">
                    <input className = "w-100" type="checkbox" name="0" onInput= {handle_option} />
                     엘레베이터
                </label>
              </div>
              <div className="flex-1">
                <label className="radio-label">
                     <input type="checkbox" name="1" onInput={handle_option}/>
                      주차장
                </label>
              </div>
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="2" onInput={handle_option}/>
                     cctv
                </label>
              </div>  
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="3" onInput={handle_option}/>
                     자동문
                </label>
              </div>  
              </div>  
              <div className = "flex">
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="4" onInput={handle_option}/>
                    세탁기
                </label>
              </div>
              <div className="flex-1">  
                <label className="radio-label">
                    <input type="checkbox" name="5" onInput={handle_option}/>
                    가스레인지
                </label>
              </div>  
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="6" onInput={handle_option}/>
                    냉장고
                </label>
              </div>
              <div className="flex-1">  
                <label className="radio-label">
                    <input type="checkbox" name="7" onInput={handle_option}/>
                    에어컨
                </label>
              </div>  
              </div>
            </div>
            <div>
              <h2 className="font-deep-pink margin-top-9 text-2xl">추가설명</h2>
              <textarea value = {room.description} className="form-textarea w-full p-3" placeholder="방에 대한 추가 정보를 입력해주세요" onChange={handle_textarea}></textarea>
            </div>
            <LocInput address = {location.address} onChange={set_location}></LocInput>
            <div>
              <h2 className="font-deep-pink margin-top-9 text-2xl">매물사진</h2>
              <div className = "w-full flex flex-col justify-center">
              <label>
                <input
                    className = "w-0 h-0 opacity-0"
                    type="file"
                    name="photo"
                    multiple
                    onChange={img_handle}
                ></input>
                <FiUpload className = "cursor-pointer w-full h-10 hover:text-pink-300"/>
              </label>

              <h5 className="background-deep-pink margin-top-5 padding-3">
                shift키를 누르면 여러개 선택하실 수 있습니다<br/>
                사진을 클릭하여 해당사진의 최종 등록여부를 결정할 수 있습니다.
              </h5>
              <div className = "grid grid-cols-6" id="photos"></div>

              <button
              className="margin-top-5 mid button-deep-pink-white"
              onClick={submit_room}
              >
                방올리기
              </button>
             </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
        
}

export default withRouter(LandlordUpload);
