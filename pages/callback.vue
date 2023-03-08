<template>
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { getUrlVars } from "~/utils/parser.js";
import facebook from "~/plugins/auth/facebook.js";
import google from "~/plugins/auth/google.js";

export default {
  data() {
    return {
      loading: true,
      localAuthTypes: {
        [facebook.name]: facebook,
        [google.name]: google,
      },
    };
  },

  mounted() {
    this.parseUrlParams();
  },

  // watch: {
  //   $route: {
  //     handler: "parseUrlParams",
  //     immediate: true,
  //   },
  // },

  methods: {
    getUrlVars,

    async parseUrlParams() {
      if (!process.client) return;
      const params = getUrlVars(window.location.href);
      const authStrategy = this.$cookies.get("auth.strategy");
      // console.log("authStrategy", authStrategy);

      // console.log("params", params);

      const { url, getStrategyFields } = this.localAuthTypes[authStrategy];
      const data = await this.$axios.$post(url, getStrategyFields(params));

      // console.log("parseUrlParams data", data);
      const { user, ...props } = data;
      // console.log("[Callback]", "authStrategy", authStrategy);

      this.$cookies.set(`auth._token.local`, `Bearer ${data.access_token}`);
      this.$cookies.set(`auth._refresh_token.local`, data.refresh_token);

      await this.$axios.setToken(data.access_token, "Bearer");
      await this.$auth.setUserToken(
        data,
        data.access_token,
        data.refresh_token
      );
      await this.$auth.setUser({ ...props, ...user });
    },
  },
};
</script>
<style scoped>
.loading-page {
  position: fixed;
  top: 50%;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
}
.loading {
  display: inline-block;
  width: 4.5rem;
  height: 4.5rem;
  border: 10px solid rgba(9, 133, 81, 0.705);
  border-radius: 50%;
  border-top-color: #158876;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
