export default {
  getUsers(state) {
    return state.results?.filter?.((item) => !item.is_organization) || [];
  },
  getOrganizations(state) {
    return state.results?.filter?.((item) => item.is_organization) || [];
  },
};
