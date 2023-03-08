export default {
  setSearchResult(state, payload) {
    state.items = payload.results;
  },
};
