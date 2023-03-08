const likeMutation = ({ likesKey, likesVal, postItem = {} }) => {
  const likesKeyAlternate = likesKey === "likes" ? "dislikes" : "likes";
  const likedKey = likesKey === "likes" ? "liked" : "disliked";
  const likedKeyAlternate = likesKey === "likes" ? "disliked" : "liked";

  if (!postItem.actions[likedKey]) {
    postItem.actions[likedKey] = true;
    postItem[likesKey] += Math.abs(likesVal);

    if (postItem.actions[likedKeyAlternate]) {
      postItem.actions[likedKeyAlternate] = false;
      postItem[likesKeyAlternate] -= Math.abs(likesVal);
    }
  } else {
    postItem.actions[likedKey] = false;
    postItem[likesKey] -= Math.abs(likesVal);
  }
};

export default {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POST_DETAIL(state, postDetail) {
    state.postDetail = postDetail;
  },
  SET_POST_COMMENTS(state, postComments) {
    state.postComments = postComments;
    // console.log(state.postComments);
    // #FIXME
  },
  SET_POST_AUTHOR_FOLLOW_STATE(state, { id, followState }) {
    const f = state.posts?.results?.findIndex((post) => post.author.id === id);

    if (~f) {
      state.posts.results[f].author.followed = followState;
    }
  },
  SET_POST_LIKE_STATE(state, { likesKey, likesVal }) {
    likeMutation({
      likesKey,
      likesVal,
      postItem: state.postDetail,
    });
  },

  SET_POST_LIKE_STATE_BY_ID(state, { postId, likesKey, likesVal }) {
    const f = state.posts.results.findIndex((post) => post.id === postId);

    if (~f) {
      likeMutation({
        likesKey,
        likesVal,
        postItem: state.posts.results[f],
      });
    }
  },
  SET_POST_BLOCK(state, postId) {
    state.posts.results = state.posts.results.filter(i => i.id !== postId)
  }
};
