import baseApi from "./baseApi";

export const getCommunityPostList = (univId: number) =>
  baseApi.get(`/community/all/${univId}`);

export const postCommunityPost = (univId:number, title:string, body:string) =>
  baseApi.post(`/community/all/${univId}`, {title, body});

export const getCommunityPostDetail = (univId: number, postId:number) =>
  baseApi.get(`/community/all/${univId}/${postId}`);

export const getCommunityPostComments = (univId: number, postId:number) =>
baseApi.get(`/community/all/${univId}/${postId}/comments`);

export const postCommunityPostComments = (univId: number, postId:number, body:string) =>
baseApi.post(`/community/all/${univId}/${postId}/comments`, {body});

export const deleteCommunityPost = (univId: number, postId:number) =>
baseApi.delete(`/community/all/${univId}/${postId}`);

export const putCommunityPost = (univId: number, postId:number, title:string, body:string) =>
  baseApi.put(`/community/all/${univId}/${postId}`, {title, body});

