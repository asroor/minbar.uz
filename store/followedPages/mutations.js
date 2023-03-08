export default {
  setFollowedList(state, payload) {
    state.results = payload?.results || [];
    state.count = payload?.count || 0;
  },
};
