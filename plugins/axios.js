import axios from "axios";

export default function (app, inject) {
  const { $axios, $cookies, store } = app;
  const authStrategy = $cookies.get("auth.strategy");

  $axios.onRequest((config) => {
    const authToken = $cookies?.get(`auth._token.local`);
    const strategyToken = $cookies?.get(`auth._token.${authStrategy}`);

    // console.log(
    //   "Base URL",
    //   authToken,
    //   config.baseURL,
    //   config.method,
    //   config.url
    // );

    $axios.setHeader("Content-Type", "application/json");

    if (/^https?:\/\//.test(config.url)) {
      return $axios.setHeader("Authorization", strategyToken);
    } else if (
      authToken &&
      /minbar.uz/i.test(config.baseURL) &&
      !/(google|facebook)/i.test(config.url)
    ) {
      $axios.setHeader("Authorization", authToken);
    } else {
      $axios.setHeader("Authorization", null);
    }
  });

  $axios.onResponseError((error) => {
    // console.log("onResponseError", error?.response?.data);
    // console.log("onResponseError", error);
    const { status } = error?.response || {};
    const refreshToken = $cookies.get("auth._refresh_token.local");
    const isRefreshing = store.state.refreshing;

    if (status === 401 && !isRefreshing) {
      if (refreshToken) {
        store.commit("setRefreshing", true);
        return axios({
          url: process.env.AXIOS_BASE_URL + "/users/auth/token/refresh/",
          method: "POST",
          data: {
            refresh: refreshToken,
          },
        })
          .then((res) => {
            const { access } = res?.data || {};
            console.log("access", access);
            $cookies.set(`auth._token.local`, `Bearer ${access}`);
            $axios.setHeader("Authorization", `Bearer ${access}`);

            return store.dispatch("nuxtServerInit").then(() => {
              store.commit("setRefreshing", false);
            });
          })
          .catch(() => {
            return $cookies.removeAll();
          });
      }
    }
  });
}
