// room
const home = "/home";
const roomDetail = (roomId: number) => `/rooms/${roomId}`;
const room ="/rooms/:roomid";
const roomReport ="/rooms/:roomid/report"
export const roomUrl = {
  home,
  roomDetail,
  room,
  roomReport
};

// admin
const adminHome = "/admin";
const adminRoomReport = "/admin/room/report";
const adminRoomPermission = "/admin/room/permission";
const adminCommunityReport = "/admin/community/report/:role";
const getAdminCommunityReport = (role:any) => `/admin/community/report/${role}`;

export const adminUrl = {
  adminHome,
  adminRoomReport,
  adminRoomPermission,
  adminCommunityReport,
  getAdminCommunityReport,
};


//auth
const signIn = "/auth/signin";
const signUp = "/auth/signup";
const signOut = "/auth/signout";

export const authUrl = {
  signIn,
  signUp,
  signOut,
};

//user
const userInfo = "/userinfo";
const userEdit = "/userinfo/edit";
const userDelete = "/userinfo/delete";
const userFavorite = "/userinfo/favorites";
const userPost = "/posts";
export const userUrl = {
  userInfo, userEdit, userDelete, userFavorite, userPost
};

//landlord
const landlordUpload = "/landlord/upload";
const landlordRooms = "/landlord/rooms";

export const landlordUrl = {
  landlordUpload,
  landlordRooms
}

//location
const locationInput = "/location/input";
const locationGet = "/lcoation/get";

export const locationUrl = {
  locationInput,
  locationGet
}

// home
export const mainHome = "/";

// community
const communityPostList = "/community/:univId"
const getCommunityPostList = (univId:number) => `/community/${univId}`
const communityDetail = "/community/detail/:role/:univId/:postId"
const getCommunityDetailAll = (univId:number, postId:number) => `/community/detail/all/${univId}/${postId}`
const getCommunityDetailStudent = (univId:number, postId:number) => `/community/detail/student/${univId}/${postId}`
const editCommunityPost = "/community/edit/:role/:univId/:postId"
const getEditCommunityPost = (univId:string, postId:string, role:string) => `/community/edit/${role}/${univId}/${postId}`
const newCommunityPost = "/community/new/:role/:univId"
const getNewCommunityPostAll = (univId:number) => `/community/new/all/${univId}`
const getNewCommunityPostStudent = (univId:number) => `/community/new/student/${univId}`
const communityReport = "/community/report/:role/:univId/:postId"
const getCommunityReport = (univId:string, postId:string, role:string) => `/community/report/${role}/${univId}/${postId}`

export const communityUrl = {
  communityPostList,
  getCommunityPostList,
  communityDetail,
  getCommunityDetailAll,
  getCommunityDetailStudent,
  newCommunityPost,
  getNewCommunityPostAll,
  getNewCommunityPostStudent,
  editCommunityPost,
  getEditCommunityPost,
  communityReport,
  getCommunityReport
}