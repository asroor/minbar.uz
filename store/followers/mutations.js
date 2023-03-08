export default {
  setFollowers(state, payload) {
    state.items = payload;
    state.results = payload.results;
    state.count = payload.count;
  },
};
