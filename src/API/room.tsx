import { AxiosResponse, AxiosError } from "axios";
import baseApi from "./baseApi";

export const getRoomList = (univId: number, param:any) =>
  baseApi.get(`/rooms?univId=${univId}${param}`);

export const getRoomThumbnail = async(roomId: number)=>{
  const response = await baseApi.get(
    `/rooms/${roomId}/images/1`, 
    {responseType: "blob"
  });
  return response.data;
}

export const postRoomThumbnail = (roomId: number) =>
    baseApi
      .post(`/rooms/${roomId}/images/1`)
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return "error";
  });  

export const getFavoriteRooms = () =>
  baseApi.get(`/user/favorites`);

export const getRoomImage = async(roomId:number, imgId:number) =>{
  const response = await baseApi.get(
    `/rooms/${roomId}/images/${imgId}`, 
      {responseType: "blob"});

  return response.data;

}

export const postRoomImage = async(roomId:number, imgId:number, file:File|Blob) =>{
  let formData = new FormData();
  formData.append("image", file);  
  
  await baseApi
  .post(`/rooms/${roomId}/images/${imgId}`, formData, 
    {headers: {
      'Content-Type': 'multipart/form-data'
    }})
  .then((response: AxiosResponse<string>) => {
    return response;
  }).catch((err:AxiosError)=>{
    return "error";
  });
}

export const deleteRoomImage = async (roomId :number, imgId:number)=>{
  await baseApi.delete(`/rooms/${roomId}/images/${imgId}`); 
}

export const getRoomDetail = (roomId: number) =>
  baseApi.get(`/rooms/${roomId}`); 

  //방 리뷰
export const getReviewList = (roomId: number) =>
  baseApi.get(`/review/${roomId}`);

export const uploadReview = (roomId: number, message : string, grade : number) =>
  baseApi.post(`/review/${roomId}`,{
    message, grade
  }); 

export const editReview = (reviewId: number, message : string, grade : number) =>
  baseApi.put(`/review/${reviewId}`,{
    message, grade
  }); 
  
export const deleteReview = (reviewId: number) =>
  baseApi.delete(`/review/${reviewId}`);   

//신고
export const reportRoom = (roomId: number, type : number, detail : string) =>
  baseApi.post(`/rooms/${roomId}/report`, {
    type, detail  
  });   

//찜
export const getFavoriteList = async () => {
    const res = await baseApi.get(`/user/favorites`);
    return res.data;
}

export const postFavorite = async (roomId : number) => {
  await baseApi.post(`/user/favorites/${roomId}`);
}

export const deleteFvorite = async (roomId : number) => {
  await baseApi.delete(`/user/favorites/${roomId}`);
}
  
//배열리턴
export const getArr = (start : number, end : number): number[] => {
  let floor = [];
  for (let i = start; i <= end ; i++) {
    floor.push(i);
  }
  return floor;
};

export const getRecommandFilter = (univId:any) =>
  baseApi.get(`/rooms/filter/${univId}`);