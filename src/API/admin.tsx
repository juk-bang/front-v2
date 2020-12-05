import baseApi from "./baseApi";

export const getPermissionRoomList = () =>
  baseApi.get(`/admin/permission/rooms`);

export const postPermissionRoom = (univid:any, postId:any) =>
  baseApi.post(`/admin/permission/${univid}/${postId}`);

export const deletePermissionRoom = (univid:any, postId:any) =>
  baseApi.delete(`/admin/permission/${univid}/${postId}`);

export const getRoomReportList = () => 
  baseApi.get(`/admin/report/rooms`);

export const getRoomReportDetail = (roomId:any, roomReportId:any) =>
  baseApi.get(`/admin/report/rooms/${roomId}/${roomReportId}`);

export const deleteRoomReport = (roomId:any, reportId:any) =>
baseApi.delete(`/admin/report/rooms/${roomId}/${reportId}`);

export const getCommunityReportList = (role:any) => 
  baseApi.get(`/admin/report/community/${role}`);

export const getCommunityReportDetail = (role:any, postId:any, postReportId:any) =>
  baseApi.get(`/admin/report/community/${role}/${postId}/${postReportId}`);

export const postCommunityReportDetail = (reportId:any) =>
  baseApi.delete(`/admin/report/rooms/${reportId}`);

export const deleteCommunityReportDetail = (postId:any, reportId:any) =>
  baseApi.delete(`/admin/report/rooms/${postId}/${reportId}`);

  export const postRoomReportDetail = (reportId:any) =>
  baseApi.delete(`/admin/report/community/${reportId}`);

export const deleteRoomReportDetail = (postId:any, reportId:any) =>
  baseApi.delete(`/admin/report/community/${postId}/${reportId}`);


