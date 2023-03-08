export default {
  FetchPosts({ commit }, params = {}) {
    return this.$axios.$get("/pages/posts/", { params }).then((res) => {
      commit("SET_POSTS", res);
    });
  },
  async FetchPostDetail({ commit }, id) {
    const postDetail = await this.$axios.$get(`/pages/posts/${id}`);
    commit("SET_POST_DETAIL", postDetail);
  },
  CreateComments({ _ }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`/pages/posts/${payload.id}/comments/create/`, payload.body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  CommentVote({ _ }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`/pages/posts/comments/${payload.id}/vote/`, {
          vote: payload.vote,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  CommentUnVote({ _ }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$delete(`/pages/posts/comments/${id}/unvote/`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async FetchComments({ commit }, id) {
    const postComments = await this.$axios.$get(`/pages/posts/${id}/comments/`);
    commit("SET_POST_COMMENTS", postComments);
  },
  CreateComplaints({ _ }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`/pages/posts/${payload.id}/complaints/`, payload.body)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
