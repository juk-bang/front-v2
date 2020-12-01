import baseApi from "./baseApi";

export const getCommunityPostList = (univId: number, role:string) =>
  baseApi.get(`/community/${role}/${univId}`);

export const postCommunityPost = (univId:number, title:string, body:string, role:any) =>
  baseApi.post(`/community/${role}/${univId}`, {title, body});

export const getCommunityPostDetail = (univId: number, postId:number, role:string) =>
  baseApi.get(`/community/${role}/${univId}/${postId}`);

export const getCommunityPostComments = (univId: number, postId:number, role:string) =>
baseApi.get(`/community/${role}/${univId}/${postId}/comments`);

export const postCommunityPostComments = (univId: number, postId:number, body:string, role:string) =>
baseApi.post(`/community/${role}/${univId}/${postId}/comments`, {body});

export const putCommunityPostComment = (univId: number, postId:number, commentId:number, body:string, role:string) =>
baseApi.put(`/community/${role}/${univId}/${postId}/comments/${commentId}`, {body});

export const deleteCommunityPostComment = (univId: number, postId:number, commentId:number, role:string) =>
baseApi.delete(`/community/${role}/${univId}/${postId}/comments/${commentId}`);

export const deleteCommunityPost = (univId: number, postId:number, role:any) =>
baseApi.delete(`/community/${role}/${univId}/${postId}`);

export const putCommunityPost = (univId: number, postId:number, title:string, body:string, role:string) =>
  baseApi.put(`/community/${role}/${univId}/${postId}`, {title, body});

export const postReportCommunityPost = (univId: number, postId:number, type:number, detail:string, role:string) =>
  baseApi.post(`/community/${role}/${univId}/${postId}/report`, {type, detail});

