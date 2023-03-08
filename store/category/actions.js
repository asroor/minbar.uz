export default {
  getCategory({ commit }) {
    return this.$axios.$get("/categories/").then((response) => {
      commit("setCategory", response);
    });
  },
};
