export default {
  setPoll(state, payload) {
    state.polls = payload;
    // console.log(payload);
  },
  SET_POLL_DETAIL(state, payload) {
    state.detail = payload;
  },
};
