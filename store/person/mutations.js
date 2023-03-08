export default {
  setPerson(state, payload) {
    state.people = payload;
  },

  setPersonFollowedById(state, { id, followState } = {}) {
    const f = state.people.findIndex((item) => item.id === id);

    if (~f) {
      state.people[f].followed = Boolean(followState);
    }
  },
  setOrganization(state, payload) {
    state.organizations = payload;
  },
};
