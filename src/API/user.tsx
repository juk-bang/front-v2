import baseApi from "./baseApi";

export const editPassword = (password : string) =>
  baseApi.put(`/userinfo`, {
    password
  }); 

export const deleteUser = () =>
  baseApi.delete(`/userinfo`); 

export const postUserFavorites = (postId:any) =>
  baseApi.post(`/user/favorites/${postId}`);

export const getUserFilter = () =>
baseApi.get("/user/filter");
