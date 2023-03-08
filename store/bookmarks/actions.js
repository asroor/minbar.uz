export default {
  getBookmarks({ commit }, params = {}) {
    return this.$axios.$get("/bookmarks/", { params }).then((response) => {
      commit("setBookmarks", response);
    });
  },
  postBookmark({ _ }, payload) {
    return this.$axios.$post(`/bookmarks/`, payload);
  },
  removeBookmark({ _ }, id) {
    return this.$axios.$delete(`/bookmarks/${id}/delete/`);
  },
};
