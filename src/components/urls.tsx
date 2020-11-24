// room
const home = "/home";
const roomDetail = (roomId: number) => `/rooms/${roomId}`;
const room ="/rooms/:roomid";

export const roomUrl = {
  home,
  roomDetail,
  room,
};

// admin
const adminHome = "/admin";
const adminReport = "/admin/report";

export const adminUrl = {
  adminHome,
  adminReport,
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
export const userUrl = {
  userInfo, userEdit, userDelete
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
const communityDetail = "/community/detail/:univId/:postId"
const getCommunityDetail = (univId:number, postId:number) => `/community/detail/${univId}/${postId}`
const editCommunityPost = "/community/edit/:postId"
const getEditCommunityPost = (univId:number, postId:number) => `/community/edit/${univId}/${postId}`
const newCommunityPost = "/community/new/:univId"
const getNewCommunityPost = (univId:number) => `/community/new/${univId}`

export const communityUrl = {
  communityPostList,
  getCommunityPostList,
  communityDetail,
  getCommunityDetail,
  newCommunityPost,
  getNewCommunityPost,
  editCommunityPost,
  getEditCommunityPost,
}