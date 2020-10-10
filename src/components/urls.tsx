// room
const home = "/home";
const roomDetail = (roomId: number) => `/rooms/${roomId}`;

export const roomUrl = {
  home,
  roomDetail,
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
const userProfile = "/user/profile";

export const userUrl = {
  userProfile,
};
