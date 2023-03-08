export default {
  getPerson({ commit }) {
    return this.$axios.$get("/pages/top/persons/").then((response) => {
      // console.log("response", response);
      commit("setPerson", response.results);
    });
  },
  getOrganization({ commit }) {
    return this.$axios.$get("/pages/top/organizations/").then((response) => {
      commit("setOrganization", response);
    });
  },
  followPage({ _ }, id) {
    return this.$axios.$put(`/pages/${id}/follow/`);
  },
  unfollowPage({ _ }, id) {
    return this.$axios.$put(`/pages/${id}/unfollow/`);
  },
};
