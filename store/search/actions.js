export default {
  GET_SEARCH_REQUEST({ commit }, params = {}) {
    return this.$axios
      .$get("search", { params })
      .then((response) => commit("setSearchResult", response));
  },
};
