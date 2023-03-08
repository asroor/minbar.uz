<template>
  <div class="space-y-4 sm:space-y-6">
    <div class="box">
      <div v-if="post" class="post">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <img
              :src="post.author.picture || avatarPerson"
              alt="abdulazim ziyouddin"
              class="w-14 h-14 rounded-full flex-shrink-0 object-cover object-top"
            />
            <p class="leading-tight">
              <strong class="block font-medium text-gray-600"
                >{{ post.author.name }}
                <button
                  class="text-blue-500 hover:underline"
                  :class="{ 'ml-2 !text-gray-400': post.author.followed }"
                  :disabled="!isLoggedIn"
                  @click="PageFollow(post.author)"
                >
                  Kuzatish
                </button></strong
              ><span class="text-sm text-gray-400"
                >{{ post.author.position || "Ustoz" }} -
                {{ $dayjs(post.created_at).format("DD MMM YYYY") }}</span
              >
            </p>
          </div>
          <div class="relative" tabindex="0" @keyup.esc="isOpen = null">
            <button
              aria-label="more options button"
              @click="isOpen === post.id ? (isOpen = null) : (isOpen = post.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
            <MDropdown :post-id="post.id" @close="isOpen = null"></MDropdown>
          </div>
        </div>
        <MChips :tags="post.categories"></MChips>
        <hr class="border-t my-3 mb-6" />

        <h2 class="text-2xl block mb-4 font-light font-serif text-gray-600">
          {{ post.title }}
        </h2>

        <div class="space-y-4">
          <p class="overflow-hidden w-full">
            <img
              :src="post.image"
              alt="img"
              width="626"
              height="416"
              class="w-full max-h-96 object-cover"
            />
          </p>
          <!-- Body text -->
          <div
            class="space-y-4 font-serif text-lg leading-9 overflow-hidden"
            v-html="post.body"
          ></div>
        </div>
        <hr class="border-t my-6 mb-2" />
        <!--
        <pre>{{ post.actions }}</pre>
        <pre>{{ post.likes }}</pre>
        <pre>{{ post.dislikes }}</pre> -->

        <ul class="flex flex-wrap items-center justify-center text-sm -mx-2">
          <MRating
            :id="post.id"
            :like="post.likes"
            :dislike="post.dislikes"
            :pending="pending"
            @like="onLike"
            @dislike="onDislike"
          />
          <li
            class="flex items-center space-x-2 mx-2 mt-4 sm:ml-[auto!important]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{{ post.comments_count }}</span>
          </li>
          <li class="flex items-center space-x-2 mx-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{{ post.views }}</span>
          </li>
          <li class="mx-2 mt-4">
            <div class="relative" tabindex="0" @keyup.esc="isOpen2 = null">
              <button
                aria-label="more options button"
                @click="
                  isOpen2 === post.id ? (isOpen2 = null) : (isOpen2 = post.id)
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
              <MDropdown :post-id="post.id" @close="isOpen2 = null"></MDropdown>
            </div>
          </li>
        </ul>
        <MComment v-if="isLoggedIn && post.allow_comments"></MComment>
      </div>
      <m-skeleton v-else />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import MRating from "./subcomponents/MRating.vue";
import MChips from "./subcomponents/MChips.vue";
import MDropdown from "./subcomponents/MDropdown.vue";
import MSkeleton from "./subcomponents/MSkeleton.vue";
import MComment from "./comment/MComment.vue";
import avatarPerson from "@/assets/images/avatar-person.svg";

export default {
  components: { MRating, MChips, MSkeleton, MComment, MDropdown },
  data() {
    return {
      avatarPerson,

      isOpen: null,
      isOpen2: null,
      isFull: null,
      options: {
        year: "numeric",
        day: "numeric",
        month: "long",
      },

      pending: false,
    };
  },
  computed: {
    ...mapState({
      post: (state) => state.post.postDetail,
      isLoggedIn: (state) => state.auth.loggedIn,
    }),
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  methods: {
    ...mapMutations("post", ["SET_POST_LIKE_STATE"]),
    PageFollow(person) {
      if (!person.followed) {
        this.$store.dispatch("person/followPage", person.id).then(() => {
          this.$store.dispatch("post/FetchPosts");
        });
      } else {
        this.$store.dispatch("person/unfollowPage", person.id).then(() => {
          this.$store.dispatch("post/FetchPosts");
        });
      }
    },

    onLike() {
      if (this.post.actions.liked) {
        this.removeLikeState("likes");
        return;
      }
      this.setLikeState(1);
    },
    onDislike() {
      if (this.post.actions.disliked) {
        this.removeLikeState("dislikes");
        return;
      }
      this.setLikeState(-1);
    },
    setLikeState(vote) {
      this.pending = true;

      this.$axios
        .post(`/pages/posts/${this.post.id}/vote/`, {
          vote,
        })
        .then(() => {
          this.pending = false;
          this.SET_POST_LIKE_STATE({
            likesKey: vote >= 0 ? "likes" : "dislikes",
            likesVal: vote,
          });
        })
        .catch(() => {
          this.pending = false;
        });
    },
    removeLikeState(likesKey) {
      this.pending = true;

      this.$axios
        .delete(`/pages/posts/${this.post.id}/unvote/`)
        .then(() => {
          this.pending = false;
          this.SET_POST_LIKE_STATE({ likesKey, likesVal: -1, unvote: true });
        })
        .catch(() => {
          this.pending = false;
        });
    },
  },
};
</script>
