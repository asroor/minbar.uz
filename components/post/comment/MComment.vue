<template>
  <div v-if="comments" class="mt-6 p-3 bg-gray-50 border rounded">
    <div v-show="!replyComment" class="flex items-start space-x-3 text-sm">
      <img
        class="rounded-full w-10 h-10 flex-shrink-0"
        :src="currentUser.picture || defaultAvatar"
      />

      <textarea
        v-model="text"
        class="textarea-input flex-grow border rounded w-10 h-10"
        role="textbox"
        placeholder="Izoh qoldiring"
        aria-required="true"
        contenteditable
      ></textarea>

      <button
        :disabled="text === ''"
        class="px-3 py-1 flex-shrink-0 border rounded border-blue-500 border-opacity-80 text-blue-500 min-h-[2.5rem] font-medium opacity-80 hover:border-opacity-100 hover:opacity-100 hover:text-white hover:bg-blue-500 transition"
        @click="SendComment()"
      >
        Yuboring
      </button>
    </div>
    <template v-if="commentCount">
      <div v-for="(comment, i) in sortedComments" :key="i" class="comment">
        <hr class="border-t border-gray-200 my-4 -mx-3" />
        <div class="flex items-start space-x-3">
          <img
            class="rounded-full w-10 h-10 flex-shrink-0"
            :src="comment.user.picture || defaultAvatar"
          />
          <div>
            <p class="leading-tight">
              <strong class="block font-medium text-gray-600 text-sm"
                ><a href="#" class="group-hover:underline">{{
                  (comment.user.first_name, comment.user.last_name) ||
                  comment.user.email
                }}</a></strong
              ><span class="text-sm text-gray-400">{{
                $dayjs(comment.created_at).format("DD MMM YYYY")
              }}</span>
            </p>

            <div class="font-serif space-y-1.5 my-3 leading-7">
              <p>
                {{ comment.body }}
              </p>
              <p class="h-0 invisible">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Possimus tempora quos est, distinctio quas tempore!
              </p>
            </div>

            <div class="flex items-center text-sm space-x-3">
              <button
                :class="{ 'text-blue-500': comment.actions.liked }"
                class="flex items-center space-x-2 py-2 px-3 rounded-full shadow opacity-70 hover:opacity-100 hover:bg-gray-100 transition"
                aria-label="like button"
                @click="Vote(comment.id, comment.actions.liked, 1)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span>&middot;</span>
                <span>{{ comment.likes }}</span>
              </button>

              <button
                :class="{ 'text-blue-500': replyComment === comment.id }"
                class="flex items-center space-x-2 py-2 px-3 rounded-full shadow hover:bg-gray-100 transition"
                @click="
                  replyComment === null
                    ? (replyComment = comment.id)
                    : ((replyComment = null), (text = ''))
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium">
                  {{
                    replyComment === comment.id
                      ? "Bekor qilish"
                      : "Javob berish"
                  }}</span
                >
              </button>
              <button
                :class="{ 'text-blue-500': comment.actions.disliked }"
                class="flex items-center space-x-2 py-2 px-3 rounded-full shadow ml-[auto!important] opacity-70 hover:opacity-100 hover:bg-gray-100 transition"
                aria-label="dislike button"
                @click="Vote(comment.id, comment.actions.disliked, -1)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-7 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                <span>&middot;</span>
                <span>{{ comment.dislikes }}</span>
              </button>
              <div
                x-data="{isOpen: false}"
                class="relative"
                @keydown.escape="isOpen = null"
              >
                <button
                  class="opacity-70 hover:opacity-100"
                  aria-label="more options button"
                  @click="
                    isOpen === comment.id
                      ? (isOpen = null)
                      : (isOpen = comment.id)
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

                <div
                  v-show="isOpen == comment.id"
                  x-transition:enter="transition ease-out duration-150"
                  x-transition:enter-start="opacity-0 translate-y-4"
                  x-transition:enter-end="opacity-100 translate-y-0"
                  x-transition:leave="transition ease-in duration-150"
                  x-transition:leave-start="opacity-100 translate-y-0"
                  x-transition:leave-end="opacity-0 translate-y-4"
                  class="absolute bottom-8 right-0 py-2 bg-white rounded border border-gray-200 whitespace-nowrap z-20 shadow-md"
                  @click="isOpen = null"
                >
                  <ul>
                    <li>
                      <a
                        href="#"
                        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                          />
                        </svg>

                        <span>Shikoyat yuborish</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              v-if="comment.replies_count > 0"
              class="w-full mb-4 pt-8 bg-gradient-to-b flex items-center justify-center space-x-2 text-blue-400 underline hover:text-blue-500 hover:no-underline"
              @click="
                showRepliesById === comment.id
                  ? (showRepliesById = null)
                  : (showRepliesById = comment.id)
              "
            >
              <span
                >{{
                  showRepliesById === comment.id
                    ? `Barcha javoblarni yopish`
                    : `Javoblar(${comment.replies_count})`
                }}
              </span>
              <svg
                :class="{ 'rotate-180': showRepliesById === comment.id }"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <Replies
              v-if="showRepliesById === comment.id"
              :comment="comment"
              :default-avatar="defaultAvatar"
              @replyComment="SubCommentReply"
              @vote="Vote"
            ></Replies>
          </div>
        </div>
        <div v-show="replyComment === comment.id" class="reply-comment">
          <hr class="border-t border-gray-200 my-4 -mx-3" />
          <div class="flex items-start space-x-3 text-sm">
            <img
              class="rounded-full w-10 h-10 flex-shrink-0"
              :src="currentUser.picture || defaultAvatar"
            />

            <textarea
              v-model="text"
              class="textarea-input flex-grow border rounded w-10 h-10"
              role="textbox"
              placeholder="Izoh qoldiring"
              aria-required="true"
              contenteditable
            ></textarea>

            <button
              :disabled="text === ''"
              class="px-3 py-1 flex-shrink-0 border rounded border-blue-500 border-opacity-80 text-blue-500 min-h-[2.5rem] font-medium opacity-80 hover:border-opacity-100 hover:opacity-100 hover:text-white hover:bg-blue-500 transition"
              @click="SendComment()"
            >
              Yuboring
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="box fade-in mt-6">Hozirda izohlar mavjud emas</div>
    </template>
  </div>
