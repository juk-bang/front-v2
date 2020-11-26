import React, { useState, FormEvent, useEffect } from "react"
import NavBar from "../../components/NavBar"
import { landlordUrl, roomUrl } from "../../components/urls"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { get_role, position } from "../../API/auth"
import LocInput from "./popup/LocInput"
import { landlord_upload, room_info } from "../../API/landlord"
import {getArr, postRoomImage} from "../../API/room"
import {FiUpload} from "react-icons/fi"
import "../../sass/tailwind.output.css"
import proj4 from "proj4";

const LandlordUpload = ({history}:RouteComponentProps) => {
  //주소정보 state로써 저장
  const [room, set_room] = useState({
    room_name: "",
    room_scale: 0,
    monthly_price: 0,
    admin_price : 0,
    deposit_price : 0,
    room_floor : -1,
    room_layout : 1,
    room_description  : ""
  });

  const [counter, set_counter] = useState(0);
  const [location, set_location] = useState({location:"",x:0,y:0});
  const [option, set_option] = useState([false,false,false,false,false,false,false,false]);
  const [img, set_img] = useState(new Array());
  const [toggle, set_toggle] = useState("1");

  //접근 제어
  useEffect(() => {
    if (get_role() !== position.LANDLORD) {
      history.push(roomUrl.home);
    }

  },[history,toggle,img]);

  /**
   * submit_room(event) : 입력정보를 바탕으로 서버에 매물 등록 요청
   */
  const submit_room = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if(room.room_name.length === 0){
      alert('방이름을 입력해주세요.');
      const room = document.getElementsByName('room_name');
      room[0].focus();
      return;
    }
    if(room.deposit_price < 0 ||
      room.admin_price <= 0 ||
      room.monthly_price <= 0 ||
      room.room_scale <= 0){
        alert('올바른 정보를 입력했는지 확인해주세요.');
        return;
      }
    if(location.location === ""){
      alert('주소를 입력해주세요');
      const room = document.getElementsByName('room_search');
      room[0].focus();
      return;
    }
    if(img.filter(val => val.use === true).length === 0){
      alert('사진을 하나이상 입력해주세요');
    }

    if(toggle === "2"){
      room.deposit_price = room.monthly_price;
      room.monthly_price = 0;
    }

    const param : room_info = {
        univId : 1,
        roomInfo : {
            roomName : room.room_name,
            scale : parseFloat(room.room_scale.toFixed(2)),
            floor : room.room_floor,
            layout :room.room_layout
        }
        ,
        price :{
          monthlyLease : Math.floor(room.monthly_price),
          adminExpenses : Math.floor(room.admin_price),
          deposit : Math.floor(room.deposit_price)
        }
      ,
      option:{
        elevator : option[0],
        park :option[1],
        cctv :option[2],
        autoDoor : option[3],
        washingMachine :option[4],
        gasrange : option[5],
        refrigerator :option[6],
        airconditioner :option[7]
      }
      ,
      location : {
          address: location.location,
          lng : location.x,
          lat : location.y
      },
      description : room.room_description
    };
    
    var grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
    var wgs84 = "+proj=longlat+ellps=WGS84+datum=WGS84+no_defs"; //to
   
    var p = proj4(grs80, wgs84, [param.location.lng, param.location.lat]);
    
    param.location.lng = p[0];
    param.location.lat = p[1];

    upload(param);
  }

  const upload = (param:room_info)=>{
    landlord_upload(param).then((roomId:number)=>{
      const useImg = img.filter(val => val.use === true);
      postRoomImage(roomId, 1, useImg[0].file).then(()=>{
          
      useImg.forEach((img, i)=>{
        postRoomImage(roomId, i+2, img.file);
      });

      history.push(landlordUrl.landlordRooms);
      });
    }).catch((err)=>{
      alert('매물 올리기 실패했습니다');
    });
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

    if (name === "room_name") {
      set_room({
        ...room,
        room_name : value,
      });
    } else if (name === "room_scale"){
      set_room({
        ...room,
        room_scale : parseInt(value),
      });
     }  else if (name === "monthly_price"){
      set_room({
        ...room,
        monthly_price: parseInt(value),
      });
    } else if (name === "deposit_price"){
      set_room({
        ...room,
        deposit_price: parseInt(value),
      });
    }else if (name === "admin_price"){
      set_room({
        ...room,
        admin_price: parseInt(value),
      });
    }
  };

  /**
   * handle_select(event) : 회원정보 입력하는 동안 user상태를 저장하기 위함
   */
  const handle_select = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
 
    if (name === "room_floor"){
      set_room({
        ...room,
        room_floor: parseInt(value),
      });
    }else if (name === "room_layout"){
      set_room({
        ...room,
        room_layout: parseInt(value),
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
      room_description : value,
    });
  };

  /**
   * handle_option(event) : 옵션정보 데이터 저장  
   * */
  const handle_option = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {name} = event.currentTarget;
    let index = parseInt(name);
    let update_option = option;
    
    update_option[index] =  !update_option[index]; 
    
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

    if(value === "1"){
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
          <input name="room_name" className="border-deep-pink padding-3 w-full" type="text" onChange={handle_change}></input>
          <h2 className="font-deep-pink margin-top-7 text-2xl">방정보</h2>

          <div className="border border-pink-400 p-5 mt-5 rounded-lg grid grid-cols-6 grid-rows-3">
            <div className="col-span-1 mid">방 평수</div>
            <div className = "col-span-2">
              <input className = "text-right" name="room_scale" type="number" onChange={handle_change}></input>m<sup>2</sup>
            </div>
            <div className = "col-span-1 mid">
              <select id = "toggle" onChange={handle_toggle}>
                <option value = "1" >월세</option>
                <option value = "2" >전세</option>
              </select>
            </div>
            <div className = "col-span-2">
              <input className = "text-right" name="monthly_price" type="number" onChange={handle_change}></input>만원
            </div>
            <div className="col-span-1 mid">보증금</div>
            <div className = "col-span-2">
              <input id = "deposit" className = "text-right" name="deposit_price" type="number" onChange={handle_change}></input>만원
            </div>
            <div className="col-span-1 mid">관리비</div>
            <div className = "col-span-2">
              <input className = "text-right" name="admin_price" type="number" onChange={handle_change}></input>만원
            </div>
            <div className="col-span-1 mid">층수</div>
            <div className = "col-span-2">
              <select name="room_floor" onClick={handle_select}> 
                <option value = "-1">지하</option>
                <option value = "0">반지하</option>
                {getArr(1,10).map((i) => {
                  return <option value = {i} key={i}> {i}</option>;
                })}
              </select>
            </div>
            <div className="col-span-1 mid">방형태</div>
            <div className = "col-span-2">
              <select name = "room_layout" onClick={handle_select}>
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
                    <input className = "w-100" type="checkbox" name="0"onInput= {handle_option} />
                     엘레베이터
                </label>
              </div>
              <div className="flex-1">
                <label className="radio-label">
                     <input type="checkbox" name="1"onInput=  {handle_option}/>
                      주차장
                </label>
              </div>
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="2" onInput=  {handle_option}/>
                     cctv
                </label>
              </div>  
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="3"  onInput=  {handle_option}/>
                     자동문
                </label>
              </div>  
              </div>  
              <div className = "flex">
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="4" onInput=  {handle_option}/>
                    세탁기
                </label>
              </div>
              <div className="flex-1">  
                <label className="radio-label">
                    <input type="checkbox" name="5" onInput=  {handle_option}/>
                    가스레인지
                </label>
              </div>  
              <div className="flex-1">
                <label className="radio-label">
                    <input type="checkbox" name="6" onInput= {handle_option}/>
                    냉장고
                </label>
              </div>
              <div className="flex-1">  
                <label className="radio-label">
                    <input type="checkbox" name="7" onInput=  {handle_option}/>
                    에어컨
                </label>
              </div>  
              </div>
            </div>
            <div>
              <h2 className="font-deep-pink margin-top-9 text-2xl">추가설명</h2>
              <textarea name = "room_description" className="form-textarea w-full p-3" placeholder="방에 대한 추가 정보를 입력해주세요" onChange={handle_textarea}></textarea>
            </div>
            <LocInput onChange={set_location}></LocInput>
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
