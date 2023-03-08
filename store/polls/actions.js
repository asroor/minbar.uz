export default {
  getPoll({ commit }) {
    return this.$axios.$get("/polls/quiz/").then((response) => {
      commit("setPoll", response);
    });
  },
  async getPollDetail({ commit }, id) {
    const pollDetail = await this.$axios.$get(`/polls/quiz/${id}`);
    commit("SET_POLL_DETAIL", pollDetail);
  },
  PollCheck({ _ }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`/polls/quiz/send-vote/`, {
          choice_id: payload.choice_id,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
