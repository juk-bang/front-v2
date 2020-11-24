import baseApi from "./baseApi";

export const editPassword = (password : string) =>
  baseApi.put(`/userinfo`, {
    password
  }); 

export const deleteUser = () =>
  baseApi.delete(`/userinfo`); 