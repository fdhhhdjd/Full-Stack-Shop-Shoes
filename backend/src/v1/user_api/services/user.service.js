// const CONSTANTS = require("../../configs/constants");
const {
  createAccessToken,
  createRefreshToken,
  randomString,
} = require("../../utils/helper");
// const {
//   LoginEmail,
//   LoginPhone,
//   LoginGoogle,
//   RegisterSocial,
// } = require("./userType.service");
const { UserSpam } = require("./userSpam.service");
// const { callDataGoogle, saveCookies } = require("../../utils/storage");

module.exports = {
  checkLoginUser: async ({ email_phone, password, token, GetIPUser, res }) => {
    const { status, _ttl, msg } = UserSpam(GetIPUser);
    if (status === 400) {
      return {
        status,
        success: false,
        element: {
          _ttl,
          msg,
        },
      };
    }
    let result_user = null;
    if (email_phone.includes("@") == true) {
      // result_user = await LoginEmail(email_phone, password);
    } else {
      // result_user = await LoginPhone(email_phone);
    }
    if (!result_user || result_user.success === false) {
      return {
        status: result_user?.status,
        success: result_user?.success,
      };
    }
    const accessToken = createAccessToken({ id: result_user._id });
    const refreshToken = createRefreshToken({ id: result_user._id });
    saveCookies(res, refreshToken);
    return {
      status: 200,
      success: true,
      element: {
        accessToken,
        refreshToken,
      },
    };
  },
  checkLoginGoogle: async ({ tokenId, res }) => {
    // const user_google = await callDataGoogle(tokenId);
    // const { name, email, picture } = user_google.payload;
    // let result_user = await LoginGoogle(email);
    // if (result_user) {
    //   const accessToken = createAccessToken({ id: result_user._id });
    //   const refreshToken = createRefreshToken({ id: result_user._id });
    //   saveCookies(res, refreshToken);
    //   return {
    //     status: 200,
    //     success: true,
    //     element: {
    //       accessToken,
    //       refreshToken,
    //     },
    //   };
    // } else {
    //   var password = randomString(10);
    //   let newUser = await RegisterSocial({
    //     name,
    //     email,
    //     picture,
    //     password,
    //   });
    //   if (!newUser) {
    //     return {
    //       status: 503,
    //       success: false,
    //     };
    //   }
    //   const accessToken = createAccessToken({ id: newUser._id });
    //   const refreshToken = createRefreshToken({ id: newUser._id });
    //   saveCookies(res, refreshToken);
    //   return {
    //     status: 200,
    //     success: true,
    //     element: {
    //       accessToken,
    //       refreshToken,
    //     },
    //   };
    // }
  },
  checkLoginFacebook: async ({}) => {},
};
