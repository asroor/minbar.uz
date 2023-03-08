export default {
  GET_ALL({ commit }, params = {}) {
    return this.$axios
      .$get("users/followed-pages", { params })
      .then((response) => {
        commit("setFollowers", response);
      });
  },
};
