const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch("category/getCategory");
      await dispatch("person/getPerson");
      await dispatch("person/getOrganization");
      await dispatch("polls/getPoll"); // xatolik yuzaga keldi shu yuzdan komment qildim vaqtinchalik
      // await dispatch("post/FetchPosts"); // index pageda fetch borligi uchun komment qildim
    } catch (err) {
      console.error("[Vuex] nuxtServerInit", err);
    }
  },
};

const state = () => ({
  messages: {
    visible: false,
    text: "Ok",
    type: "success",
    duration: 3000,
  },

  refreshing: false,
});

const mutations = {
  Toast(state, messages) {
    state.messages = messages;
  },

  setRefreshing(state, data) {
    state.refreshing = Boolean(data);
  },
};

export default { state, mutations, actions };
