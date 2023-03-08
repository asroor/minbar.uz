// eslint-disable-next-line no-unused-vars
import axios from "axios";
import local from "~/plugins/auth/local.js";
import facebook from "~/plugins/auth/facebook.js";
import google from "~/plugins/auth/google.js";

// console.log("local", local);
// console.log("google", google);

const authUrl = {
  [google.name]: google,
  [facebook.name]: facebook,
  [local.name]: local,
};

const AUTH_TYPES = ["local", "facebook", "google"];

// eslint-disable-next-line require-await
export default async function ({ app, $auth, $cookies }) {
  // console.log("[Auth] on init");
  // const authToken = $cookies?.get(`auth._token.local`);
  // const refreshToken = $cookies?.get(`auth._refresh_token.local`);

  // console.log("authToken", authToken, refreshToken);

  try {
    if (!app.$auth?.loggedIn) {
      // console.log("Not authorized");
      return;
    }

    const auth = app?.$auth || {};
    const authStrategy = auth.strategy?.name || "local";

    // console.log("authUrl", authUrl[authStrategy]);

    if (AUTH_TYPES.includes(authStrategy)) {
      // const token = auth?.strategies?.[authStrategy]?.token.get().slice(7);
      // console.log("[Plugin auth]", authStrategy, "token", token);

      // BACKEND API TO GET LOCAL TOKEN WITH SOCIAL TOKEN
      const { fetch } = authUrl?.[authStrategy];
      // console.log("auth", auth);
      fetch();

      // try {
      //   const { data } = await axios({
      //     baseURL: process.env.AXIOS_BASE_URL,
      //     method: method || "post",
      //     url,
      //     data: { access_token: token },
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }).catch((err) => {
      //     console.error(err);
      //   });

      //   console.log("[Plugin] auth data", JSON.stringify(data, null, 2));

      //   await auth.setUserToken(data.access_token, data.refresh_token);
      //   const { user, ...props } = data;
      //   await auth.setUser({ ...props, ...user });
      //   const authToken = "Bearer " + token;
      //   await auth.strategies.local.token.set("Bearer " + data.access_token);
      //   await auth.strategies[authStrategy].token.set(authToken);
      //   await app.$axios.setToken(data.access_token, "Bearer");
      // } catch (e) {
      //   console.log(e);
      // }
    }
  } catch (err) {
    // console.log("auth plugin", err);
    $auth.logout();
    $cookies.removeAll();
  }
}