</template>
<script>
import Replies from "./replies.vue";
import defaultAvatar from "@/assets/images/avatar-person.svg";

export default {
  name: "MComment",
  components: { Replies },
  data() {
    return {
      defaultAvatar,
      isOpen: null,
      showRepliesById: null,
      replyComment: null,
      text: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    comments() {
      return this.$store.state.post?.postComments?.results || [];
    },
    commentCount() {
      return this.$store.state.post?.postComments?.count || 0;
    },
    sortedComments() {
      return this.comments.filter((x) => x.parent === null).reverse();
    },
  },
  methods: {
    SendComment() {
      const body = {
        body: this.text,
        parent: this.replyComment === null ? 0 : this.replyComment,
      };
      this.$store
        .dispatch("post/CreateComments", {
          id: this.$route.params.id,
          body,
        })
        .then(() => {
          this.replyComment = null;
          this.text = "";
          this.$store.dispatch("post/FetchComments", this.$route.params.id);
        });
    },
    Vote(id, liked_or_disliked, vote) {
      if (liked_or_disliked) {
        this.$store.dispatch("post/CommentUnVote", id).then(() => {
          this.$store.dispatch("post/FetchComments", this.$route.params.id);
        });
      } else {
        this.$store
          .dispatch("post/CommentVote", {
            id,
            vote,
          })
          .then((res) => {
            this.$store.dispatch("post/FetchComments", this.$route.params.id);
          });
      }
    },
    SubCommentReply(id, name) {
      this.replyComment = id;
      this.text = `${name}, `;
    },
  },
};
</script>
