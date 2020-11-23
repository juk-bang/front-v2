import baseApi from "./baseApi";

export const getCommunityPostList = (univId: number) =>
  baseApi.get(`/community/all/${univId}`);

export const postCommunityPost = (univId:number, title:string, body:string) =>
  baseApi.post(`/community/all/${univId}`, {title, body});

export const getCommunityPostDetail = (univId: number, postId:number) =>
  baseApi.get(`/community/all/${univId}/${postId}`);

