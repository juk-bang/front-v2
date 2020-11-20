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

export const userUrl = {
  userInfo,
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