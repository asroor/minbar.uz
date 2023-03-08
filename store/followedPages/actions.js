export default {
  fetchFollowedPages({ commit }) {
    return this.$axios.get("/users/followed-pages/").then((res) => {
      commit("setFollowedList", res?.data);
    });
  },
};
