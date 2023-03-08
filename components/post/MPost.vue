<template>
  <div class="box">
    <div class="post fade-in">
      <div v-if="!noPicture" class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <img
            :src="get(post, 'author.picture', '') || avatarPerson"
            :alt="get(post, 'author.name', '')"
            class="w-14 h-14 rounded-full flex-shrink-0 object-cover object-top"
          />
          <p class="leading-tight">
            <strong class="block font-medium text-gray-600"
              >{{ get(post, "author.name", "") }}
              <button
                class="text-blue-500 ml-2 hover:underline"
                :class="{ '!text-gray-400': get(post, 'author.followed', '') }"
                :disabled="!isLoggedIn"
                @click="PageFollow(post.author)"
              >
                {{
                  get(post, "author.followed", "") ? "Kuzatilyapti" : "Kuzatish"
                }}
              </button></strong
            ><span class="text-sm text-gray-400"
              >{{ get(post, "author.position", "") }}
              {{ $dayjs(post.created_at).format("DD MMM YYYY") }}</span
            >
          </p>
        </div>
        <!-- Drop down -->
        <div class="relative" tabindex="0" @keyup.esc="isOpen = null">
          <button aria-label="more options button" @click="isOpen = !isOpen">
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
          <m-dropdown
            v-show="isOpen"
            :post-id="post.id"
            @close="isOpen = null"
            @block="onBlockClick(post)"
            @click:share="handleShareEmit(post)"
            @click:complaint="handleComplaintEmit(post)"
          ></m-dropdown>
        </div>
      </div>
      <MChips :tags="post.categories"></MChips>
      <hr class="border-t my-3 mb-6" />

      <router-link
        :to="
          localePath({
            name: 'post-id',
            params: {
              id: post.slug,
            },
            query: {
              ...$route.query,
            },
          })
        "
        class="text-2xl block mb-4 font-light font-serif text-gray-600 transition hover:text-primary"
      >
        {{ post.title }}
      </router-link>

      <div class="space-y-4">
        <p class="overflow-hidden w-full">
          <img
            :src="post.image"
            alt="img"
            width="626"
            height="416"
            class="w-full max-h-96 object-cover transition-transform hover:scale-125 hover:opacity-75 cursor-pointer"
            @click="
              $router.push(
                localePath({
                  name: 'post-id',
                  params: {
                    id: post.slug,
                  },
                  query: {
                    ...$route.query,
                  },
                })
              )
            "
          />
        </p>
        <!-- Body text -->
        <div
          :class="{ 'max-h-14': isFull !== post.id }"
          class="space-y-4 font-serif text-lg leading-9 overflow-hidden"
          v-html="post.body"
        ></div>
      </div>
      <button
        :class="{ '-translate-y-8': isFull !== post.id }"
        class="w-full pt-8 bg-gradient-to-b from-[rgba(255,255,255,.75)] to-white bg-opacity-70 flex items-center justify-center space-x-2 text-blue-400 underline hover:text-blue-500 hover:no-underline"
        @click="isFull === post.id ? (isFull = null) : (isFull = post.id)"
      >
        <span>
          {{ isFull ? `Qisqa shaklda o\'qing` : `Batafsil shaklda o\'qing` }}
        </span>
        <svg
          :class="{ 'rotate-180': isFull === post.id }"
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

      <hr class="border-t my-6 mb-2" />
      <ul class="flex flex-wrap justify-center text-sm -mx-2">
        <MRating
          :id="post.id"
          :like="post.likes"
          :dislike="post.dislikes"
          :pending="pending"
          @like="onLike(post)"
          @dislike="onDislike(post)"
        ></MRating>
        <li class="mx-2 mt-4">
          <button
            v-show="isLoggedIn"
            :class="{
              'fill-blue-500 text-blue-500 font-bold': get(
                post,
                'actions.saved'
              ),
            }"
            class="flex fill-blue-500 items-center space-x-2 py-2 px-3 rounded-full shadow hover:bg-gray-100 transition"
            @click="Saved(post)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="[
                { 'fill-blue-500 stroke-blue-500': get(post, 'actions.saved') },
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

            <span>{{
              get(post, "actions.saved") ? "Saqlangan" : "Saqlash"
            }}</span>
          </button>
        </li>
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
      </ul>
    </div>
    <MShare
      v-show="sharePopup"
      :data="shareProps"
      @close="onMShareClose"
    ></MShare>
    <MComplaint 
    v-show="complaintPopup"
    :data="complaintProps"
    @close="onMComplaintClose"
    >
    </MComplaint>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import get from "lodash.get";
import MRating from "./subcomponents/MRating.vue";
import MChips from "./subcomponents/MChips.vue";
import MDropdown from "./subcomponents/MDropdown.vue";

import MShare from "@/components/post/subcomponents/share/MShare.vue";
import MComplaint from '@/components/post/subcomponents/MComplaint.vue';
import avatarPerson from "@/assets/images/avatar-person.svg";

export default {
  components: { MRating, MChips, MDropdown, MShare, MComplaint },
  props: {
    post: {
      type: Object,
      required: true,
    },

    noPicture: {
      type: Boolean,
    },
  },
  data() {
    return {
      avatarPerson,

      isOpen: null,
      isFull: null,
      options: {
        year: "numeric",
        day: "numeric",
        month: "long",
      },

      sharePopup: false,
      complaintPopup: false,
      shareProps: {},
      complaintProps: {},
      pending: false,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts?.results || [],
    }),
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  methods: {
    get,
    ...mapMutations("person", ["setPersonFollowedById"]),
    ...mapMutations("post", [
      "SET_POST_AUTHOR_FOLLOW_STATE",
      "SET_POST_LIKE_STATE_BY_ID",
      "SET_POST_BLOCK"
    ]),

    handleShareEmit(postProps) {
      this.sharePopup = true;
      this.shareProps = postProps;
    },
    handleComplaintEmit(postProps) {
      this.complaintPopup = true;
      this.complaintProps = postProps;
    },
    onMShareClose() {
      this.sharePopup = false;
    },
    onMComplaintClose() {
      this.complaintPopup = false;
      this.complaintProps = {};
    },
    PageFollow(person) {
      let followState = false;
      if (!person.followed) {
        this.$store.dispatch("person/followPage", person.id).then(() => {
          followState = true;
          const data = {
            id: person.id,
            followState,
          };
          this.setPersonFollowedById(data);
          this.SET_POST_AUTHOR_FOLLOW_STATE(data);
        });
      } else {
        this.$store.dispatch("person/unfollowPage", person.id).then(() => {
          const data = {
            id: person.id,
            followState,
          };
          this.setPersonFollowedById(data);
          this.SET_POST_AUTHOR_FOLLOW_STATE(data);
        });
      }
    },
    Saved(post) {
      if (!post.actions.saved) {
        this.$store
          .dispatch("bookmarks/postBookmark", { post: post.id })
          .then(() => {
            this.$store.dispatch("post/FetchPosts");
            this.$store.commit("Toast", {
              visible: true,
              text: "Saqlanganlarga qo'shildi !",
              type: "success",
            });
          });
      } else {
        this.$store.dispatch("bookmarks/removeBookmark", post.id).then(() => {
          this.$store.dispatch("post/FetchPosts");
          this.$store.commit("Toast", {
            visible: true,
            text: "Saqlanganlardan o'chirildi !",
            type: "success",
          });
        });
      }
    },
    onBlockClick(post){
      this.$axios.post(`/pages/posts/${post.id}/block/`,{
        post_id: post.id
      }).then(() => {
          this.SET_POST_BLOCK(post.id);
          this.$store.commit("Toast", {
            visible: true,
            text: "Bu post bloklandi !",
            type: "success",
          });
      }).catch((err) => {
        console.log("err", err);
      });
    },
    onLike(post) {
      if (post.actions.liked) {
        this.removeLikeState({ likesKey: "likes", post });
        return;
      }
      this.setLikeState({ vote: 1, post });
    },
    onDislike(post) {
      if (post.actions.disliked) {
        this.removeLikeState({ likesKey: "dislikes", post });
        return;
      }
      this.setLikeState({ vote: -1, post });
    },
    setLikeState({ vote, post }) {
      this.pending = true;

      this.$axios
        .post(`/pages/posts/${post.id}/vote/`, {
          vote,
        })
        .then(() => {
          this.pending = false;
          this.SET_POST_LIKE_STATE_BY_ID({
            postId: post.id,
            likesKey: vote >= 0 ? "likes" : "dislikes",
            likesVal: vote,
          });
        })
        .catch((err) => {
          console.log("setLikeState err", err);
          this.pending = false;
        });
    },
    removeLikeState({ likesKey, post }) {
      this.pending = true;

      this.$axios
        .delete(`/pages/posts/${post.id}/unvote/`)
        .then(() => {
          this.pending = false;
          this.SET_POST_LIKE_STATE_BY_ID({
            postId: post.id,
            likesKey,
            likesVal: -1,
          });
        })
        .catch((err) => {
          console.log("removeLikeState err", err);
          this.pending = false;
        });
    },
  },
};
</script>
