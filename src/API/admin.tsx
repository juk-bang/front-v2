import baseApi from "./baseApi";

export const getPermissionRoomList = () =>
  baseApi.get(`/admin/permission/rooms`);

  export const getRoomReportList = () => 
  baseApi.get(`/admin/report/rooms`);

export const getCommunityReportList = (role:any) => 
  baseApi.get(`/admin/report/community/${role}`);

export const getCommunityReportDetail = (role:any, postId:any, postReportId:any) =>
  baseApi.get(`/admin/report/community/${role}/${postId}/${postReportId}`);
